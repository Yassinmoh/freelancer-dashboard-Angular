import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material/material.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { LoginComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { HomeloadModule } from './components/homeload/homeload.module';




@NgModule({
  declarations: [

    AppComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,


  ],

  imports: [
    HomeloadModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    // BrowserAnimationsModule,
    MaterialModule,
    HighchartsChartModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    NavbarModule,
    WavesModule,
    ButtonsModule,
    


  ],
  providers: [TranslateService],

  bootstrap: [AppComponent]
})
export class AppModule { }

