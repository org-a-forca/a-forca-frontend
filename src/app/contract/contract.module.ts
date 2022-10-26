import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ContractListPage } from './pages/contract-list/contract-list.page';
import { ContractDetailsPage } from './pages/contract-details/contract-details.page';
import { ContractFormPage } from './pages/contract-form/contract-form.page';

const routes: Routes = [
  { path: 'list', component: ContractListPage },
  { path: 'add', component: ContractFormPage },
  { path: 'edit/:id', component: ContractFormPage },
  { path: 'details/:id', component: ContractDetailsPage },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  declarations: [ContractListPage, ContractDetailsPage, ContractFormPage],
  imports: [
    RouterModule.forChild(routes), SharedModule
  ]
})
export class ContractModule { }
