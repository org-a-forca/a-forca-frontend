import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Employee } from 'src/app/employee/entities/employee';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { Employer } from 'src/app/employer/entities/employer';
import { EmployerService } from 'src/app/employer/services/employer.service';
import { Job } from 'src/app/job/entities/job';
import { CommonMsg, ContractMsg } from 'src/app/shared/helpers/messages';
import { Problem } from 'src/app/shared/helpers/problem';
import { MessageType, UiService } from 'src/app/shared/services/ui.service';
import { Contract, ContractStatus } from '../../entities/contract';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.page.html',
})
export class ContractFormPage {

  contract: Contract
  problem: Problem
  employers: Employer[]
  employersCopy: Employer[]
  employees: Employee[]
  employeesCopy: Employee[]
  contractStatuses: ContractStatus[]

  isEmployeeModalOpen: boolean
  isEmployerModalOpen: boolean

  private reset(): void {
    this.problem = null
    this.contractStatuses = [
      ContractStatus.ABERTO, ContractStatus.DESISTIU, ContractStatus.FEITO,
      ContractStatus.PARA_DEPOIS, ContractStatus.PEGOU_FORA
    ]
    this.isEmployeeModalOpen = false
    this.isEmployerModalOpen = false

    this.contract = {
      id: null,
      servicesPerformed: [],
      date: null,
      employee: null,
      employer: null,
      status: ContractStatus.ABERTO,
      result: {
        employeeRating: null,
        employerRating: null,
        obs: ''
      }
    }
  }

  constructor(
    private employeeService: EmployeeService,
    private employerService: EmployerService,
    private contractService: ContractService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService) {
    this.reset()
  }

  async ionViewDidEnter(): Promise<void> {
    this.reset()

    const contractId = this.route.snapshot.paramMap.get('id')
    if (contractId) {
      await this.loadContract(contractId)
    }
  }

  private async loadContract(id: string): Promise<void> {
    const data = await this.contractService.getById(
      Number.parseInt(id)
    )

    if (!data) {
      await this.uiService.showToast(CommonMsg.RECORD_NOT_FOUND, MessageType.ERROR)
      this.router.navigate(['contract'])
      return
    }

    this.contract = data
  }

  async onSave(): Promise<void> {


    this.problem = await this.contractService.save(this.contract)

    if (this.problem) {
      await this.uiService.showToast(CommonMsg.OPERATION_NOT_PERFORMED, MessageType.ERROR)
      return
    }

    await this.uiService.showToast(ContractMsg.SAVED)
    this.router.navigate(['contract'])

  }

  // Modal
  onSelectEmployer(employer: Employer): void {
    this.contract.employer = employer
    this.setEmployerModalOpen(false)
  }

  onSelectEmployee(employee: Employee): void {
    this.contract.employee = employee
    this.contract.servicesPerformed = []
    this.setEmployeeModalOpen(false)
  }

  async setEmployeeModalOpen(isOpen: boolean): Promise<void> {
    if (isOpen) {
      this.employees = await this.employeeService.getAll()
      this.employeesCopy = [...this.employees]
    }

    this.isEmployeeModalOpen = isOpen;
  }

  async setEmployerModalOpen(isOpen: boolean): Promise<void> {
    if (isOpen) {
      this.employers = await this.employerService.getAll()
      this.employersCopy = [...this.employers]
    }

    this.isEmployerModalOpen = isOpen;
  }

  compareJobs(j1: Partial<Job>, j2: Partial<Job>) {
    return j1 && j2 ? j1.id === j2.id : j1 === j2;
  }

  onSearchEmployee(text: string): void {
    this.employees = this.employeesCopy.filter(
      employee => this.getTextFromEmployee(employee).toLowerCase().indexOf(text.toLowerCase()) > -1
    )
  }

  private getTextFromEmployee(employee: Employee): string {
    let resp = employee.name + ' '
    return resp + employee.jobs.map(job => job.name).join(' ')
  }

  onSearchEmployer(text: string): void {
    this.employers = this.employersCopy.filter(
      employer => this.getTextFromEmployer(employer).toLowerCase().indexOf(text.toLowerCase()) > -1
    )
  }

  private getTextFromEmployer(employer: Employer): string {
    return employer.name + ' ' + employer.phone
  }
}
