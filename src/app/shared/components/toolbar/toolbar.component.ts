import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {

  @Input() title = ''
  @Input() type: 'form-modal' | 'form-page' | 'details-page' | 'list-page' | 'list-modal' = 'list-page'
  @Output() save = new EventEmitter<void>()
  @Output() close = new EventEmitter<void>()
  @Output() edit = new EventEmitter<void>()
  @Output() delete = new EventEmitter<void>()
  @Output() add = new EventEmitter<void>()

  get isFormModal(): boolean {
    return this.type === 'form-modal'
  }

  get isFormPage(): boolean {
    return this.type === 'form-page'
  }

  get isDetailsPage(): boolean {
    return this.type === 'details-page'
  }

  get isListPage(): boolean {
    return this.type === 'list-page'
  }

  get isListModal(): boolean {
    return this.type === 'list-modal'
  }

}
