import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from './components/item/item.component';
import { FormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

import { BrMaskerModule } from 'br-mask';
import { JobsPipe } from './pipes/jobs.pipe';
import { JobListItemComponent } from './components/job-list-item/job-list-item.component';
import { ContractStatusPipe } from './pipes/contract-status.pipe';
import { EmployerListItemComponent } from './components/employer-list-item/employer-list-item.component';
import { EmployeeListItemComponent } from './components/employee-list-item/employee-list-item.component';
import { Num2strPipe } from './pipes/num2str.pipe';
import { TimeagoPipe } from './pipes/timeago.pipe';
import { JobAddModalPage } from './components/job-add-modal/job-add-modal.page';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const exportedComponents = [
  ToolbarComponent, JobAddModalPage, JobListItemComponent, ItemComponent, 
  ErrorMessageComponent, EmployerListItemComponent, EmployeeListItemComponent
]

const exportedPipes = [
  JobsPipe, ContractStatusPipe, Num2strPipe, TimeagoPipe
]

@NgModule({
  declarations: [exportedComponents, exportedPipes],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    BrMaskerModule,
    ],
  exports: [
    CommonModule,
    IonicModule,
    FormsModule,
    BrMaskerModule,
    exportedComponents,
    exportedPipes
  ]
})
export class SharedModule { }
