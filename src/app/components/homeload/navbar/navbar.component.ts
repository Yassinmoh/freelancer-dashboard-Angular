import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  firstName:string =''
currentLang:string=""
  constructor(private authService: AuthService,
              private router: Router,
              public translate:TranslateService) {
                this.currentLang=localStorage.getItem('currentLang') || 'en'
                this.translate.use(this.currentLang)
              }

  ngOnInit(): void {
    this.firstName = JSON.stringify(localStorage.getItem('firstName') || '{}')
  }
  logout() {
    this.authService.logout();
  }
  changecurrentLang(lang: string){
    this.translate.use(lang)
    localStorage.setItem('currentLang',lang);

  }
}
