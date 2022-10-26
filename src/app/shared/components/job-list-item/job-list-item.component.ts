import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from 'src/app/job/entities/job';

@Component({
  selector: 'app-job-list-item',
  templateUrl: './job-list-item.component.html',
})
export class JobListItemComponent {

  @Input() jobs: Job[] = []
  @Output() select = new EventEmitter<Job>()

}
