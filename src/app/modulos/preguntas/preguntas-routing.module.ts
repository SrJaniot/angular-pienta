import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPreguntasContextoComponent } from './crear-preguntas-contexto/crear-preguntas-contexto.component';
import { ContextComponent } from './context/context.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { OpcionComponent } from './opcion/opcion.component';
import { QuizComponent } from './quiz/quiz.component';
import { PreguntaEditarComponent } from './pregunta-editar/pregunta-editar.component';
import { EditarContextComponent } from './context-editar/context-editar.component';
import { ContextListaComponent } from './context-lista/context-lista.component';
import { PreviewPreguntaComponent } from './preview-pregunta/preview-pregunta.component';

const routes: Routes = [
  {
    path: 'quiz',
    component: QuizComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreguntasRoutingModule { }
