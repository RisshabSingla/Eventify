import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.scss',
})
export class EventCreateComponent {
  eventForm!: FormGroup;
  formSubmitted = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      eventTitle: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      eventDate: ['', [Validators.required]],
      eventTime: ['', [Validators.required]],
      eventLocation: ['', [Validators.required]],
      eventCategory: ['', [Validators.required]],
      registrationLimit: ['', [Validators.required]],
      eventTags: [''],
      coverImage: [''],
      agenda: this.fb.array([]),
      speakers: this.fb.array([]),
      attendeeList: ['public', [Validators.required]],
    });

    // Adding initial agenda and speaker fields
    this.addAgenda();
    this.addSpeaker();
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

  onSubmit() {
    this.formSubmitted = true;

    if (this.eventForm.invalid) {
      return;
    }
    console.log(this.eventForm.value);
  }
}
