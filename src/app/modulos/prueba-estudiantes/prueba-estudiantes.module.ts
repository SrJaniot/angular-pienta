import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebaEstudiantesRoutingModule } from './prueba-estudiantes-routing.module';
import { ControlComponent } from './control/control.component';
import { InformacionPruebaComponent } from './informacion-prueba/informacion-prueba.component';
import { PresentarPruebaComponent } from './presentar-prueba/presentar-prueba.component';
import { PresentarPreguntaComponent } from './presentar-pregunta/presentar-pregunta.component';


@NgModule({
  declarations: [
    ControlComponent,
    InformacionPruebaComponent,
    PresentarPruebaComponent,
    PresentarPreguntaComponent
  ],
  imports: [
    CommonModule,
    PruebaEstudiantesRoutingModule
  ]
})
export class PruebaEstudiantesModule { }
