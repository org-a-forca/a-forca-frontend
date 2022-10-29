import { Pipe, PipeTransform } from '@angular/core';
import { Job } from 'src/app/job/entities/job';

@Pipe({
  name: 'jobs'
})
export class JobsPipe implements PipeTransform {

  transform(jobs: Partial<Job>[]): string {
    return jobs ? jobs.map(job => job.name).join(', ') : ''
  }

}
