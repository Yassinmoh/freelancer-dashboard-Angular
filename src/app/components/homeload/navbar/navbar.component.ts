import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  lang:string = '';
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.lang=localStorage.getItem('lang') || 'en';
  }
  logout() {
    this.authService.logout();
  }
  changeLang(lang: string){
    localStorage.setItem('lang',lang);
    window.location.reload()
  }
}
