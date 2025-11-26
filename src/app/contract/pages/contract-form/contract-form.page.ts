import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/employee/entities/employee';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { Employer } from 'src/app/employer/entities/employer';
import { EmployerService } from 'src/app/employer/services/employer.service';
import { JobService } from 'src/app/job/services/job.service';
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

  contract: Contract;
  problem: Problem;
  employers: Employer[];
  employersCopy: Employer[];
  employees: Employee[];
  employeesCopy: Employee[];
  contractStatuses: ContractStatus[];

  isEmployeeModalOpen: boolean;
  isEmployerModalOpen: boolean;

  constructor(
    private employeeService: EmployeeService,
    private employerService: EmployerService,
    private jobService: JobService,
    private contractService: ContractService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {
    this.reset();
  }

  private reset(): void {
    this.problem = null;

    this.contractStatuses = [
      ContractStatus.ABERTO,
      ContractStatus.DESISTIU,
      ContractStatus.FEITO,
      ContractStatus.PARA_DEPOIS,
      ContractStatus.PEGOU_FORA
    ];

    this.isEmployeeModalOpen = false;
    this.isEmployerModalOpen = false;

    this.contract = {
      id: null,
      date: null,
      employee: null,
      employer: null,
      status: ContractStatus.ABERTO,
      servicesPerformed: [],
      servicesPerformedIds: [],
      result: {
        employeeRating: 1,
        employerRating: 1,
        obs: ''
      }
    };
  }

  async ionViewDidEnter(): Promise<void> {
    this.reset();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const data = await this.contractService.getById(+id);

      if (!data) {
        await this.uiService.showToast(CommonMsg.RECORD_NOT_FOUND, MessageType.ERROR);
        this.router.navigate(['contract']);
        return;
      }

      this.contract = data;
    }
  }

  async onSelectEmployee(employee: Employee) {
    this.contract.employee = employee;
    this.contract.servicesPerformedIds = [];
    this.contract.servicesPerformed = [];

    const jobs = await this.jobService.getAll();

    if (employee.servicesNames) {
      const names = employee.servicesNames.split(',').map(x => x.trim().toLowerCase());

      this.contract.employee.jobs = jobs.filter(
        j => names.includes(j.name.toLowerCase())
      );
    } else {
      this.contract.employee.jobs = [];
    }

    this.contract.employee.level = employee.level;

    this.setEmployeeModalOpen(false);
  }

  onSelectEmployer(employer: Employer) {
    this.contract.employer = employer;
    this.setEmployerModalOpen(false);
  }

  async onSave() {
    this.contract.servicesPerformed =
      (this.contract.employee?.jobs || []).filter(j =>
        this.contract.servicesPerformedIds.includes(j.id)
      );

    this.problem = await this.contractService.save(this.contract);

    if (this.problem) {
      await this.uiService.showToast(CommonMsg.OPERATION_NOT_PERFORMED, MessageType.ERROR);
      return;
    }

    await this.uiService.showToast(ContractMsg.SAVED);
    this.router.navigate(['contract']);
  }

  async setEmployeeModalOpen(open: boolean) {
    if (open) {
      this.employees = await this.employeeService.getAll();
      this.employeesCopy = [...this.employees];
    }
    this.isEmployeeModalOpen = open;
  }

  async setEmployerModalOpen(open: boolean) {
    if (open) {
      this.employers = await this.employerService.getAll();
      this.employersCopy = [...this.employers];
    }
    this.isEmployerModalOpen = open;
  }

  onSearchEmployee(text: string) {
    this.employees = this.employeesCopy.filter(emp =>
      (emp.name + ' ' + (emp.servicesNames ?? '')).toLowerCase().includes(text.toLowerCase())
    );
  }

  onSearchEmployer(text: string) {
    this.employers = this.employersCopy.filter(emp =>
      (emp.name + ' ' + emp.phone).toLowerCase().includes(text.toLowerCase())
    );
  }
}