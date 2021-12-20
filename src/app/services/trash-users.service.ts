import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TrashUsersService {
  usersTrash:User[]=[]
  private token=localStorage.getItem('access_token')
  private options = { headers: new HttpHeaders({
    'content-type': 'application/json',
    'token':`${this.token}`
  })};
  constructor( private httpClient:HttpClient) { }


  //Get All Trash Users

  getAllTrashUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(environment.APIURL+'/users/trash',this.options);
  }

  // restoreTrashUsers():Observable<User[]>{
  //   return this.httpClient.get<User[]>(environment.APIURL+'/users/restor',this.options);
  // }

  restoreTrashUsers(_id: any ){
    return this.httpClient.put<User>(`${environment.APIURL}/users/restor/${_id}`,this.options)
    .pipe(map((res:any)=>{
      return res
    }))
  }
}
