import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/job/entities/category';
import { Job } from 'src/app/job/entities/job';
import { JobService } from 'src/app/job/services/job.service';
import { CommonMsg, ServiceMsg } from '../../helpers/messages';
import { Problem } from '../../helpers/problem';
import { MessageType, UiService } from '../../services/ui.service';

@Component({
  selector: 'app-job-add-modal',
  templateUrl: './job-add-modal.page.html',
})
export class JobAddModalPage implements OnInit {

  job: Job
  categories: Category[]
  problem: Problem

  @Output() saved = new EventEmitter<void>()

  private reset(): void {
    this.problem = null

    this.job = {
      id: null,
      name: '',
      category: null
    }

    this.categories = []

  }

  constructor(
    private jobService: JobService, 
    private uiService: UiService) {
    this.reset()
  }

  async ngOnInit(): Promise<void> {
    this.reset()
    this.categories = await this.jobService.getCategories()
  }

  async onSave(): Promise<void> {

    this.problem = await this.jobService.save(this.job)

    if (this.problem) {
      await this.uiService.showToast(CommonMsg.OPERATION_NOT_PERFORMED, MessageType.ERROR)
      return
    }

    await this.uiService.showToast(ServiceMsg.SAVED)
    this.saved.emit()
  }

  compareCategories(j1: Category, j2: Category) {
    return j1 && j2 ? j1.id === j2.id : j1 === j2;
  }

}
