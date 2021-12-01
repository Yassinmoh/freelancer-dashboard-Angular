import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../models/admin';
import { AdminService } from '../../../services/admin.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  

})
export class DashboardComponent implements OnInit {

  admins:Admin[]=[]
  
  constructor(private _adminservice:AdminService) {
   

  }

  ngOnInit(): void {
    this.getAdmins();
  }


  getAdmins(){
    this._adminservice.getAllAdmins().subscribe(adminlist=>{
      console.log(adminlist)
      this.admins=adminlist
    })
  }


}
