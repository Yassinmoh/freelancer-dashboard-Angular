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
  users:User[]=[]
constructor( private httpClient:HttpClient){

}

          //Show All Users

    getAllUsers():Observable<User[]>{
      let token=localStorage.getItem('access_token')
      let httpHeaders= new HttpHeaders({
      'content-type': 'application/json',
      'token':`${token}`
      })

    return this.httpClient.get<User[]>(`${environment.APIURL}/users`,{headers:httpHeaders});
  }

  //Show All Users

  getAllUsers2(){


    return this.httpClient.get<any>(`${environment.APIURL}/users`)
    .pipe(map((res:any)=>{
      return res
    }))
  }


          //Add New User

  postNewUser(data : any){
    return this.httpClient.post<User>(environment.APIURL+'auth/register',data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

          //Update The User

  UpdateUser(_id:any,data : any){
    let token=localStorage.getItem('access_token')
    let httpHeaders= new HttpHeaders({
      'content-type': 'application/json',
      'token':`${token}`
      })
    return this.httpClient.put<User>(environment.APIURL+_id,{headers:httpHeaders})
    .pipe(map((res:any)=>{
      return res
    }))
  }

          //Delete The User

  DeleteUser(id:number){
    return this.httpClient.delete<any>(environment.APIURL+id)
    .pipe(map((res:any)=>{
      return res
    }))
  }
}


