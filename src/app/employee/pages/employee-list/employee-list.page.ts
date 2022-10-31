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
  employeesCopy: Employee[] = []

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  async ionViewDidEnter(): Promise<void> {
    this.employees = await this.employeeService.getAll()
    this.employeesCopy = [...this.employees]
  }

  onAdd(): void {
    this.router.navigate(['employee', 'add'])
  }

  onSelect(employee: Employee): void {
    this.router.navigate(['employee', 'details', employee.id])
  }

  onSearch(text: string): void {
    this.employees = this.employeesCopy.filter(
      employee => this.getTextFromEmployee(employee).toLowerCase().indexOf(text.toLowerCase()) > -1
    )
  }

  private getTextFromEmployee(employee: Employee): string {
    let resp = employee.name + ' '
    return resp + employee.jobs.map(job => job.name).join(' ')
  }
}
