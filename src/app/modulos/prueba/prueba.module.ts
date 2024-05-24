import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebaRoutingModule } from './prueba-routing.module';
import { CrearPreguntasContextoComponent } from './crear-preguntas-contexto/crear-preguntas-contexto.component';
import { ContextComponent } from './context/context.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { OpcionComponent } from './opcion/opcion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz/quiz.component';


@NgModule({
  declarations: [
    CrearPreguntasContextoComponent,
    ContextComponent,
    PreguntaComponent,
    OpcionComponent,
    QuizComponent
  ],
  imports: [
    CommonModule,
    PruebaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PruebaModule { }
