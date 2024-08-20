import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { InstitucionService } from '../../../servicios/institucion.service';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { EstudianteComponent } from '../estudiante/estudiante.component';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { RespuestaServerObtenerEstudiante } from '../../../Modelos/RespuestaServerObtenerEstudiante.model';
import { Estudiante } from '../../../Modelos/estudiante.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiante-editar',
  templateUrl: './estudiante-editar.component.html',
  styleUrl: './estudiante-editar.component.css'
})
export class EstudianteEditarComponent extends EstudianteComponent implements OnInit {
  @Input() EstudianteID!: string;

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
    this.GrupoEstudio = this.institucionService.getGrupos_estudio();

   console.log(this.EstudianteID) // obtén el ID de la sede de la URL gracias a l @Input que se manda desde el componente "control"
   // valida si el GrupoID es valido
   if (!this.EstudianteID || this.EstudianteID === ''  || this.EstudianteID === '0') {
     // Maneja el caso en el que no se proporciona un ID de sede
     this.router.navigate(['/institucion/control']);
     this.toast.warning({detail:"ADVERTENCIA",summary:"ID no valido",duration:15000, position:'topCenter'});
     return;
     // Puedes mostrar un mensaje de error o redirigir a otra página
   }
   this.toast.warning({detail:"ADVERTENCIA",summary:"Ten en cuenta que si editas el Programa y tienes Area asociadas, debe ser editado con cambios mínimos para que las instituciones mantengan el sentido de la sede",duration:15000, position:'topCenter'});
   this.ConstruirFormulario(); // se construye el formulario para poder operar con el formgroup
   //se traen los datos de la sede a editar usando el id de la sede (sedeID)
   this.institucionBackendConectionService.ObtenerEstudiante(this.EstudianteID).subscribe(
     (data: RespuestaServerObtenerEstudiante) => {
       console.log(data);
       if (data.CODIGO == 200) {
          let programa_estudio = data.DATOS;
          console.log(programa_estudio);

          this.estudianteForm.controls["id_gurpo_estudio"].setValue(programa_estudio?.ID_GRUPO_ESTUDIO);
          this.estudianteForm.controls["nombre"].setValue(programa_estudio?.NOM_ESTUDIANTE);
          this.estudianteForm.controls["direccion"].setValue(programa_estudio?.DIR_ESTUDIANTE);
          this.estudianteForm.controls["telefono"].setValue(programa_estudio?.TEL_ESTUDIANTE);
          this.estudianteForm.controls["correo"].setValue(programa_estudio?.EMAIL_ESTUDIANTE);
          this.estudianteForm.controls["num_documento"].setValue(programa_estudio?.ID_ESTUDIANTE);
          this.estudianteForm.controls["tipo_documento"].setValue(programa_estudio?.TIPO_DOCUMENTO);


        }
     else{
       this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
     }
   });

 }

 //funcion para actualizar la sede
 override onSubmit(): void {
   //validar si el formulario es valido
   if (this.estudianteForm.valid) {
      //console.log(this.institucionForm.value);
      let nombre = this.estudianteForm.controls["nombre"].value;
      let direccion = this.estudianteForm.controls["direccion"].value;
      let telefono = this.estudianteForm.controls["telefono"].value;
      let correo = this.estudianteForm.controls["correo"].value;
      let num_documento = this.EstudianteID;
      let tipo_documento = this.estudianteForm.controls["tipo_documento"].value;
      let usuario_activo = this.estudianteForm.controls["usuario_activo"].value;
      let id_grupo_estudio = this.estudianteForm.controls["id_gurpo_estudio"].value;


      //console.log(nombre,direccion,telefono,correo,num_documento,tipo_documento,usuario_activo,+id_grupo_estudio);

      correo = correo.toLowerCase();

     //se llama al servicio de institucionBackendConectionService para actualizar la sede
     this.institucionBackendConectionService.ActualizarEstudiante(id_grupo_estudio,nombre,direccion,telefono,correo,num_documento,tipo_documento,usuario_activo).subscribe({
       next: (data: any) => {
          console.log(data);
         if (data.success == true) {

           this.toast.success({detail:"EXITO",summary:"Estudiante actualizada correctamente",duration:5000, position:'topCenter'});
           //let id_grupo_estudio_db = data.DATOS?.ID_SEDE;
           let estudiante : Estudiante = {
              ID_ESTUDIANTE: num_documento,
              ID_GRUPO_ESTUDIO: +id_grupo_estudio,
              NOM_ESTUDIANTE: nombre,
              DIR_ESTUDIANTE: direccion,
              TEL_ESTUDIANTE: telefono,
              EMAIL_ESTUDIANTE: correo,
              TIPO_DOCUMENTO: tipo_documento,

           }
           this.institucionService.updateEstudiante(estudiante,this.EstudianteID);
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
