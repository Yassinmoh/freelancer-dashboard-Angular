import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Admin } from '../../../models/admin';
import { AdminService } from '../../../services/admin.service'
import { AuthService } from '../../../services/auth.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],


})

export class DashboardComponent implements OnInit {

  admins:Admin[]=[]
  userName:string =''

  constructor(private _adminservice:AdminService,
              private _authService:AuthService,
              public translate:TranslateService) {


              }

  ngOnInit() {
    this.userName = JSON.stringify(localStorage.getItem('userName') || '{}')
    console.log("userName",this.userName)
    // this.getAdmins();
  }


  // getAdmins(){
  //   this._adminservice.getAllAdmins().subscribe(adminlist=>{
  //     console.log(adminlist)
  //     this.admins=adminlist
  //   })
  // }





}
