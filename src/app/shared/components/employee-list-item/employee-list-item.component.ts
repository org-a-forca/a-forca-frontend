import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { Employee } from 'src/app/employee/entities/employee';

@Component({
  selector: 'app-employee-list-item',
  templateUrl: './employee-list-item.component.html',
})
export class EmployeeListItemComponent  {

  @Input() employees: Employee[] = []
  @Output() select = new EventEmitter<Employee>()
  @Output() search = new EventEmitter<string>()

  @ViewChild("searchbar") searchbar: IonSearchbar;

  onSelect(employee: Employee): void {
    this.select.emit(employee)
    this.searchbar.value = ''
  }

}
