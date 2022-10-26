import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar-form-data',
  templateUrl: './toolbar-form-data.component.html',
  styleUrls: ['./toolbar-form-data.component.scss'],
})
export class ToolbarFormDataComponent {

  @Input() title = ''
  @Output() save = new EventEmitter<void>()

  constructor() { }


}
