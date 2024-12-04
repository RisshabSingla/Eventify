import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserEvents } from '../../../model/user/registeredEvents';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-dashboard-registered',
  templateUrl: './user-dashboard-registered.component.html',
  styleUrl: './user-dashboard-registered.component.scss',
})
export class UserDashboardRegisteredComponent implements OnInit {
  events!: UserEvents;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserEvents().subscribe((data) => {
      this.events = data;
    });
  }

  viewEventDetails(event: any) {
    console.log(event);
    this.router.navigate(['/user/explore/', event.id]);
  }

  giveFeedback(event: any) {
    this.router.navigate(['/user/give-feedback/' + event.id]);
  }
}
