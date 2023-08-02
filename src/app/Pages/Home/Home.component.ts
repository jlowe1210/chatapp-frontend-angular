import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  EMPTY,
  switchMap,
} from 'rxjs';
import { NameService } from 'src/app/Services/NameService';

@Component({
  selector: 'Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private nameService: NameService
  ) {}
  public nameSubject = new BehaviorSubject('');
  public isNameAvailable: boolean | null = null;

  private _name: string = '';

  public get name() {
    return this._name;
  }
  public set name(value: string) {
    this._name = value.trim();
    this.isNameAvailable = null;
    this.nameSubject.next(this._name);
  }

  ngOnInit(): void {
    this.nameSubject
      .asObservable()
      .pipe(
        debounceTime(500),
        switchMap((value) => {
          if (value) {
            return this.checkNameAvailability(value).pipe(
              catchError((err) => {
                if (err) {
                  this.isNameAvailable = false;
                }
                return EMPTY;
              })
            );
          }
          return EMPTY;
        })
      )

      .subscribe({
        next: (v) => {
          this.isNameAvailable = true;
        },
      });
  }

  private checkNameAvailability(name: string) {
    return this.http.post('/checkname', { name: name });
  }

  public setName() {
    this.isNameAvailable = null;
    this.http
      .post('/adduser', {
        name: this.name,
        framework: 'angular',
      })
      .pipe(
        catchError((err) => {
          this.isNameAvailable = false;
          return EMPTY;
        })
      )

      .subscribe((res) => {
        this.nameService.setName(this.name);
        this.router.navigate(['/angular/chat']);
      });
  }
}
