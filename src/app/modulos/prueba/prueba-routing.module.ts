import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlComponent } from './control/control.component';
import { PruebaCustomComponent } from './prueba-custom/prueba-custom.component';
import { PruebaGenericaComponent } from './prueba-generica/prueba-generica.component';
import { PruebaInicialComponent } from './prueba-inicial/prueba-inicial.component';
import { PruebaFinalComponent } from './prueba-final/prueba-final.component';
import { PreviewPruebaComponent } from './preview-prueba/preview-prueba.component';


const routes: Routes = [
  {
    path: 'control',
    component: ControlComponent
  },
  {
    path: 'PruebaCustom',
    component: PruebaCustomComponent
  },
  {
    path: 'PruebaGenerica',
    component: PruebaGenericaComponent
  },
  {
    path: 'PruebaInicial',
    component: PruebaInicialComponent
  },
  {
    path: 'PruebaFinal',
    component: PruebaFinalComponent
  },
  {
    path: 'previerPrueba/:id',
    component: PreviewPruebaComponent
  }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruebaRoutingModule { }
