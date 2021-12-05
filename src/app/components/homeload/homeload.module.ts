import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AreaStackedComponent } from './Highcharts/area-stacked/area-stacked.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { EditComponent } from './users/edit/edit.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { ProjectsComponent } from './projects/projects.component';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from 'src/app/services/auth.guard';
// import { UserAuthGuard } from './user-auth.guard';
// import { HttpClientModule } from '@angular/common/http';



//translate Modules:
import {TranslateLoader, TranslateModule} from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';




const routes: Routes = [
  { path: 'home', component: HomeComponent,children:[

    { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
    { path: 'Dashboard', component: DashboardComponent },
    { path: 'Profile', component: ProfileComponent },
    { path: 'projects', component: ProjectsComponent },
    {
      path: 'users', children: [
        { path: '', component: UsersComponent },
        { path: 'edit', component: EditComponent },
      ]
    },
  ] },
  // canActivate: [UserAuthGuard]
]

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AsideNavComponent,
    DashboardComponent,
    ProfileComponent,
    UsersComponent,

    EditComponent,
    HomeComponent,
    AreaStackedComponent,
    ProjectsComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    // BrowserModule,
    RouterModule.forChild(routes),
    HighchartsChartModule,
    MDBBootstrapModule,
    FormsModule,
    // BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:createTranslateLoader,
        deps:[HttpClient]
      }
    })
  ],
  providers:[UserService,AuthService,AuthGuard],
  bootstrap: [HomeComponent]
})
export class HomeloadModule { }



//translate:

export function createTranslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http,'./assets/i18n/','.json')
}
