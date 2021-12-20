import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

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
        console.log("res",res)

        this.router.navigate(["/dash/home/Dashboard"])
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
      }else{
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Email or Password are Invalid',
        //   footer: '<a href="">Why do I have this issue?</a>'
        // })
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



