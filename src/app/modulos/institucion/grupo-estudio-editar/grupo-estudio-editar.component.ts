import { Component, Input, OnInit } from '@angular/core';
import { GrupoEstudioComponent } from '../grupo-estudio/grupo-estudio.component';
import { FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { InstitucionService } from '../../../servicios/institucion.service';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { Router } from '@angular/router';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { RespuestaServerObtenerGrupoEstudio } from '../../../Modelos/RespuestaServerObtenerGrupoEstudio.model';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { GrupoEstudio } from '../../../Modelos/grupoestudio.model';

@Component({
  selector: 'app-grupo-estudio-editar',
  templateUrl: './grupo-estudio-editar.component.html',
  styleUrl: './grupo-estudio-editar.component.css'
})
export class GrupoEstudioEditarComponent  extends GrupoEstudioComponent implements OnInit {
  @Input() GrupoID!: string;


  constructor(
    fb: FormBuilder,
    toast: NgToastService,
    seguridadService: SeguridadService,
    institucionService: InstitucionService,
    institucionBackendConectionService: InstitucionBackendConectionService,
    private router : Router,
 ) {
   super(fb, toast, seguridadService, institucionService, institucionBackendConectionService);
 }

 override ngOnInit(): void {
   //obtener rol del usuario a travez del servicio de seguridad
   this.seguridadService.ObtenerRolUsuario().subscribe(
     (data: RespuestaServerObtenerRol) => {
       if (data.CODIGO == 200) {
         this.id_rol = data.DATOS?.rol!;
         this.nombre_role = data.DATOS?.nombre_rol!;
         //console.log(this.id_rol);
         //console.log(this.nombre_role);
       }
     }
   );
   //obtener Areas de estudio
    this.ProgramasEstudio = this.institucionService.getProgramas_estudio();

   console.log(this.GrupoID) // obtén el ID de la sede de la URL gracias a l @Input que se manda desde el componente "control"
   // valida si el GrupoID es valido
   if (!this.GrupoID || this.GrupoID === ''  || this.GrupoID === '0') {
     // Maneja el caso en el que no se proporciona un ID de sede
     this.router.navigate(['/institucion/control']);
     this.toast.warning({detail:"ADVERTENCIA",summary:"ID no valido",duration:15000, position:'topCenter'});
     return;
     // Puedes mostrar un mensaje de error o redirigir a otra página
   }
   this.toast.warning({detail:"ADVERTENCIA",summary:"Ten en cuenta que si editas el Programa y tienes Area asociadas, debe ser editado con cambios mínimos para que las instituciones mantengan el sentido de la sede",duration:15000, position:'topCenter'});
   this.ConstruirFormulario(); // se construye el formulario para poder operar con el formgroup
   //se traen los datos de la sede a editar usando el id de la sede (sedeID)
   this.institucionBackendConectionService.ObtenerGrupoEstudioID(this.GrupoID).subscribe(
     (data: RespuestaServerObtenerGrupoEstudio) => {
       console.log(data);
       if (data.CODIGO == 200) {
          let programa_estudio = data.DATOS;
          console.log(programa_estudio);

          this.GrupoForm.controls["id_programa_estudio"].setValue(programa_estudio?.ID_PROGRAMA_ESTUDIO);
          this.GrupoForm.controls["id_grupo_estudio"].setValue(programa_estudio?.ID_GRUPO_ESTUDIO);
          this.GrupoForm.controls["nombre"].setValue(programa_estudio?.NOM_GRUPO_ESTUDIO);
          this.GrupoForm.controls["descripcion"].setValue(programa_estudio?.DESCRIPCION_GRUPO_ESTUDIO);
          this.GrupoForm.controls["jornada"].setValue(programa_estudio?.JORNADA_GRUPO_ESTUDIO);
        }
     else{
       this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
     }
   });

 }

 //funcion para actualizar la sede
 override onSubmit(): void {
   //validar si el formulario es valido
   if (this.GrupoForm.valid) {
     let nombre = this.GrupoForm.controls["nombre"].value;
     let descripcion = this.GrupoForm.controls["descripcion"].value;
     let jornada = this.GrupoForm.controls["jornada"].value;
     let id_grupo_estudio = this.GrupoID;
     let id_programa_estudio = this.GrupoForm.controls["id_programa_estudio"].value;
     //se llama al servicio de institucionBackendConectionService para actualizar la sede
     this.institucionBackendConectionService.ActualizarGrupoEstudio(+id_grupo_estudio,nombre,descripcion,jornada,+id_programa_estudio).subscribe({
       next: (data: RespuestaServer) => {
         if (data.CODIGO == 200) {
           this.toast.success({detail:"EXITO",summary:"Programa Estudio actualizada correctamente",duration:5000, position:'topCenter'});
           //let id_grupo_estudio_db = data.DATOS?.ID_SEDE;
           let GrupoEstudio : GrupoEstudio = {
              ID_GRUPO_ESTUDIO: +id_grupo_estudio!,
              ID_PROGRAMA_ESTUDIO: +id_programa_estudio,
              NOM_GRUPO_ESTUDIO: nombre,
              DESCRIPCION_GRUPO_ESTUDIO: descripcion,
              JORNADA_GRUPO_ESTUDIO: jornada
           }
           this.institucionService.updateGrupo_estudio(GrupoEstudio,+this.GrupoID);
           this.router.navigate(['/institucion/control']);
         }
         else{
           this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
         }
       }
     });
   }
 }



}
