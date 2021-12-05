import { Injectable } from '@angular/core';
import { BehaviorSubject,  Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo: BehaviorSubject<any> = new BehaviorSubject(null);
  JwtHelper = new JwtHelperService()


  constructor(private http: HttpClient, private router: Router) { this.loadUserInfo(); }

  userLogin(login: any): Observable<boolean> {
    console.log(login)
    if (login && login.Email && login.Password) {
      return this.http.post(environment.APIURL+'/auth/login',login).pipe(
        map((data: any) => {
          if (!data) {
            return false;
          }
          console.log("data",data)
          localStorage.setItem('access_token', data.accesToken);
          localStorage.setItem('refresh_token', data.accesToken);
          localStorage.setItem('userName', data.userName);
          const decodedUser = this.JwtHelper.decodeToken(data.accesToken);
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
      const accesToken = localStorage.getItem('access_token');
      if (accesToken) {
        userdata = this.JwtHelper.decodeToken(accesToken);
        this.userInfo.next(userdata);
      }
    }
  }



  callRefershToken(payload: any) {
    return this.http.post("http://localhost:3000/auth/refreshtoken", payload);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('access_token');
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userName");
    this.userInfo.next(null);
    this.router.navigate(['/login']);
}

}
