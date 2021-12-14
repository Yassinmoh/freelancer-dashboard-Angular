import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


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
  _id: any;
  userinf:any
  textDir: any = 'ltr'

  firstName: string = ''
  lastName:string=''
  Email:string=''
  userName:string=''

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
      Rating:[''],
      Country:[''],
    })


    this.firstName = JSON.stringify(localStorage.getItem('firstName') || '{}')
    this.lastName = JSON.stringify(localStorage.getItem('lastName') || '{}')
    this.Email = JSON.stringify(localStorage.getItem('Email') || '{}')
    this.userName = JSON.stringify(localStorage.getItem('userName') || '{}')
  }




}
