import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Admin} from '../models/admin';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class AdminService {
  admins:Admin[]=[]
constructor( private httpClient:HttpClient){


}

    
  
     getAllAdmins():Observable<Admin[]>{
     
      return this.httpClient.get<Admin[]>(environment.APIURL+'/users/admin');
      console.log(environment.APIURL);
    }
  
}

