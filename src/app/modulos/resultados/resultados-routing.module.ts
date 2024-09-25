import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadosEstudiantesComponentComponent } from './resultados-estudiantes-component/resultados-estudiantes-component.component';
import { ControlComponent } from './control/control.component';
import { ResultadosPruebaComponent } from './resultados-prueba/resultados-prueba.component';

const routes: Routes = [
  {
    path: 'resultados-estudiantes/:IdPrueba/:IdEstudiante',
    component: ResultadosEstudiantesComponentComponent
  },
  //este componente tiene que tener el canActivate de rol admin o tutor
  {
    path: 'control',
    component: ControlComponent
  },
  {
    path: 'ResultadosPrueba/:IdPrueba',
    component: ResultadosPruebaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadosRoutingModule { }
