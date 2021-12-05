import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators'
import {User} from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  users:User[]=[];
  private token=localStorage.getItem('access_token')
  private options = { headers: new HttpHeaders({
    'content-type': 'application/json',
    'token':`${this.token}`
  })};

constructor( private httpClient:HttpClient){

}

          //Show All Users

    getAllUsers():Observable<User[]>{
      // let token=localStorage.getItem('access_token')
      // let httpHeaders= new HttpHeaders({
      // 'content-type': 'application/json',
      // 'token':`${token}`
      // })

    return this.httpClient.get<User[]>(`${environment.APIURL}/users`,this.options);
  }

  //Show All Users

  getAllUsers2(){


    return this.httpClient.get<any>(`${environment.APIURL}/users`)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  //Get user by ID:
  getUserById(userId: string){
    return this.httpClient.get<User>(`${environment.APIURL}/users/${userId}`);
  }



          //Add New User

  postNewUser(data : any){
    return this.httpClient.post<User>(environment.APIURL+'auth/register',data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

          //Update The User

  UpdateUser(_id: any , user:User){
    //"http://localhost:5000/users/61a7a94fcd55cb18fd8d7ead"
    return this.httpClient.put<User>(`${environment.APIURL}/users/${_id}`,user,this.options)
    .pipe(map((res:any)=>{
      return res
    }))
  }

          //Delete The User

  DeleteUser(_id:any){
    return this.httpClient.delete<any>(`${environment.APIURL}/users/${_id}`,this.options)
    .pipe(map((res:any)=>{
      return res
    }))
  }
}


