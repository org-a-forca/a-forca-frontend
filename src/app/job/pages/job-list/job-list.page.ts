import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../../entities/job';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.page.html',
})
export class JobListPage {

  jobs: Job[] = []

  constructor(
    private jobService: JobService,
    private router: Router
  ) { }

  async ionViewDidEnter(): Promise<void> {
    this.jobs = await this.jobService.getAll()
  }

  onAdd(): void {
    this.router.navigate(['job', 'add'])
  }

  onSelect(job: Job): void {
    this.router.navigate(['job', 'details', job.id])
  }
}
