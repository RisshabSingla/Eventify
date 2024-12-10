import { Component, OnInit } from '@angular/core';
import {
  UserDetail,
  UserEventSummary,
  UserStats,
} from '../../../model/user/Items';
import { UserService } from '../../../services/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventService } from '../../../services/event.service';
import { EventDetails } from '../../../model/event/EventDetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard-items',
  templateUrl: './user-dashboard-items.component.html',
  styleUrl: './user-dashboard-items.component.scss',
})
export class UserDashboardItemsComponent implements OnInit {
  userDetails!: UserDetail;
  userEventSummary!: UserEventSummary;
  userStats!: UserStats;

  isEditOverlayOpen = false;

  editableUserDetails = { ...this.userDetails };

  uploadedImageUrl: string = '';
  isUploading: boolean = false;
  uploadError: string | null = null;

  private cloudinaryUrl =
    'https://api.cloudinary.com/v1_1/dacl5s2dn/image/upload';
  private uploadPreset = 'CollaboraLearnFileUpload';

  events: EventDetails[] = [];

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getDashBoardItems().subscribe((data) => {
      this.userDetails = data.userDetails;
      this.userEventSummary = data.userEventSummary;
      this.userStats = data.userStats;
    });
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events: EventDetails[]) => {
        this.events = events;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  navigateToEvent(eventId: number): void {
    this.router.navigate(['/user/explore/', eventId]);
  }

  openEditOverlay() {
    this.isEditOverlayOpen = true;
    this.editableUserDetails = { ...this.userDetails };
  }

  closeEditOverlay() {
    this.isEditOverlayOpen = false;
    this.uploadedImageUrl = '';
    this.uploadError = null;
  }

  saveUserDetails() {
    this.userDetails = { ...this.editableUserDetails };
    this.userService.updateUserDetails(this.userDetails).subscribe(
      (response) => {
        console.log('User details updated successfully:', response);
        alert('User details saved successfully.');
        this.closeEditOverlay();
      },
      (error) => {
        console.error('Error updating user details:', error);
        this.closeEditOverlay();
      }
    );
  }

  onImageUpload(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const formData = new FormData();

      formData.append('file', file);
      formData.append('upload_preset', this.uploadPreset);
      formData.append('cloud_name', 'dacl5s2dn');

      this.isUploading = true;
      this.uploadError = null;

      this.http.post(this.cloudinaryUrl, formData).subscribe(
        (response: any) => {
          console.log(response);
          this.uploadedImageUrl = response.secure_url;
          this.userDetails.userImageUrl = this.uploadedImageUrl;
          this.editableUserDetails.userImageUrl = this.uploadedImageUrl;
          this.isUploading = false;
        },
        (error: HttpErrorResponse) => {
          this.uploadError = 'Image upload failed. Please try again.';
          console.error('Error uploading image:', error);
          this.isUploading = false;
        }
      );
    }
  }
}
