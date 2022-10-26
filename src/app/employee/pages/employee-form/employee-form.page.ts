import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonModal } from '@ionic/angular';
import { Job } from 'src/app/job/entities/job';
import { JobService } from 'src/app/job/services/job.service';
import { CommonMsg, EmployeeMsg } from 'src/app/shared/helpers/messages';
import { Problem } from 'src/app/shared/helpers/problem';
import { MessageType, UiService } from 'src/app/shared/services/ui.service';
import { Employee } from '../../entities/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.page.html',
})
export class EmployeeFormPage {

  employee: Employee
  problem: Problem
  jobs: Job[]

  @ViewChild("modalJob") modal: IonModal;

  private reset(): void {
    this.problem = null

    this.employee = {
      id: null,
      name: '',
      phone: '',
      jobs: [],
      address: '',
      email: '',
      references: '',
      level: null,
      registeredAt: null,
      lastContractAt: null,
      constraints: '',
      obs: ''
    }
  }

  constructor(
    private employeeService: EmployeeService,
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService) {
    this.reset()
  }

  async ionViewDidEnter(): Promise<void> {
    this.reset()
    this.jobs = await this.jobService.getAll()
    const employeeId = this.route.snapshot.paramMap.get('id')
    if (employeeId) {
      await this.loadEmployee(employeeId)
    }
  }

  private async loadEmployee(id: string): Promise<void> {
    const data = await this.employeeService.getById(
      Number.parseInt(id)
    )

    if (!data) {
      await this.uiService.showToast(CommonMsg.RECORD_NOT_FOUND, MessageType.ERROR)
      this.router.navigate(['employee'])
      return
    }

    this.employee = JSON.parse(JSON.stringify(data));
  }

  async onSave(): Promise<void> {


    this.problem = await this.employeeService.save(this.employee)

    if (this.problem) {
      await this.uiService.showToast(CommonMsg.OPERATION_NOT_PERFORMED, MessageType.ERROR)
      return
    }

    await this.uiService.showToast(EmployeeMsg.SAVED)
    this.router.navigate(['employee'])

  }

  onRemoveJob(id: number): void {
    const index = this.employee.jobs.findIndex(item => item.id == id)

    if (index < 0) {
      return
    }

    this.employee.jobs.splice(index, 1)

  }

  // Modal
  onSelectJob(job: Job): void {
    const index = this.employee.jobs.findIndex(item => item.id == job.id)

    if (index < 0) {
      this.employee.jobs.push(job)
      this.modal.dismiss()
      return
    }

    this.uiService.showToast(EmployeeMsg.JOB_ALREADY_ADDED_ERROR, MessageType.ERROR)
  }

}
