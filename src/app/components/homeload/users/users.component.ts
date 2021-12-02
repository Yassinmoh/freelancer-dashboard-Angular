import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service'
import {FormBuilder,FormGroup} from '@angular/forms'
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
  constructor(private _userservice:UserService , private formbuilder:FormBuilder) {


  }

  ngOnInit(): void {
    // this._userservice.getAllUsers().subscribe(userlist=>{
    //   this.users=userlist
    // })

    this.formValue=this.formbuilder.group({

      userName:[''],
      firstName:[''],
      lastName:[''],
      Email:[''],
      Rating:[''],
      Country:[''],
    })

    // this.getAllUsers2()
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
    this._userservice.DeleteUser(user.id).subscribe(res=>{
      alert('User Deleted Successfully')
      this.getAllUsers2()
    })
  }
  onEdit(user:any){
    this.userObj._id=user.ID
    this.formValue.controls['firstName'].setValue(user.firstName);
    this.formValue.controls['userName'].setValue(user.userName);
    this.formValue.controls['lastName'].setValue(user.lastName);
    this.formValue.controls['Email'].setValue(user.Email);
    this.formValue.controls['Rating'].setValue(user.Rating);
    this.formValue.controls['Country'].setValue(user.Country);
  }
  updateUserDetails(){
    this.userObj.userName=this.formValue.value.userName;
    this.userObj.firstName=this.formValue.value.firstName;
    this.userObj.lastName=this.formValue.value.lastName;
    this.userObj.Email=this.formValue.value.Email;
    this.userObj.Rating=this.formValue.value.Rating;
    this.userObj.Country=this.formValue.value.Country;

    this._userservice.UpdateUser(this.userObj,this.userObj._id).subscribe(data =>{
      alert('Update Successfully')
      let ref=document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllUsers2()
    })
  }
}

