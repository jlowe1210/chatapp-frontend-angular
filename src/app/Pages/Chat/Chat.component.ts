import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketService } from 'src/app/Services/SocketService';

@Component({
  selector: 'chat',
  templateUrl: './Chat.component.html',
  styleUrls: ['./Chat.component.css'],
})
export class ChatComponent implements OnDestroy, OnInit {
  constructor(private socketSerive: SocketService) {}

  ngOnInit(): void {
    this.socketSerive.connectSocket();
    this.socketSerive.registerConnectedUser();
    this.socketSerive.registerChatMessages();
    this.socketSerive.registerDisconnect();
  }

  ngOnDestroy(): void {
    this.socketSerive.removeListeners();
    this.socketSerive.disconnectSocket();
  }
}
