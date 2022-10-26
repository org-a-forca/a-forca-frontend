import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
})
export class ItemComponent {

  @Input() iconName: string = 'chevron-forward-outline';
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() wrap: boolean = false;
  @Input() defaultValue: string = 'Não possui'

}
