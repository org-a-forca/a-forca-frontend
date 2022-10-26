import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonMsg, EmployeeMsg } from 'src/app/shared/helpers/messages';
import { MessageType, UiService } from 'src/app/shared/services/ui.service';
import { Employee } from '../../entities/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.page.html',
})
export class EmployeeDetailsPage implements OnInit {

  employee: Employee

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private uiService: UiService
  ) { }

  async ngOnInit(): Promise<void> {
    this.employee = await this.employeeService.getById(
      Number.parseInt(this.route.snapshot.paramMap.get('id'))
    )
    if (!this.employee) {
      await this.uiService.showToast(CommonMsg.RECORD_NOT_FOUND, MessageType.ERROR)
      this.router.navigate(['employee'])
    }
  }

  onEdit(): void {
    this.router.navigate(['employee', 'edit', this.employee.id])
  }

  async onDelete(): Promise<void> {
    const result = await this.uiService.showConfirmDialog(CommonMsg.CONFIRM_DELETE_RECORD)
    
    if (result) {
      const problem = await this.employeeService.delete(this.employee.id)
      
      if (problem) {
        await this.uiService.showToast(problem.message, MessageType.ERROR)
      } else {
        await this.uiService.showToast(EmployeeMsg.DELETED)
      }      

      this.router.navigate(['employee'])
    }
  }

}
