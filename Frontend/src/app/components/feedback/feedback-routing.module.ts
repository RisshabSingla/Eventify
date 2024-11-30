import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FeedbackViewComponent } from './feedback-view/feedback-view.component';
import { adminGuard } from '../../guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'give-feedback/:id', component: FeedbackFormComponent },
      {
        path: 'view/:id',
        component: FeedbackViewComponent,
        canActivate: [adminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackRoutingModule {}
