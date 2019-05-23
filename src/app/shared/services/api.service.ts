import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import { CookieService } from './cookie.service';


@Injectable()
export class ApiServiceService extends CookieService {

  headers: any;
  storage: any;

  constructor() {
    super();
    this.headers = { 'Content-Type': 'application/json' };
    this.setHeaders();
  }

  setHeaders() {
    this.storage = this.readCookie('storage');
    if (this.storage) {
      this.storage = JSON.parse(this.storage);
      this.headers = {
        'Content-Type': 'application/json',
        'token': this.storage.token
      };
    }
  }

  protected post() {
    return new RequestOptions({ headers: this.headers, method: 'post' });
  }

  protected get() {
    return new RequestOptions({ headers: this.headers });
  }

  protected put() {

    return new RequestOptions({ headers: this.headers, method: 'put' });
  }

  protected patch() {
    return new RequestOptions({ headers: this.headers, method: 'patch' });
  }

  protected delete() {
    return new RequestOptions({ headers: this.headers, method: 'delete' });
  }

}
