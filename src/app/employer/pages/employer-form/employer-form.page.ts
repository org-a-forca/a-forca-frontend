import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonMsg, EmployerMsg } from 'src/app/shared/helpers/messages';
import { Problem } from 'src/app/shared/helpers/problem';
import { MessageType, UiService } from 'src/app/shared/services/ui.service';
import { Employer } from '../../entities/employer';
import { EmployerService } from '../../services/employer.service';

@Component({
  selector: 'app-employer-form',
  templateUrl: './employer-form.page.html',
})
export class EmployerFormPage {

  employer: Employer 
  problem: Problem 

  private reset(): void {
    this.problem = null

    this.employer = {
      id: null,
      name: '',
      phone: '',
      address: '',
      email: '',
      registeredAt: null,
      obs: ''
    }
  }

  constructor(private employerService: EmployerService, private router: Router,
    private route: ActivatedRoute, private uiService: UiService) { 
      this.reset()
    }

  async ionViewDidEnter(): Promise<void> {
    this.reset()
    
    const employerId = this.route.snapshot.paramMap.get('id')
    if (employerId) {
      await this.loadEmployer(employerId)
    }
  }

  private async loadEmployer(id: string): Promise<void> {
    const data = await this.employerService.getById(
      Number.parseInt(id)
    )

    if (!data) {
      await this.uiService.showToast(CommonMsg.RECORD_NOT_FOUND, MessageType.ERROR)
      this.router.navigate(['employer'])
      return
    }

    this.employer = data
  }

  async onSave(): Promise<void> {

    this.problem = await this.employerService.save(this.employer)

    if (this.problem) {
      await this.uiService.showToast(CommonMsg.OPERATION_NOT_PERFORMED, MessageType.ERROR)
      return
    }

    await this.uiService.showToast(EmployerMsg.SAVED)
    this.router.navigate(['employer'])

  }

}
