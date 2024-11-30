import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-category',
  templateUrl: './event-category.component.html',
  styleUrl: './event-category.component.scss',
})
export class EventCategoryComponent {
  categoryType = '';
  constructor(private _ar: ActivatedRoute) {
    this.categoryType = _ar.snapshot.params['category'];
    console.log(this.categoryType);
  }
}
