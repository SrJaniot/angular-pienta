import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { InstitucionService } from '../../../servicios/institucion.service';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { TutorComponent } from '../tutor/tutor.component';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { RespuestaServerObtenerAreasEvaluar } from '../../../Modelos/RespuestaServer.ObtenerAreasEvaluar.model';
import { Router } from '@angular/router';
import { RespuestaServerObtenerTutor } from '../../../Modelos/RespuestaServerObtenerTutor.model';
import { Tutor } from '../../../Modelos/tutor.modle';

@Component({
  selector: 'app-tutor-editar',
  templateUrl: './tutor-editar.component.html',
  styleUrl: './tutor-editar.component.css'
})
export class TutorEditarComponent  extends TutorComponent implements OnInit {
  @Input() TutorID!: string;

  constructor(
    fb: FormBuilder,
    toast: NgToastService,
    seguridadService: SeguridadService,
    institucionService: InstitucionService,
    institucionBackendConectionService: InstitucionBackendConectionService,
    preguntasService: PreguntaService,
    private router : Router,
 ) {
   super(fb, toast, seguridadService, institucionService, institucionBackendConectionService,preguntasService);
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
   this.PreguntaService.ObtenerAreasPreguntas().subscribe(
    (data: RespuestaServerObtenerAreasEvaluar) => {
      if (data.CODIGO == 200) {
        this.ListaAreasEvaluar = data.DATOS!;
      }
    }
  );

   console.log(this.TutorID) // obtén el ID de la sede de la URL gracias a l @Input que se manda desde el componente "control"
   // valida si el GrupoID es valido
   if (!this.TutorID || this.TutorID === ''  || this.TutorID === '0') {
     // Maneja el caso en el que no se proporciona un ID de sede
     this.router.navigate(['/institucion/control']);
     this.toast.warning({detail:"ADVERTENCIA",summary:"ID no valido",duration:15000, position:'topCenter'});
     return;
     // Puedes mostrar un mensaje de error o redirigir a otra página
   }
   this.toast.warning({detail:"ADVERTENCIA",summary:"Ten en cuenta que si editas el Programa y tienes Area asociadas, debe ser editado con cambios mínimos para que las instituciones mantengan el sentido de la sede",duration:15000, position:'topCenter'});
   this.ConstruirFormulario(); // se construye el formulario para poder operar con el formgroup
   //se traen los datos de la sede a editar usando el id de la sede (sedeID)
   this.institucionBackendConectionService.ObtenerTutor(this.TutorID).subscribe(
     (data: RespuestaServerObtenerTutor) => {
       console.log(data);
       if (data.CODIGO == 200) {
          let programa_estudio = data.DATOS;
          console.log(programa_estudio);

          this.TutorForm.controls["id_tutor"].setValue(programa_estudio?.ID_TUTOR);
          this.TutorForm.controls["nombre"].setValue(programa_estudio?.NOM_TUTOR);
          this.TutorForm.controls["direccion"].setValue(programa_estudio?.DIR_TUTOR);
          this.TutorForm.controls["telefono"].setValue(programa_estudio?.TEL_TUTOR);
          this.TutorForm.controls["correo"].setValue(programa_estudio?.EMAIL_TUTOR);
          this.TutorForm.controls["apellido"].setValue(programa_estudio?.APELLIDO_TUTOR);
          this.TutorForm.controls["id_area_evaluar"].setValue(programa_estudio?.ID_AREA_EVALUAR);
        }
     else{
       this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
     }
   });

 }

 //funcion para actualizar la sede
 override onSubmit(): void {
   //validar si el formulario es valido
   if (this.TutorForm.valid) {
      //console.log(this.institucionForm.value);
      //console.log(this.institucionForm.value);
      let nombre = this.TutorForm.controls["nombre"].value;
      let direccion = this.TutorForm.controls["direccion"].value;
      let telefono = this.TutorForm.controls["telefono"].value;
      let correo = this.TutorForm.controls["correo"].value;
      let apellido = this.TutorForm.controls["apellido"].value;
      let id_tutor = this.TutorForm.controls["id_tutor"].value;
      let usuario_activo = this.TutorForm.controls["usuario_activo"].value;
      let id_area_evaluar = this.TutorForm.controls["id_area_evaluar"].value;

      correo = correo.toLowerCase();


     //se llama al servicio de institucionBackendConectionService para actualizar la sede
     this.institucionBackendConectionService.ActualizarTutor(id_area_evaluar,nombre,direccion,telefono,correo,id_tutor,apellido,usuario_activo).subscribe({
       next: (data: any) => {
          console.log(data);
         if (data.success == true) {

           this.toast.success({detail:"EXITO",summary:"Estudiante actualizada correctamente",duration:5000, position:'topCenter'});
           //let id_grupo_estudio_db = data.DATOS?.ID_SEDE;
           let tutor : Tutor = {
              ID_TUTOR: id_tutor,
              ID_AREA_EVALUAR: id_area_evaluar,
              NOM_TUTOR: nombre,
              APELLIDO_TUTOR: apellido,
              DIR_TUTOR: direccion,
              TEL_TUTOR: telefono,
              EMAIL_TUTOR: correo


           }
           this.institucionService.updateTutor(tutor,+this.TutorID);
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
