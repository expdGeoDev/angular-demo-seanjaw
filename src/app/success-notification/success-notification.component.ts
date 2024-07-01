import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-notification.component.html',
  styleUrl: './success-notification.component.css'
})
export class SuccessNotificationComponent {
	@Input() message: string ='';

}
