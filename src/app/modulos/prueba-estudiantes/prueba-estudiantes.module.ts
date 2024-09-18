import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebaEstudiantesRoutingModule } from './prueba-estudiantes-routing.module';
import { ControlComponent } from './control/control.component';
import { InformacionPruebaComponent } from './informacion-prueba/informacion-prueba.component';
import { PresentarPruebaComponent } from './presentar-prueba/presentar-prueba.component';
import { PresentarPreguntaComponent } from './presentar-pregunta/presentar-pregunta.component';
import { TerminosCondicionesPruebaComponent } from './terminos-condiciones-prueba/terminos-condiciones-prueba.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContinuarPruebaComponent } from './continuar-prueba/continuar-prueba.component';
import { ResultadosModule } from '../resultados/resultados.module';


@NgModule({
  declarations: [
    ControlComponent,
    InformacionPruebaComponent,
    PresentarPruebaComponent,
    PresentarPreguntaComponent,
    TerminosCondicionesPruebaComponent,
    ContinuarPruebaComponent
  ],
  imports: [
    CommonModule,
    PruebaEstudiantesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ResultadosModule



  ]
})
export class PruebaEstudiantesModule { }
