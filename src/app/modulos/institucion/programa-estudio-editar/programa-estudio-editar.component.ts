import { Component, Input, OnInit } from '@angular/core';
import { ProgramaEstudioComponent } from '../programa-estudio/programa-estudio.component';
import { FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { InstitucionService } from '../../../servicios/institucion.service';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { Router } from '@angular/router';
import { RespuestaServerObtenerProgramaEstudio } from '../../../Modelos/RespuestaServerObtenerProgramaEstudio.model';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { ProgramaEstudio } from '../../../Modelos/programaestudio.model';

@Component({
  selector: 'app-programa-estudio-editar',
  templateUrl: './programa-estudio-editar.component.html',
  styleUrl: './programa-estudio-editar.component.css'
})
export class ProgramaEstudioEditarComponent  extends ProgramaEstudioComponent implements OnInit {
  @Input() ProgramaID!: string;


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
    this.AreasEstudio = this.institucionService.getAreas_estudio();

   console.log(this.ProgramaID) // obtén el ID de la sede de la URL gracias a l @Input que se manda desde el componente "control"
   // valida si el sedeID es valido
   if (!this.ProgramaID || this.ProgramaID === ''  || this.ProgramaID === '0') {
     // Maneja el caso en el que no se proporciona un ID de sede
     this.router.navigate(['/institucion/control']);
     this.toast.warning({detail:"ADVERTENCIA",summary:"ID no valido",duration:15000, position:'topCenter'});
     return;
     // Puedes mostrar un mensaje de error o redirigir a otra página
   }
   this.toast.warning({detail:"ADVERTENCIA",summary:"Ten en cuenta que si editas el Programa y tienes Area asociadas, debe ser editado con cambios mínimos para que las instituciones mantengan el sentido de la sede",duration:15000, position:'topCenter'});
   this.ConstruirFormulario(); // se construye el formulario para poder operar con el formgroup
   //se traen los datos de la sede a editar usando el id de la sede (sedeID)
   this.institucionBackendConectionService.ObtenerProgramaEstudioID(this.ProgramaID).subscribe(
     (data: RespuestaServerObtenerProgramaEstudio) => {
       console.log(data);
       if (data.CODIGO == 200) {
          let programa_estudio = data.DATOS;
          console.log(programa_estudio);

          this.ProgramaForm.controls["id_area_estudio"].setValue(programa_estudio?.ID_AREA_ESTUDIO);
          this.ProgramaForm.controls["nombre"].setValue(programa_estudio?.NOM_PROGRAMA_ESTUDIO);
          this.ProgramaForm.controls["descripcion"].setValue(programa_estudio?.DESCRIPCION_PROGRAMA_ESTUDIO);
          this.ProgramaForm.controls["tipo_formacion"].setValue(programa_estudio?.TIPO_FORMACION_PROGRAMA);


      }
     else{
       this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
     }
   });

 }

 //funcion para actualizar la sede
 override onSubmit(): void {
   //validar si el formulario es valido
   if (this.ProgramaForm.valid) {
     let id_AreaEstudio = this.ProgramaForm.controls["id_area_estudio"].value;
     let nombre = this.ProgramaForm.controls["nombre"].value;
     let descripcion = this.ProgramaForm.controls["descripcion"].value;
     let tipo_formacion = this.ProgramaForm.controls["tipo_formacion"].value;
     let id_Programa = +this.ProgramaID;
     //se llama al servicio de institucionBackendConectionService para actualizar la sede
     this.institucionBackendConectionService.ActualizarProgramaEstudio(+id_Programa,nombre,descripcion,tipo_formacion,+id_AreaEstudio).subscribe({
       next: (data: RespuestaServer) => {
         if (data.CODIGO == 200) {
           this.toast.success({detail:"EXITO",summary:"Programa Estudio actualizada correctamente",duration:5000, position:'topCenter'});
           let id_sede_db = data.DATOS?.ID_SEDE;
           let programa_estudio : ProgramaEstudio = {
              ID_PROGRAMA_ESTUDIO: +id_Programa!,
              ID_AREA_ESTUDIO: +id_AreaEstudio,
              NOM_PROGRAMA_ESTUDIO: nombre,
              DESCRIPCION_PROGRAMA_ESTUDIO: descripcion,
              TIPO_FORMACION_PROGRAMA: tipo_formacion
           }
           this.institucionService.updatePrograma_estudio(programa_estudio,+this.ProgramaID);
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
