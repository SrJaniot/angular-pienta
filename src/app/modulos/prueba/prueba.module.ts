import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebaRoutingModule } from './prueba-routing.module';
import { CrearPreguntasContextoComponent } from './crear-preguntas-contexto/crear-preguntas-contexto.component';
import { ContextComponent } from './context/context.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { OpcionComponent } from './opcion/opcion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz/quiz.component';
import { PreguntaEditarComponent } from './pregunta-editar/pregunta-editar.component';
import { EditarContextComponent } from './context-editar/context-editar.component';


@NgModule({
  declarations: [
    CrearPreguntasContextoComponent,
    ContextComponent,
    PreguntaComponent,
    OpcionComponent,
    QuizComponent,
    PreguntaEditarComponent,
    EditarContextComponent
  ],
  imports: [
    CommonModule,
    PruebaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PruebaModule { }
