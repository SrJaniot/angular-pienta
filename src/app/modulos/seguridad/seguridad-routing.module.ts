import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { ValidarSesionInactivaGuard } from '../../guardianes/validar-sesion-inactiva.guard';
import { ValidarSesionActivaGuard } from '../../guardianes/validar-sesion-activa.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ValidarSesionInactivaGuard]
  },
  {
    path:'cerrar-sesion',
    component: CerrarSesionComponent,
    canActivate:[ValidarSesionActivaGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
