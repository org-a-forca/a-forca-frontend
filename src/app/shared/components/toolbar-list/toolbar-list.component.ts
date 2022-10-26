import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar-list',
  templateUrl: './toolbar-list.component.html',
  styleUrls: ['./toolbar-list.component.scss'],
})
export class ToolbarListComponent {

  @Input() title = ''
  @Output() add = new EventEmitter<void>();

  constructor() { }
}
