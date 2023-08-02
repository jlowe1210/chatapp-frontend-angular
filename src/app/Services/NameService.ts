import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NameService {
  private name = new BehaviorSubject('');

  public getName() {
    return this.name.asObservable();
  }

  public setName(name: string) {
    this.name.next(name);
  }
}
