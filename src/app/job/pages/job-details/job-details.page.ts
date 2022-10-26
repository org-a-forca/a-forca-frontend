import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonMsg, ServiceMsg } from 'src/app/shared/helpers/messages';
import { MessageType, UiService } from 'src/app/shared/services/ui.service';
import { Job } from '../../entities/job';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
})
export class JobDetailsPage implements OnInit {

  job: Job

  constructor(private router: Router, private route: ActivatedRoute,
    private jobService: JobService, private uiService: UiService) { }

  async ngOnInit(): Promise<void> {
    this.job = await this.jobService.getById(
      Number.parseInt(this.route.snapshot.paramMap.get('id'))
    )
    if (!this.job) {
      await this.uiService.showToast(CommonMsg.RECORD_NOT_FOUND, MessageType.ERROR)
      this.router.navigate(['job'])
    }
  }

  onEdit(): void {
    this.router.navigate(['job', 'edit', this.job.id])
  }

  async onDelete(): Promise<void> {
    const result = await this.uiService.showConfirmDialog(CommonMsg.CONFIRM_DELETE_RECORD)

    if (result) {
      const problem = await this.jobService.delete(this.job.id)
      
      if (problem) {
        await this.uiService.showToast(problem.message, MessageType.ERROR)
      } else {
        await this.uiService.showToast(ServiceMsg.DELETED)
      }      

      this.router.navigate(['job'])
    }
  }

}
