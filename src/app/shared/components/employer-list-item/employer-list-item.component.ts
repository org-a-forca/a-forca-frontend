import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employer } from 'src/app/employer/entities/employer';

@Component({
  selector: 'app-employer-list-item',
  templateUrl: './employer-list-item.component.html',
})
export class EmployerListItemComponent {

  @Input() employers: Employer[] = []
  @Output() select = new EventEmitter<Employer>()

}
