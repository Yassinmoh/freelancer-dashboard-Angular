import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,
              private router:Router,
              public translate:TranslateService) { }
  ngOnInit(): void { }

  loginForm = {
    Email: '',
    Password: '',
  }

  userLogin() {

    this.authService.userLogin(this.loginForm).subscribe((res) => {


      if(res){
        console.log(res)
        this.router.navigate(["/dash/home"])
      }else{
        alert('failed Login');
      }
    },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.authService.logout();
}



}
