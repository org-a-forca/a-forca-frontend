import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { Employer } from 'src/app/employer/entities/employer';

@Component({
  selector: 'app-employer-list-item',
  templateUrl: './employer-list-item.component.html',
})
export class EmployerListItemComponent {

  @Input() employers: Employer[] = []
  @Output() select = new EventEmitter<Employer>()
  @Output() search = new EventEmitter<string>()

  @ViewChild("searchbar") searchbar: IonSearchbar;

  onSelect(employer: Employer): void {
    this.select.emit(employer)
    this.searchbar.value = ''
  }

}
