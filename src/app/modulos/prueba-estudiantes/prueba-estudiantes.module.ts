import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebaEstudiantesRoutingModule } from './prueba-estudiantes-routing.module';
import { ControlComponent } from './control/control.component';


@NgModule({
  declarations: [
    ControlComponent
  ],
  imports: [
    CommonModule,
    PruebaEstudiantesRoutingModule
  ]
})
export class PruebaEstudiantesModule { }
