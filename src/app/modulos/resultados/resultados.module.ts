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
import { InstitucionModule } from '../institucion/institucion.module';
import { PreguntasModule } from '../preguntas/preguntas.module';
import { PruebaModule } from '../prueba/prueba.module';
import { PruebaListarFilanizadoComponent } from './prueba-listar-filanizado/prueba-listar-filanizado.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ResultadosPruebaComponent } from './resultados-prueba/resultados-prueba.component';
import { BuscarPruebasEstudiantesResultadosComponent } from './buscar-pruebas-estudiantes-resultados/buscar-pruebas-estudiantes-resultados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [ResultadosEstudiantesComponentComponent, ControlComponent, PruebaListarFilanizadoComponent, ResultadosPruebaComponent, BuscarPruebasEstudiantesResultadosComponent],
  imports: [
    CommonModule,
    ResultadosRoutingModule,
    NgxChartsModule,  // Importa el módulo de ngx-charts
    InstitucionModule, // Importa el módulo Institucion
    PreguntasModule, // Importa el módulo Preguntas
    PruebaModule, // Importa el módulo Prueba
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ResultadosEstudiantesComponentComponent
  ]
})
export class ResultadosModule { }
