import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Project} from '../models/project'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects:Project[]=[]
  constructor( private httpClient:HttpClient){


  }
  getAllProjects():Observable<Project[]>{
    
    return this.httpClient.get<Project[]>(environment.APIURL+'/project/all');
      console.log(environment.APIURL);
  }
}
