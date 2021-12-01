import { Injectable } from '@angular/core';
import { BehaviorSubject,  Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo: BehaviorSubject<any> = new BehaviorSubject(null);
  JwtHelper = new JwtHelperService()


  constructor(private http: HttpClient) { this.loadUserInfo(); }

  userLogin(login: any): Observable<boolean> {
    if (login && login.username && login.password) {
      return this.http.post("http://localhost:3000/auth/login", login).pipe(
        map((data: any) => {
          if (!data) {
            return false;
          }
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          const decodedUser = this.JwtHelper.decodeToken(data.access_token);
          localStorage.setItem('expiration', decodedUser.exp);
          this.userInfo.next(decodedUser);
          return true;
        })
      );
    }
    return of(false);
  }


  // Get user information by fetching the 'access_token' from local storage and
  // decrypting and assigning the user information to the 'userInfo' variable



  loadUserInfo() {
    let userdata = this.userInfo.getValue();
    if (!userdata) {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        userdata = this.JwtHelper.decodeToken(access_token);
        this.userInfo.next(userdata);
      }
    }
  }



  callRefershToken(payload: any) {
    return this.http.post("http://localhost:3000/auth/refreshtoken", payload);
  }

}
