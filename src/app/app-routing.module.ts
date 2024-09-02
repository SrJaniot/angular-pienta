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
    path: 'perfil',
    loadChildren: () => import('./modulos/perfil/perfil.module').then(m => m.PerfilModule),
    canActivate:[ValidarSesionActivaGuard]
  },
  {
    path: 'prueba',
    loadChildren: () => import('./modulos/prueba/prueba.module').then(m => m.PruebaModule),
    canActivate:[ValidarSesionActivaGuard]
  },
  {
    path: 'PruebaEstudiantes',
    loadChildren: () => import('./modulos/prueba-estudiantes/prueba-estudiantes.module').then(m => m.PruebaEstudiantesModule),
    canActivate:[ValidarSesionActivaGuard]
  },
  {
    path: 'preguntas',
    loadChildren: () => import('./modulos/preguntas/preguntas.module').then(m => m.PreguntasModule),
    canActivate:[ValidarSesionActivaGuard]
  },
  {
    path: 'herramientas',
    loadChildren: () => import('./modulos/herramientas/herramientas.module').then(m => m.HerramientasModule),
    canActivate:[ValidarSesionActivaGuard]
  },
  {
    path: 'resultados',
    loadChildren: () => import('./modulos/resultados/resultados.module').then(m => m.ResultadosModule),
    canActivate:[ValidarSesionActivaGuard]
  },
  {
    path: 'roles',
    loadChildren: () => import('./modulos/roles/roles.module').then(m => m.RolesModule),
    canActivate:[ValidarSesionActivaGuard]
  },
  {
    path: 'institucion',
    loadChildren: () => import('./modulos/institucion/institucion.module').then(m => m.InstitucionModule),
    canActivate:[ValidarSesionActivaGuard]
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
