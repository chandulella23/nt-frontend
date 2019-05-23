import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { ApiServiceService } from './api.service';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { CookieService } from './cookie.service';

@Injectable()
export class UserBaseService extends ApiServiceService {
  cookie: any;
  storage: any;
  public eventEmitter = new EventEmitter();

  constructor(public http: Http, public cookieService: CookieService) {
    super();
  }

  login(email: String, password: String): Observable<any> {
    const data = { email, password }
    return this.http.post('http://localhost:3000/api/v1/auth', data, this.post()).pipe(map(res => res.json()), catchError(err => throwError(err)))
  }

  logout() {
    this.cookie = this.cookieService.readCookie('storage');
    this.storage = this.cookie != null ? JSON.parse(this.cookie) : '';
    if (this.cookie !== null && this.storage.token) {
      this.cookieService.eraseCookie('storage');
      return true;
    }
    return false;
  }

  createOrder(data): Observable<any> {
    return this.http.post('http://localhost:3000/api/v1/createOrder', data, this.post()).pipe(map(res => res.json()), catchError(err => throwError(err)))
  }

  getOrders(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/getOrders', this.get()).pipe(map(res => res.json()), catchError(err => throwError(err)))
  }

  updateOrder(data): Observable<any> {
    return this.http.put('http://localhost:3000/api/v1/updateOrder', data, this.put()).pipe(map(res => res.json()), catchError(err => throwError(err)))
  }
  removeOrder(data): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/v1/removeOrder/${data.id}`,this.delete()).pipe(map(res => res.json()), catchError(err => throwError(err)))
  }
}