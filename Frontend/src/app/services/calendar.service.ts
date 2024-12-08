import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor() {}

  downloadIcal(event: any): void {
    const startDateTime = this.combineDateTime(event.date, event.time);
    const endDateTime = this.estimateEndDateTime(startDateTime);

    const description = `
Event Name: ${event.name}
Date: ${event.date}
Time: ${event.time}
Location: ${event.location}
Status: ${event.status}
`.trim();

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Eventify//EN
BEGIN:VEVENT
UID:${new Date().getTime()}@eventify.com
DTSTAMP:${this.formatDate(new Date())}
DTSTART:${this.formatDate(startDateTime)}
DTEND:${this.formatDate(endDateTime)}
SUMMARY:${event.name}
DESCRIPTION:${description.replace(/\n/g, '\\n')}  
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.name.replace(/ /g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  private combineDateTime(date: string, time: string): Date {
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    return new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  }

  private estimateEndDateTime(startDateTime: Date): Date {
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 3);
    return endDateTime;
  }

  private formatDate(date: Date): string {
    const pad = (num: number): string => num.toString().padStart(2, '0');
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(
      date.getUTCDate()
    )}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(
      date.getUTCSeconds()
    )}Z`;
  }
}
