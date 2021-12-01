import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,
              private router:Router) { }
  ngOnInit(): void { }

  loginForm = {
    username: '',
    password: '',
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





}
