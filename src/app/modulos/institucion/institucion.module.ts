import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitucionRoutingModule } from './institucion-routing.module';
import { ControlComponent } from './control/control.component';
import { SedeComponent } from './sede/sede.component';
import { SedeEditarComponent } from './sede-editar/sede-editar.component';
import { SedeEliminarComponent } from './sede-eliminar/sede-eliminar.component';
import { SedeListarComponent } from './sede-listar/sede-listar.component';
import { AreaEstudioComponent } from './area-estudio/area-estudio.component';
import { AreaEstudioEditarComponent } from './area-estudio-editar/area-estudio-editar.component';
import { AreaEstudioEliminarComponent } from './area-estudio-eliminar/area-estudio-eliminar.component';
import { AreaEstudioListarComponent } from './area-estudio-listar/area-estudio-listar.component';
import { ProgramaEstudioComponent } from './programa-estudio/programa-estudio.component';
import { ProgramaEstudioEditarComponent } from './programa-estudio-editar/programa-estudio-editar.component';
import { ProgramaEstudioEliminarComponent } from './programa-estudio-eliminar/programa-estudio-eliminar.component';
import { ProgramaEstudioListarComponent } from './programa-estudio-listar/programa-estudio-listar.component';
import { GrupoEstudioComponent } from './grupo-estudio/grupo-estudio.component';
import { GrupoEstudioEditarComponent } from './grupo-estudio-editar/grupo-estudio-editar.component';
import { GrupoEstudioEliminarComponent } from './grupo-estudio-eliminar/grupo-estudio-eliminar.component';
import { GrupoEstudioListarComponent } from './grupo-estudio-listar/grupo-estudio-listar.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudianteEditarComponent } from './estudiante-editar/estudiante-editar.component';
import { EstudianteEliminarComponent } from './estudiante-eliminar/estudiante-eliminar.component';
import { EstudianteListarComponent } from './estudiante-listar/estudiante-listar.component';
import { TutorComponent } from './tutor/tutor.component';
import { TutorEditarComponent } from './tutor-editar/tutor-editar.component';
import { TutorEliminarComponent } from './tutor-eliminar/tutor-eliminar.component';
import { TutorListarComponent } from './tutor-listar/tutor-listar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ControlComponent,
    SedeComponent,
    SedeEditarComponent,
    SedeEliminarComponent,
    SedeListarComponent,
    AreaEstudioComponent,
    AreaEstudioEditarComponent,
    AreaEstudioEliminarComponent,
    AreaEstudioListarComponent,
    ProgramaEstudioComponent,
    ProgramaEstudioEditarComponent,
    ProgramaEstudioEliminarComponent,
    ProgramaEstudioListarComponent,
    GrupoEstudioComponent,
    GrupoEstudioEditarComponent,
    GrupoEstudioEliminarComponent,
    GrupoEstudioListarComponent,
    EstudianteComponent,
    EstudianteEditarComponent,
    EstudianteEliminarComponent,
    EstudianteListarComponent,
    TutorComponent,
    TutorEditarComponent,
    TutorEliminarComponent,
    TutorListarComponent
  ],
  imports: [
    CommonModule,
    InstitucionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,

  ],
  exports: [
    GrupoEstudioListarComponent,
    EstudianteListarComponent
  ]
})
export class InstitucionModule { }
