import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.scss',
})
export class EventCreateComponent {
  eventForm!: FormGroup;
  formSubmitted = false;
  constructor(private fb: FormBuilder, private eventService: EventService) {}

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
      agendaItem: ['', [Validators.required]], // Agenda title
      startTime: ['', [Validators.required]], // Start time
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

    this.eventService.createEvent(this.eventForm.value);
    console.log(this.eventForm.value);
  }
}
