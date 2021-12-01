import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/log-in/log-in.component';
import { AuthGuard } from './services/auth.guard';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { ProfileComponent } from './components/profile/profile.component';
// import { UsersComponent } from './components/users/users.component';
// import { ListComponent } from './components/users/list/list.component';
// import { EditComponent } from './components/users/edit/edit.component';

// import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dash',
    loadChildren: () => import('./components/homeload/homeload.module').then(m => m.HomeloadModule)
  },
  // { path: '', redirectTo: 'dash/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
