import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { LoginComponent } from './login/login.component';

//imports para que mis formularios funcionen (formgroup, formbuilder, validators)
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { RegistrarEstudianteComponent } from './registrar-estudiante/registrar-estudiante.component';


@NgModule({
  declarations: [
    LoginComponent,
    CerrarSesionComponent,
    RegistrarEstudianteComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SeguridadModule { }
