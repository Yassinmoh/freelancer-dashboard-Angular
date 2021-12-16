import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators'
import {User} from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients:User[]=[];
  private token=localStorage.getItem('access_token')
  private options = { headers: new HttpHeaders({
    'content-type': 'application/json',
    'token':`${this.token}`
  })};
  constructor(private httpClient:HttpClient) {

  }


  //Get All Admins

  getAllAdmins():Observable<User[]>{
    return this.httpClient.get<User[]>(environment.APIURL+'/users/client',this.options);

  }
}
