import { Component } from '@angular/core';
import { SocketService } from 'src/app/Services/SocketService';

@Component({
  selector: 'text-area',
  templateUrl: 'TextArea.component.html',
  styleUrls: ['./TextArea.component.css'],
})
export class TextAreaComponent {
  constructor(private readonly socketService: SocketService) {}

  public message: string = '';

  public sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';
  }
}
