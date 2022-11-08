import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages, ServiceMsg } from 'src/app/shared/helpers/messages';
import { Params } from 'src/app/shared/helpers/params';
import { Problem } from 'src/app/shared/helpers/problem';
import { UiService } from 'src/app/shared/services/ui.service';
import { Category } from '../../entities/category';
import { Job } from '../../entities/job';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.page.html',
})
export class JobFormPage {

  job: Job = new Job()
  categories: Category[] = []
  currentProblem: Problem = null

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private uiService: UiService) {
  }

  private reset(): void {
    this.job = new Job()
    this.currentProblem = null
    this.categories = []
  }

  async ionViewDidEnter(): Promise<void> {
    this.reset()

    this.categories = await this.jobService.getCategories()

    const id = Params.readIdParam(this.route)
    if (id) {
      this.loadJob(id)
    }
  }

  private async loadJob(id: number): Promise<void> {
    const data = await this.jobService.getById(id)

    if (!data) {
      await this.uiService.showToastError(Messages.RECORD_NOT_FOUND)
      this.router.navigate(['job'])
      return
    }

    this.job = data;
  }

  async onSave(): Promise<void> {
    this.currentProblem = null
    const problem = await this.jobService.save(this.job)

    if (problem) {
      this.currentProblem = problem
      await this.uiService.showToastError(Messages.OPERATION_NOT_PERFORMED)
      return;
    }

    await this.uiService.showToast(ServiceMsg.SAVED)
    this.router.navigate(['job'])
  }

  compareCategories(j1: Category, j2: Category) {
    return j1 && j2 ? j1.id === j2.id : j1 === j2;
  }

}
