import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service'
import {FormBuilder,FormGroup} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],


})
export class UsersComponent implements OnInit {
  users:User[]=[]
  formValue!:FormGroup;
  userObj:User= new User()
  userDeta:User[]=[]
  _id: any;

  constructor(private _userservice:UserService ,
              private formbuilder:FormBuilder ,
              private route: ActivatedRoute,
              public translate:TranslateService) {

                this.route.params.subscribe(data => {
                  this._id=data.id
                  console.log(data)
                })
  }

  ngOnInit(): void {

    this.getAllUsers()


    this.formValue=this.formbuilder.group({
      _id:[''],
      userName:[''],
      firstName:[''],
      lastName:[''],
      Email:[''],
      Rating:[''],
      Country:[''],
    })
  }

  postUserDetails(){
    this.userObj.userName=this.formValue.value.userName;
    this.userObj.firstName=this.formValue.value.firstName;
    this.userObj.lastName=this.formValue.value.lastName;
    this.userObj.Email=this.formValue.value.Email;
    this.userObj.Rating=this.formValue.value.Rating;
    this.userObj.Country=this.formValue.value.Country;

    this._userservice.postNewUser(this.userObj).subscribe(res=>{
      console.log(res);
      alert("User Added Successfully")
      let ref=document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllUsers2()
    },
    err=>{
      alert("SomeThing Wrong")
    })
  }


  getAllUsers(){
    this._userservice.getAllUsers().subscribe(userlist=>{
      this.users=userlist;
      console.log(userlist)
    })
  }


  getAllUsers2(){
    this._userservice.getAllUsers2().subscribe(res=>{
      console.log(res)
      this.userDeta=res
    })
  }




  DeleteUser(user:any){
    this._userservice.DeleteUser(user._id).subscribe(res=>{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
      this.getAllUsers()
    })
  }
  onEdit(user:any){
    this._id=user._id
    this.formValue.controls['_id'].setValue(user._id);
    this.formValue.controls['firstName'].setValue(user.firstName);
    this.formValue.controls['userName'].setValue(user.userName);
    this.formValue.controls['lastName'].setValue(user.lastName);
    this.formValue.controls['Email'].setValue(user.Email);
    this.formValue.controls['Rating'].setValue(user.Rating);
    this.formValue.controls['Country'].setValue(user.Country);
  }
  updateUserDetails(user: any) {

    this.userObj._id=this.formValue.value._id;
    this.userObj.userName=this.formValue.value.userName;
    this.userObj.firstName=this.formValue.value.firstName;
    this.userObj.lastName=this.formValue.value.lastName;
    this.userObj.Email=this.formValue.value.Email;
    this.userObj.Rating=this.formValue.value.Rating;
    this.userObj.Country=this.formValue.value.Country;

    console.log(this.userObj)
    console.log(this.userObj._id)
        //  this.route.params.subscribe(data => {
        //   this.userObj._id=data.id
        //           console.log("data", data)
        //         })
    this._userservice.UpdateUser(this._id,this.userObj).subscribe(user =>{
      Swal.fire({
        title: 'success!',
        text: 'Update Successfully',
        icon: 'success',
        confirmButtonText: 'ok'
      })

      console.log(user)
      let ref=document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllUsers()
    })
  }
}

