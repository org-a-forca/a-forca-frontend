import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from 'src/app/employee/entities/employee';

@Component({
  selector: 'app-employee-list-item',
  templateUrl: './employee-list-item.component.html',
})
export class EmployeeListItemComponent {

  @Input() employees: Employee[] = []
  @Output() select = new EventEmitter<Employee>()

}
