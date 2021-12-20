import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileUploadeService } from 'src/app/services/file-uploade.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],


})
export class UsersComponent implements OnInit {
  users: User[] = []
  formValue!: FormGroup;
  userObj: User = new User()
  userDeta: User[] = []
  _id: any;
  totalUsersLength:any;
  page:number = 1;




  private token = localStorage.getItem('access_token')
  private options = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'token': `${this.token}`
    })
  };



  constructor(private _userservice: UserService,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private httpClient: HttpClient,
    private fileUploadService: FileUploadeService) {

    this.route.params.subscribe(data => {
      this._id = data.id
      console.log(data)
    })
  }

  ngOnInit(): void {

    this.getAllUsers()


    this.formValue = this.formbuilder.group({
      _id: [''],
      userName: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      Email: ['',[Validators.email,Validators.required]],
      Rating: ['',Validators.required],
      Country: ['',Validators.required],
    })
  }

  get formValueControl() {
    return this.formValue.controls;
  }


  postUserDetails() {
    this.userObj.userName = this.formValue.value.userName;
    // this.userObj.Image = this.formValue.value.Image;
    this.userObj.firstName = this.formValue.value.firstName;
    this.userObj.lastName = this.formValue.value.lastName;
    this.userObj.Email = this.formValue.value.Email;
    this.userObj.Rating = this.formValue.value.Rating;
    this.userObj.Country = this.formValue.value.Country;

    this._userservice.postNewUser(this.userObj).subscribe(res => {
      console.log(res);
      alert("User Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      // this.getAllUsers2()
    },
      err => {
        alert("SomeThing Wrong")
      })
  }


  getAllUsers() {
    this._userservice.getAllUsers().subscribe(userlist => {
      this.users = userlist;
      console.log(userlist)
      this.totalUsersLength=userlist.length
      console.log("totalUsersLength",this.totalUsersLength)
    })
  }







  DeleteUser(user: any) {
    this._userservice.DeleteUser(user._id).subscribe(res => {
      Swal.fire({
        title: 'success!',
        text: ' Successfully Delete',
        icon: 'success',
        confirmButtonText: 'ok'
      })


      this.getAllUsers()
    })
  }
  onEdit(user: any) {
    this._id = user._id
    this.formValue.controls['_id'].setValue(user._id);
    // this.formValue.controls['Image'].setValue(user.Image);
    this.formValue.controls['firstName'].setValue(user.firstName);
    this.formValue.controls['userName'].setValue(user.userName);
    this.formValue.controls['lastName'].setValue(user.lastName);
    this.formValue.controls['Email'].setValue(user.Email);
    this.formValue.controls['Rating'].setValue(user.Rating);
    this.formValue.controls['Country'].setValue(user.Country);
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
      this.getAllUsers()
    })
  }


  //uploade Image:

  // onFileSelected(event: any) {
  //   this.file = <File>event.target.files[0];
  // }
  // onUploade() {
  //   this.loading = !this.loading;
  //   console.log(this.file);
  //   this.fileUploadService.upload(this.file).subscribe(
  //     (event: any) => {
  //       if (typeof (event) === 'object') {

  //         // Short link via api response
  //         this.shortLink = event.link;

  //         this.loading = false; // Flag variable
  //       }
  //     }
  //   );
  // }
}

