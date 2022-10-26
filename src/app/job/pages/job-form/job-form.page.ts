import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonMsg, ServiceMsg } from 'src/app/shared/helpers/messages';
import { Problem } from 'src/app/shared/helpers/problem';
import { MessageType, UiService } from 'src/app/shared/services/ui.service';
import { Category } from '../../entities/category';
import { Job } from '../../entities/job';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.page.html',
})
export class JobFormPage {

  job: Job
  categories: Category[]
  problem: Problem

  private reset(): void {
    this.problem = null

    this.job = {
      id: null,
      name: '',
      category: null
    }

    this.categories = []

  }

  constructor(private jobService: JobService, private router: Router,
    private route: ActivatedRoute, private uiService: UiService) {
    this.reset()
  }

  async ionViewDidEnter(): Promise<void> {
    this.reset()

    this.categories = await this.jobService.getCategories()
    const jobId = this.route.snapshot.paramMap.get('id')
    if (jobId) {
      await this.loadJob(jobId)
    }
  }

  private async loadJob(id: string): Promise<void> {
    const data = await this.jobService.getById(
      Number.parseInt(id)
    )

    if (!data) {
      await this.uiService.showToast(CommonMsg.RECORD_NOT_FOUND, MessageType.ERROR)
      this.router.navigate(['job'])
      return
    }

    this.job = JSON.parse(JSON.stringify(data));
  }

  async onSave(): Promise<void> {

    this.problem = await this.jobService.save(this.job)

    if (this.problem) {
      await this.uiService.showToast(CommonMsg.OPERATION_NOT_PERFORMED, MessageType.ERROR)
      return
    }

    await this.uiService.showToast(ServiceMsg.SAVED)
    this.router.navigate(['job'])

  }

  compareCategories(j1: Category, j2: Category) {
    return j1 && j2 ? j1.id === j2.id : j1 === j2;
  }

}
