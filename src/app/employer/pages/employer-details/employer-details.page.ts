import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonMsg, EmployerMsg } from 'src/app/shared/helpers/messages';
import { MessageType, UiService } from 'src/app/shared/services/ui.service';
import { Employer } from '../../entities/employer';
import { EmployerService } from '../../services/employer.service';

@Component({
  selector: 'app-employer-details',
  templateUrl: './employer-details.page.html',
})
export class EmployerDetailsPage implements OnInit {

  employer: Employer

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employerService: EmployerService,
    private uiService: UiService
  ) { }

  async ngOnInit(): Promise<void> {
    this.employer = await this.employerService.getById(
      Number.parseInt(this.route.snapshot.paramMap.get('id'))
    )
    if (!this.employer) {
      await this.uiService.showToast(CommonMsg.RECORD_NOT_FOUND, MessageType.ERROR)
      this.router.navigate(['employer'])
    }
  }


  onEdit(): void {
    this.router.navigate(['employer', 'edit', this.employer.id])
  }

  async onDelete(): Promise<void> {
    const result = await this.uiService.showConfirmDialog(CommonMsg.CONFIRM_DELETE_RECORD)

    if (result) {
      const problem = await this.employerService.delete(this.employer.id)
      
      if (problem) {
        await this.uiService.showToast(problem.message, MessageType.ERROR)
      } else {
        await this.uiService.showToast(EmployerMsg.DELETED)
        this.router.navigate(['employer'])
      }      

    }
  }

}
