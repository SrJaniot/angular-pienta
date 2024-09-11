import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlComponent } from './control/control.component';
import { PresentarPruebaComponent } from './presentar-prueba/presentar-prueba.component';

const routes: Routes = [
  {
    path: 'control',
    component: ControlComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruebaEstudiantesRoutingModule { }
