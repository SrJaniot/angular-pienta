import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebaRoutingModule } from './prueba-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlComponent } from './control/control.component';
import { PruebaGenericaComponent } from './prueba-generica/prueba-generica.component';
import { PruebaCustomComponent } from './prueba-custom/prueba-custom.component';
import { PruebaInicialComponent } from './prueba-inicial/prueba-inicial.component';
import { PruebaFinalComponent } from './prueba-final/prueba-final.component';
import { GrupoEstudioComponent } from '../institucion/grupo-estudio/grupo-estudio.component';
import { GrupoEstudioEditarComponent } from '../institucion/grupo-estudio-editar/grupo-estudio-editar.component';
import { GrupoEstudioEliminarComponent } from '../institucion/grupo-estudio-eliminar/grupo-estudio-eliminar.component';
import { GrupoEstudioListarComponent } from '../institucion/grupo-estudio-listar/grupo-estudio-listar.component';
import { EstudianteComponent } from '../institucion/estudiante/estudiante.component';
import { EstudianteEditarComponent } from '../institucion/estudiante-editar/estudiante-editar.component';
import { EstudianteEliminarComponent } from '../institucion/estudiante-eliminar/estudiante-eliminar.component';
import { EstudianteListarComponent } from '../institucion/estudiante-listar/estudiante-listar.component';
import { InstitucionModule } from '../institucion/institucion.module';
import { MatriculaGrupoComponent } from './matricula-grupo/matricula-grupo.component';
import { MatriculaEstudianteComponent } from './matricula-estudiante/matricula-estudiante.component';
import { PruebaListarComponent } from './prueba-listar/prueba-listar.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PreviewPruebaComponent } from './preview-prueba/preview-prueba.component';


@NgModule({
  declarations: [
    ControlComponent,
    PruebaGenericaComponent,
    PruebaCustomComponent,
    PruebaInicialComponent,
    PruebaFinalComponent,
    MatriculaGrupoComponent,
    MatriculaEstudianteComponent,
    PruebaListarComponent,
    PreviewPruebaComponent,

  ],
  imports: [
    CommonModule,
    PruebaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InstitucionModule, // Importa el módulo Institucion
    MatTableModule,
    MatPaginatorModule,

  ]
})
export class PruebaModule { }
