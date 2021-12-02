import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Project} from '../models/project'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects:Project[]=[]
  constructor( private httpClient:HttpClient){


  }
  // getAllProjects():Observable<Project[]>{

  //   return this.httpClient.get<Project[]>(environment.APIURL+'/project/all');
  //     console.log(environment.APIURL);
  // }






  getAllProjects():Observable<Project[]>{

    let token=localStorage.getItem('access_token')
    let httpHeaders= new HttpHeaders({
      'content-type': 'application/json',
      'token':`${token}`
      })

    return this.httpClient.get<Project[]>(environment.APIURL+'/projects/',{headers:httpHeaders});
      console.log(environment.APIURL);
  };
  getProjectByID(pID: number):Observable<Project>
  {
    return this.httpClient.get<Project>(environment.APIURL + '/projects/oneproject/' +pID);
  };
  deleteProject(pID: number):Observable<Project>
  {
    return this.httpClient.delete<any>(environment.APIURL + '/projects/deleteproject' +pID)
    .pipe(map((res:any)=>{
      return res
    }))
  };
  UpdateProject(_id:any,data : any){
    let token=localStorage.getItem('access_token')
    let httpHeaders= new HttpHeaders({
      'content-type': 'application/json',
      'token':`${token}`
      })
    return this.httpClient.put<Project>(environment.APIURL+'/projects/'+_id,data,{headers:httpHeaders})
    .pipe(map((res:any)=>{
      return res
    }))
  }







}
