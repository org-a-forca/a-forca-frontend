import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EmployeeListPage } from './pages/employee-list/employee-list.page';
import { EmployeeDetailsPage } from './pages/employee-details/employee-details.page';
import { EmployeeFormPage } from './pages/employee-form/employee-form.page';

const routes: Routes = [
  { path: 'list', component: EmployeeListPage },
  { path: 'add', component: EmployeeFormPage },
  { path: 'edit/:id', component: EmployeeFormPage },
  { path: 'details/:id', component: EmployeeDetailsPage },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  declarations: [EmployeeListPage, EmployeeDetailsPage, EmployeeFormPage],
  imports: [
    RouterModule.forChild(routes), SharedModule
  ]
})
export class EmployeeModule { }
