import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ GlobalConstants } from './../common/global-constants';
import { User } from '../models/User.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post(GlobalConstants.apiURL + 'auth/signin', JSON.stringify(user),httpOptions);
  }

  register(user) : Observable<any> {
    return this.http
    .post<any[]>(GlobalConstants.apiURL+'auth/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    },httpOptions);
  }
}