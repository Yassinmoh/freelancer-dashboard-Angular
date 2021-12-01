import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.httpClient.get<User[]>(environment.APIURL+'/users');
  }


  getAllUsers2(){
    return this.httpClient.get<any>('http://localhost:3000/posts')
    .pipe(map((res:any)=>{
      return res
    }))
  }


          //Add New User

  postNewUser(data : any){
    return this.httpClient.post<User>('http://localhost:3000/posts',data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

          //Update The User

  UpdateUser(data : any,id:any){
    return this.httpClient.put<User>('http://localhost:3000/posts/'+id,data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

          //Delete The User

  DeleteUser(id:number){
    return this.httpClient.delete<any>('http://localhost:3000/posts/'+id)
    .pipe(map((res:any)=>{
      return res
    }))
  }
}


