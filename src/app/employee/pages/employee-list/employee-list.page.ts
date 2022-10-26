import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../entities/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.page.html',
})
export class EmployeeListPage {

  employees: Employee[] = []

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  async ionViewDidEnter(): Promise<void> {
    this.employees = await this.employeeService.getAll()
  }

  onAdd(): void {
    this.router.navigate(['employee', 'add'])
  }

  onSelect(employee: Employee): void {
    this.router.navigate(['employee', 'details', employee.id])
  }

}
