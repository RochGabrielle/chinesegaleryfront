import { User } from '../models/User.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ GlobalConstants } from './../common/global-constants';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserService {
  private users: User[];
  userSubject = new Subject<User[]>();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      //'Authorization': 'my-auth-token'
    })
  };

  constructor( private httpClient: HttpClient ) {}

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }

}


