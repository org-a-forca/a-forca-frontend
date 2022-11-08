import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from 'src/app/shared/helpers/messages';
import { Params } from 'src/app/shared/helpers/params';
import { Problem } from 'src/app/shared/helpers/problem';
import { UiService } from 'src/app/shared/services/ui.service';
import { Job } from '../../entities/job';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
})
export class JobDetailsPage {

  job: Job = null
  currentProblem: Problem = null

  constructor(private router: Router, private route: ActivatedRoute,
    private jobService: JobService, private uiService: UiService) { }

  private reset(): void {
    this.job = new Job()
    this.currentProblem = null
  }

  async ionViewDidEnter(): Promise<void> {
    this.reset()

    this.job = await this.jobService.getById(
      Params.readIdParam(this.route)
    )
    if (!this.job) {
      await this.uiService.showToastError(Messages.RECORD_NOT_FOUND)
      this.router.navigate(['job'])
      return
    }
  }

  onEdit(): void {
    this.router.navigate(['job', 'edit', this.job.id])
  }

  async onDelete(): Promise<void> {
    this.currentProblem = null
    const result = await this.uiService.showConfirmDeleteDialog()

    if (!result) {
      return
    }

    const problem = await this.jobService.delete(this.job.id)

    if (problem) {
      this.currentProblem = problem
      await this.uiService.showToastError(Messages.OPERATION_NOT_PERFORMED)
      return
    }

    await this.uiService.showToastSuccess(Messages.DELETED)
    this.router.navigate(['job'])
  }

}
