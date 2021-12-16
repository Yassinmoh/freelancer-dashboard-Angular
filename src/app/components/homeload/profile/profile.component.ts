import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  users:User[]=[]
  formValue!:FormGroup;
  userObj:User= new User()
  userDeta:User[]=[]
  userinf:any
  textDir: any = 'ltr'

  _id: any;
  firstName: string = ''
  lastName:string=''
  Email:string=''
  userName:string=''

  private token = localStorage.getItem('access_token')
  private options = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'token': `${this.token}`
    })
  };

  constructor(private _userservice:UserService ,
    private formbuilder:FormBuilder ,
    private route: ActivatedRoute,
    public translate:TranslateService) {

      this.route.params.subscribe(data => {
        this._id=data.id
        console.log(data)
      })



      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        if (event.lang == 'ar') {
          console.log(event.lang)
          this.textDir = 'rtl';
        }
        else {
          this.textDir = 'ltr';
        }
        console.log(this.textDir)
      })
}








  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      _id:[''],
      userName:[''],
      firstName:[''],
      lastName:[''],
      Email:[''],
    })


    this.firstName = JSON.stringify(localStorage.getItem('firstName') || '{}')
    this.lastName = JSON.stringify(localStorage.getItem('lastName') || '{}')
    this.Email = JSON.stringify(localStorage.getItem('Email') || '{}')
    this.userName = JSON.stringify(localStorage.getItem('userName') || '{}')
    this._id = JSON.stringify(localStorage.getItem('_id') || '{}')
  }


  onEdit(user: any) {
    this._id = user._id
    this.formValue.controls['_id'].setValue(user._id);
    this.formValue.controls['firstName'].setValue(user.firstName);
    this.formValue.controls['userName'].setValue(user.userName);
    this.formValue.controls['lastName'].setValue(user.lastName);
    this.formValue.controls['Email'].setValue(user.Email);
  }

  updateUserDetails(user: any) {

    this.userObj._id = this.formValue.value._id;
    this.userObj.Image = this.formValue.value.Image;
    this.userObj.userName = this.formValue.value.userName;
    this.userObj.firstName = this.formValue.value.firstName;
    this.userObj.lastName = this.formValue.value.lastName;
    this.userObj.Email = this.formValue.value.Email;
    this.userObj.Rating = this.formValue.value.Rating;
    this.userObj.Country = this.formValue.value.Country;

    // console.log(this.userObj)
    // console.log(this.userObj._id)
    //  this.route.params.subscribe(data => {
    //   this.userObj._id=data.id
    //           console.log("data", data)
    //         })
    this._userservice.UpdateUser(this._id, this.userObj).subscribe(user => {
      Swal.fire({
        title: 'success!',
        text: 'Update Successfully',
        icon: 'success',
        confirmButtonText: 'ok'
      })

      // console.log(user)
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
    })
  }

}
