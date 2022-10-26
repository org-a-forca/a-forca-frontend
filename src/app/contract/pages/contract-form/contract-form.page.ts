import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Employee } from 'src/app/employee/entities/employee';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { Employer } from 'src/app/employer/entities/employer';
import { EmployerService } from 'src/app/employer/services/employer.service';
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
  employees: Employee[]
  contractStatus: ContractStatus[]

  @ViewChild('modalEmployer') modalEmployer: IonModal;
  @ViewChild('modalEmployee') modalEmployee: IonModal;

  private reset(): void {
    this.problem = null
    this.contractStatus = [
      ContractStatus.OPEN, ContractStatus.FINISHED
    ]

    this.contract = {
      id: null,
      description: '',
      date: null,
      employee: null,
      employer: null,
      status: ContractStatus.OPEN,
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
    this.employees = await this.employeeService.getAll()
    this.employers = await this.employerService.getAll()

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

    this.contract = JSON.parse(JSON.stringify(data));
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
    this.modalEmployer.dismiss()
  }

  onSelectEmployee(employee: Employee): void {
    this.contract.employee = employee
    this.modalEmployee.dismiss()
  }
}
