import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadosEstudiantesComponentComponent } from './resultados-estudiantes-component/resultados-estudiantes-component.component';

const routes: Routes = [
  {
    path: 'resultados-estudiantes/:IdPrueba/:IdEstudiante',
    component: ResultadosEstudiantesComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadosRoutingModule { }
