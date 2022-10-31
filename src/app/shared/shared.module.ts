import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToolbarListComponent } from './components/toolbar-list/toolbar-list.component';
import { ToolbarDetailsComponent } from './components/toolbar-details/toolbar-details.component';
import { ToolbarFormDataComponent } from './components/toolbar-form-data/toolbar-form-data.component';
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

const exportedComponents = [
  ToolbarListComponent, ToolbarDetailsComponent, ToolbarFormDataComponent, JobAddModalPage,
  JobListItemComponent, ItemComponent, ErrorMessageComponent, JobsPipe, ContractStatusPipe,
  EmployerListItemComponent, EmployeeListItemComponent, Num2strPipe
]

@NgModule({
  declarations: [exportedComponents, TimeagoPipe],
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
    exportedComponents
  ]
})
export class SharedModule { }
