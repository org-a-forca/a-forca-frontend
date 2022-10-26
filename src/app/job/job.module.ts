import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { JobDetailsPage } from './pages/job-details/job-details.page';
import { JobFormPage } from './pages/job-form/job-form.page';
import { JobListPage } from './pages/job-list/job-list.page';

const routes: Routes = [
  { path: 'list', component: JobListPage },
  { path: 'add', component: JobFormPage },
  { path: 'edit/:id', component: JobFormPage },
  { path: 'details/:id', component: JobDetailsPage },
  { path: '', redirectTo: 'list', pathMatch: 'full' },  
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  declarations: [JobListPage, JobDetailsPage, JobFormPage],
  imports: [
    RouterModule.forChild(routes), SharedModule
  ]
})
export class JobModule { }
