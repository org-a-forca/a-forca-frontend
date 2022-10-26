import { NgModule } from '@angular/core';
import { MenuPage } from './pages/menu/menu.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{
  path: '',
  component: MenuPage,
  children: [
    { path: 'job', loadChildren: () => import('../job/job.module').then(m => m.JobModule) },
    { path: 'employer', loadChildren: () => import('../employer/employer.module').then(m => m.EmployerModule) },
    { path: 'contract', loadChildren: () => import('../contract/contract.module').then(m => m.ContractModule) },
    { path: 'employee', loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule) },
    { path: '', redirectTo: 'employee', pathMatch: 'full' },
    { path: '**', redirectTo: 'employee' }
  ]
},
];

@NgModule({
  declarations: [MenuPage],
  imports: [
    RouterModule.forChild(routes), SharedModule
  ]
})
export class CoreModule { }
