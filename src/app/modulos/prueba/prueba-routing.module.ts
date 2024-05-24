import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPreguntasContextoComponent } from './crear-preguntas-contexto/crear-preguntas-contexto.component';
import { ContextComponent } from './context/context.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { OpcionComponent } from './opcion/opcion.component';
import { QuizComponent } from './quiz/quiz.component';
import { PreguntaEditarComponent } from './pregunta-editar/pregunta-editar.component';
import { EditarContextComponent } from './context-editar/context-editar.component';

const routes: Routes = [
  {
    path: 'crear-pregunta-contexto',
    component : CrearPreguntasContextoComponent
  },
  {
    path: 'context',
    component: ContextComponent
  },
  {
    path: 'editar-contexto/:id',
    component: EditarContextComponent
  },
  {
    path: 'pregunta',
    component: PreguntaComponent
  },
  {
    path: 'opcion',
    component: OpcionComponent
  },
  {
    path: 'quiz',
    component: QuizComponent
  },
  {
    path:'editar-pregunta-contexto/:id',
    component: PreguntaEditarComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruebaRoutingModule { }
