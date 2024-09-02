import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebaRoutingModule } from './prueba-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlComponent } from './control/control.component';
import { PruebaGenericaComponent } from './prueba-generica/prueba-generica.component';
import { PruebaCustomComponent } from './prueba-custom/prueba-custom.component';
import { PruebaInicialComponent } from './prueba-inicial/prueba-inicial.component';
import { PruebaFinalComponent } from './prueba-final/prueba-final.component';
import { InstitucionModule } from '../institucion/institucion.module';
import { MatriculaGrupoComponent } from './matricula-grupo/matricula-grupo.component';
import { MatriculaEstudianteComponent } from './matricula-estudiante/matricula-estudiante.component';
import { PruebaListarComponent } from './prueba-listar/prueba-listar.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PreviewPruebaComponent } from './preview-prueba/preview-prueba.component';
import { PreguntasModule } from '../preguntas/preguntas.module';



@NgModule({
  declarations: [
    ControlComponent,
    PruebaGenericaComponent,
    PruebaCustomComponent,
    PruebaInicialComponent,
    PruebaFinalComponent,
    MatriculaGrupoComponent,
    MatriculaEstudianteComponent,
    PruebaListarComponent,
    PreviewPruebaComponent,


  ],
  imports: [
    CommonModule,
    PruebaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InstitucionModule, // Importa el módulo Institucion
    PreguntasModule, // Importa el módulo Preguntas
    MatTableModule,
    MatPaginatorModule,

  ]
})
export class PruebaModule { }
