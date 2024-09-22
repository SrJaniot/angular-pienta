import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadosRoutingModule } from './resultados-routing.module';
import { ResultadosEstudiantesComponentComponent } from './resultados-estudiantes-component/resultados-estudiantes-component.component';



//modulo de resultados el cual usara unas librerias que toca instalar
// npm install @swimlane/ngx-charts --save
// npm install --save-dev @types/d3-shape @types/d3-scale @types/d3-selection
// Importa NgxChartsModule
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ControlComponent } from './control/control.component';




@NgModule({
  declarations: [ResultadosEstudiantesComponentComponent, ControlComponent],
  imports: [
    CommonModule,
    ResultadosRoutingModule,
    NgxChartsModule  // Importa el módulo de ngx-charts
  ],
  exports: [
    ResultadosEstudiantesComponentComponent
  ]
})
export class ResultadosModule { }
