import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'src/app/employee/entities/employee';

@Pipe({
  name: 'jobs'
})
export class JobsPipe implements PipeTransform {

  transform(employee: Employee): string {
    return employee.jobs ? employee.jobs.map(job => job.name).join(', ') : ''  
  }

}
