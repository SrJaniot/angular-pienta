import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';


@NgModule({
  declarations: [
    PerfilUsuarioComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule { }
