import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SystemLogService {
  private isusrLoged: boolean = false;

  constructor() {
   

   }
  login(Email: string, Password: string) {
    // let fakeToken: string = '';
    // if (Email.length > 3 && Password.length > 3) {
    //   fakeToken = 'hallo';
    if(localStorage.getItem('usrToken'))
      {
       this.isusrLoged = true;
      }
  };
  logout() {
    localStorage.removeItem('usrToken');
    this.isusrLoged = false;
  };
  isLogged(): boolean {
    return this.isusrLoged;
  }
}
