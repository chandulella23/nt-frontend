
import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {
    createCookie(name: string, value: string, days: number) {
        value = (name ==='storage' && value) ? value : ''; 
        let expires = '';
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires;
    }

    readCookie(name: string) {
        return document.cookie
    }

    eraseCookie(name: string) {
        this.createCookie(name, "", -1);
    }

}
