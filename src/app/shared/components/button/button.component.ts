import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: string = 'button';
  @Input() title: string = '';
  @Input() className: string = 'btn-primary';
  @Input() id: string = '';
}
