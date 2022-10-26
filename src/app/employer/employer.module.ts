import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployerListPage } from './pages/employer-list/employer-list.page';
import { SharedModule } from '../shared/shared.module';
import { EmployerDetailsPage } from './pages/employer-details/employer-details.page';
import { EmployerFormPage } from './pages/employer-form/employer-form.page';

const routes: Routes = [
  { path: 'list', component: EmployerListPage },
  { path: 'add', component: EmployerFormPage },
  { path: 'edit/:id', component: EmployerFormPage },
  { path: 'details/:id', component: EmployerDetailsPage },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  declarations: [EmployerListPage, EmployerDetailsPage, EmployerFormPage],
  imports: [
    RouterModule.forChild(routes), SharedModule
  ]
})
export class EmployerModule { }
