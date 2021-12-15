import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Admin} from '../models/admin';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class AdminService {
  admins:Admin[]=[]
  private token=localStorage.getItem('access_token')
  private options = { headers: new HttpHeaders({
    'content-type': 'application/json',
    'token':`${this.token}`
  })};
constructor( private httpClient:HttpClient){


}

//Get All Admins 

    getAllAdmins():Observable<Admin[]>{
      return this.httpClient.get<Admin[]>(environment.APIURL+'/users/admin',this.options);

    }

}

