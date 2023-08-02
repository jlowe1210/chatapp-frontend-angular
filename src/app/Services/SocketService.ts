import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { NameService } from './NameService';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private nameService: NameService, private router: Router) {
    this.nameService.getName().subscribe((name) => {
      this.name = name;
    });
  }

  private connectedUsers = new BehaviorSubject(null);
  private chatMessages = new BehaviorSubject([]);
  private name!: string;

  private socket: Socket = io({
    autoConnect: false,
  });

  public connectSocket() {
    this.socket.io.opts.query = {
      name: this.name,
      framework: 'angular',
    };
    this.socket.connect();
  }

  public disconnectSocket() {
    this.nameService.setName('');
    this.socket.disconnect();
  }

  public registerConnectedUser() {
    this.socket.on('users', (data) => {
      this.connectedUsers.next(data);
    });
  }

  public registerDisconnect() {
    this.socket.on('disconnect', () => {
      this.nameService.setName('');
      this.router.navigate(['/']);
    });
  }

  public registerChatMessages() {
    this.socket.on('messages', (messages) => {
      this.chatMessages.next(messages);
    });
  }

  public removeListeners() {
    this.socket.removeAllListeners();
  }

  public getConnectedUsers(): Observable<any[]> | Observable<null> {
    return this.connectedUsers.asObservable();
  }

  public getChatMessagesObservable() {
    return this.chatMessages.asObservable();
  }

  public sendMessage(message: string) {
    if (message.trim() === '') {
      return;
    }
    this.socket.emit('sendmessage', message);
  }
}
