import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio/inicio.component';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent,canActivate:[authGuard]},
    { path: 'login', component: InicioComponent}, 
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
