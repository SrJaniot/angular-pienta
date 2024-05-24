import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPreguntasContextoComponent } from './crear-preguntas-contexto/crear-preguntas-contexto.component';
import { ContextComponent } from './context/context.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { OpcionComponent } from './opcion/opcion.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {
    path: 'crear-pregunta-contexto',
    component : CrearPreguntasContextoComponent
  },
  { path: 'context', component: ContextComponent },
  { path: 'pregunta', component: PreguntaComponent },
  { path: 'opcion', component: OpcionComponent },
  { path: 'quiz', component: QuizComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruebaRoutingModule { }
