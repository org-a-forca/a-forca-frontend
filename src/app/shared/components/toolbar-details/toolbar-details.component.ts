import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar-details',
  templateUrl: './toolbar-details.component.html',
  styleUrls: ['./toolbar-details.component.scss'],
})
export class ToolbarDetailsComponent {

  @Input() title = ''
  @Output() edit = new EventEmitter<void>()
  @Output() delete = new EventEmitter<void>()

  constructor() { }


}
