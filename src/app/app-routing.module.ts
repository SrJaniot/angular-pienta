import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaNoEncontradaComponent } from './publico/errores/ruta-no-encontrada/ruta-no-encontrada.component';
import { HomeComponent } from './publico/home/home.component';
import { ValidarSesionActivaGuard } from './guardianes/validar-sesion-activa.guard';

const routes: Routes = [
  {
    path: 'seguridad',
    loadChildren: () => import('./modulos/seguridad/seguridad.module').then(m => m.SeguridadModule),
  },
  {
    path:'',
    redirectTo:'/seguridad/login',
    pathMatch:'full'
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate:[ValidarSesionActivaGuard]

  },

  // RUTA NO ENCONTRADA TIENE QUE SER EL ULTIMO
  {
    path:'**',
    component: RutaNoEncontradaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
