import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemLogService } from '../../../services/system-log.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private SystemLogService :SystemLogService,
    private router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.SystemLogService.logout();
    this.router.navigate(['/LogIn'])
  }
}
