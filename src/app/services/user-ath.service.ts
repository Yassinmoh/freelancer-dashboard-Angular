import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { text } from '@fortawesome/fontawesome-svg-core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserAthService {
  httpOptions = {}
  constructor(private http: HttpClient, private router: Router) {
    this.httpOptions = {

      headers: new HttpHeaders({

        'Content-Type': 'application/json'

      })

    }
  }
  Login(obj: any) {
    this.http.post(environment.APIURL + '/users/login', obj, { responseType: 'text' }).subscribe((data: any) => {
      console.log(data)
      localStorage.setItem('usrToken', data.token)
      this.router.navigate(['/dash/home'])
    })

  }


}
