import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadeService {
  baseApiUrl=(`${environment.APIURL}/upload`);


  private token=localStorage.getItem('access_token')
  private options = { headers: new HttpHeaders({
    'content-type': 'application/json',
    'token':`${this.token}`
  })};


  constructor(private http:HttpClient) { }

  upload(file:File):Observable<any>{
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(this.baseApiUrl, formData)
  }
}
