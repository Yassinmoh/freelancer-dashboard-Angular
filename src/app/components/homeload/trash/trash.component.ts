import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { TrashUsersService } from 'src/app/services/trash-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  usersTrash:User[]=[]
  page:number = 1;
  totalTrashLength:any;
  userObj: User = new User()
  _id: any;
  constructor(private trashusers:TrashUsersService) { }

  ngOnInit(): void {
    this.getAllTrashUsers()
  }



  getAllTrashUsers(){
    this.trashusers.getAllTrashUsers().subscribe((res) => {
      this.usersTrash=res
      console.log("usersTrash",this.usersTrash)
      this.totalTrashLength=res.length
    })
  }



  restoreUser(id:any){
    this.trashusers.restoreTrashUsers(id).subscribe((user) => {
      Swal.fire({
        title: 'success!',
        text: 'Successfully Restore From Recycle Bin!',
        icon: 'success',
        confirmButtonText: 'ok'
      })
      this.getAllTrashUsers()
    })

  }
}
