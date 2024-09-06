import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreguntasRoutingModule } from './preguntas-routing.module';

import { CrearPreguntasContextoComponent } from './crear-preguntas-contexto/crear-preguntas-contexto.component';
import { ContextComponent } from './context/context.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { OpcionComponent } from './opcion/opcion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz/quiz.component';
import { PreguntaEditarComponent } from './pregunta-editar/pregunta-editar.component';
import { EditarContextComponent } from './context-editar/context-editar.component';
import { ContextEliminarComponent } from './context-eliminar/context-eliminar.component';
import { ContextListaComponent } from './context-lista/context-lista.component';
//para poder usar estos modulos necesitamos instalar ng add @angular/material

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PreguntaEliminarComponent } from './pregunta-eliminar/pregunta-eliminar.component';
import { PreguntaListaComponent } from './pregunta-lista/pregunta-lista.component';
import { OpcionEditarComponent } from './opcion-editar/opcion-editar.component';
import { OpcionEliminarComponent } from './opcion-eliminar/opcion-eliminar.component';
import { OpcionListaComponent } from './opcion-lista/opcion-lista.component';
import { PreviewPreguntaComponent } from './preview-pregunta/preview-pregunta.component';




@NgModule({
  declarations: [
    CrearPreguntasContextoComponent,
    ContextComponent,
    PreguntaComponent,
    OpcionComponent,
    QuizComponent,
    PreguntaEditarComponent,
    EditarContextComponent,
    ContextEliminarComponent,
    ContextListaComponent,
    PreguntaEliminarComponent,
    PreguntaListaComponent,
    OpcionEditarComponent,
    OpcionEliminarComponent,
    OpcionListaComponent,
    PreviewPreguntaComponent,
  ],
  imports: [
    CommonModule,
    PreguntasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
   PreviewPreguntaComponent,
   PreguntaListaComponent,



  ]
})
export class PreguntasModule { }
