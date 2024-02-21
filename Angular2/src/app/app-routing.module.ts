import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const accountsModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'accounts',loadChildren: accountsModule}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
