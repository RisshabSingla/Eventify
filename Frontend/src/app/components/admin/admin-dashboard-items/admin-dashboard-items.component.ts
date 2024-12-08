import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Items } from '../../../model/admin/Items';
import { AdminService } from '../../../services/admin.service';
import { UserDetail } from '../../../model/user/Items';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-dashboard-items',
  templateUrl: './admin-dashboard-items.component.html',
  styleUrl: './admin-dashboard-items.component.scss',
})
export class AdminDashboardItemsComponent {
  dashboardData: Items | null = null;
  userDetails!: UserDetail;

  isEditOverlayOpen = false;

  editableUserDetails = { ...this.userDetails };

  uploadedImageUrl: string = '';
  isUploading: boolean = false;
  uploadError: string | null = null;

  private cloudinaryUrl =
    'https://api.cloudinary.com/v1_1/dacl5s2dn/image/upload';
  private uploadPreset = 'CollaboraLearnFileUpload';

  constructor(
    private router: Router,
    private adminService: AdminService,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.adminService.getDashboardItems().subscribe((data) => {
      this.dashboardData = data;
    });

    this.adminService.getUserDetails().subscribe((data) => {
      this.userDetails = data;
    });
  }
  navigateToEventDetail(eventId: number): void {
    this.router.navigate([`/admin/event-management/${eventId}`]);
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
