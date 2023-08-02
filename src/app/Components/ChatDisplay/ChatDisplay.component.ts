import { Component, OnInit } from '@angular/core';

import { SocketService } from 'src/app/Services/SocketService';

@Component({
  selector: 'chat-display',
  templateUrl: 'ChatDisplay.component.html',
  styleUrls: ['./ChatDisplay.component.css'],
})
export class ChatDisplayComponent implements OnInit {
  constructor(private readonly socketService: SocketService) {}

  public messages!: any[];

  ngOnInit(): void {
    this.socketService.getChatMessagesObservable().subscribe((value) => {
      this.messages = value;
    });
  }
}
