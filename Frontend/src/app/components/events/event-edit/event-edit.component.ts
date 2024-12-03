import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss'],
})
export class EventEditComponent implements OnInit {
  eventForm!: FormGroup;
  formSubmitted = false;
  eventId = '';

  // Dummy event data to populate the form
  dummyEvent = {
    eventTitle: 'Sample Event',
    eventDescription: 'This is a sample event description.',
    eventDate: '2024-12-10',
    eventTime: '10:30',
    eventLocation: 'Event Hall 1',
    eventCategory: 'workshop',
    registrationLimit: 100,
    eventTags: 'Technology, Workshop',
    coverImage: 'path/to/sample-image.jpg',
    agenda: [
      { agendaItem: 'Opening Remarks', startTime: '10:30' },
      { agendaItem: 'Keynote Speech', startTime: '11:00' },
    ],
    speakers: [
      { name: 'John Doe', bio: 'CEO of Example Corp' },
      { name: 'Jane Smith', bio: 'Expert in Technology' },
    ],
    attendeeList: 'public',
  };

  constructor(
    private fb: FormBuilder,
    private _ar: ActivatedRoute,
    private router: Router
  ) {
    this.eventId = _ar.snapshot.params['id'];
    console.log(this.eventId);
  }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      eventTitle: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      eventDate: ['', [Validators.required, this.futureDateValidator]],
      eventTime: ['', [Validators.required]],
      eventLocation: ['', [Validators.required]],
      eventCategory: ['', [Validators.required]],
      registrationLimit: ['', [Validators.required, Validators.min(1)]],
      eventTags: [''],
      coverImage: [''],
      agenda: this.fb.array([]),
      speakers: this.fb.array([]),
      attendeeList: ['public', [Validators.required]],
    });

    this.populateForm(this.dummyEvent);
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  get agendaControls() {
    return (this.eventForm.get('agenda') as FormArray).controls;
  }

  get speakerControls() {
    return (this.eventForm.get('speakers') as FormArray).controls;
  }

  addAgenda(): void {
    const agendaGroup = this.fb.group({
      agendaItem: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
    });
    (this.eventForm.get('agenda') as FormArray).push(agendaGroup);
  }

  removeAgenda(index: number): void {
    (this.eventForm.get('agenda') as FormArray).removeAt(index);
  }

  addSpeaker(): void {
    const speakerItem = this.fb.group({
      name: ['', [Validators.required]],
      bio: ['', [Validators.required]],
    });
    (this.eventForm.get('speakers') as FormArray).push(speakerItem);
  }

  removeSpeaker(index: number): void {
    (this.eventForm.get('speakers') as FormArray).removeAt(index);
  }

  isAgendaInvalid(): boolean {
    return this.agendaControls.some((agenda) => agenda.invalid);
  }

  // Function to check if any agenda item was touched
  isAgendaTouched(): boolean {
    return this.agendaControls.some((agenda) => agenda.touched);
  }

  // Function to check if speaker fields are invalid
  isSpeakersInvalid(): boolean {
    return this.speakerControls.some((speaker) => speaker.invalid);
  }

  // Function to check if any speaker field was touched
  isSpeakersTouched(): boolean {
    return this.speakerControls.some((speaker) => speaker.touched);
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.eventForm.invalid) {
      return;
    }
    console.log(this.eventForm.value);
  }

  // Populate the form with dummy event data
  populateForm(eventData: any): void {
    this.eventForm.patchValue({
      eventTitle: eventData.eventTitle,
      eventDescription: eventData.eventDescription,
      eventDate: eventData.eventDate,
      eventTime: eventData.eventTime,
      eventLocation: eventData.eventLocation,
      eventCategory: eventData.eventCategory,
      registrationLimit: eventData.registrationLimit,
      eventTags: eventData.eventTags,
      coverImage: eventData.coverImage,
      attendeeList: eventData.attendeeList,
    });

    // Populate agenda items
    eventData.agenda.forEach((agendaItem: any) => {
      this.addAgenda();
      const agendaFormGroup =
        this.agendaControls[this.agendaControls.length - 1];
      agendaFormGroup.patchValue(agendaItem);
    });

    // Populate speakers
    eventData.speakers.forEach((speaker: any) => {
      this.addSpeaker();
      const speakerFormGroup =
        this.speakerControls[this.speakerControls.length - 1];
      speakerFormGroup.patchValue(speaker);
    });
  }
}
