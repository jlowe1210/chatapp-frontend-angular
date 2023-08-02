import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NameService } from 'src/app/Services/NameService';
import { SocketService } from 'src/app/Services/SocketService';

@Component({
  selector: 'sidebar',
  templateUrl: './SideBar.component.html',
  styleUrls: ['./SideBar.component.css'],
})
export class SideBarComponent {
  constructor(
    private readonly nameService: NameService,
    private readonly socketService: SocketService
  ) {}

  public connectedUsers: Observable<any[]> | Observable<null> =
    this.socketService.getConnectedUsers();

  public name: Observable<string> = this.nameService.getName();
  public formattedName!: string;

  public formatName(comparedName: string) {
    return this.name.pipe(
      map((name) => {
        if (name === comparedName) {
          return `${name}(Me)`;
        }
        return name;
      })
    );
  }
}
