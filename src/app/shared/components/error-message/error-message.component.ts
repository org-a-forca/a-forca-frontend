import { Component, Input, OnInit } from '@angular/core';
import { Messages } from '../../helpers/messages';
import { Problem } from '../../helpers/problem';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {

  @Input() problem: Problem = null
  title = Messages.ERROR_TITLE  

}
