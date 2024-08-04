import { Component, Input, OnInit } from '@angular/core';
import { AreaEstudioComponent } from '../area-estudio/area-estudio.component';
import { FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { InstitucionService } from '../../../servicios/institucion.service';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { Router } from '@angular/router';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { RespuestaServerObtenerAreaEstudio } from '../../../Modelos/RespuestaServerObtenerAreaEstudio.model';
import { AreaEstudio } from '../../../Modelos/areaestudio.model';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';

@Component({
  selector: 'app-area-estudio-editar',
  templateUrl: './area-estudio-editar.component.html',
  styleUrl: './area-estudio-editar.component.css'
})
export class AreaEstudioEditarComponent  extends AreaEstudioComponent implements OnInit  {
  @Input() AreaID!: string;


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
   //obtener sedes
    this.Sedes = this.institucionService.getSedes();

   console.log(this.AreaID) // obtén el ID de la sede de la URL gracias a l @Input que se manda desde el componente "control"
   // valida si el sedeID es valido
   if (!this.AreaID || this.AreaID === ''  || this.AreaID === '0') {
     // Maneja el caso en el que no se proporciona un ID de sede
     this.router.navigate(['/institucion/control']);
     this.toast.warning({detail:"ADVERTENCIA",summary:"ID no valido",duration:15000, position:'topCenter'});
     return;
     // Puedes mostrar un mensaje de error o redirigir a otra página
   }
   this.toast.warning({detail:"ADVERTENCIA",summary:"Ten en cuenta que si editas el Area Estudio y tienes Sede asociadas, debe ser editado con cambios mínimos para que las instituciones mantengan el sentido de la sede",duration:15000, position:'topCenter'});
   this.ConstruirFormulario(); // se construye el formulario para poder operar con el formgroup
   //se traen los datos de la sede a editar usando el id de la sede (sedeID)
   this.institucionBackendConectionService.ObtenerAreaEstudioID(this.AreaID).subscribe(
     (data: RespuestaServerObtenerAreaEstudio) => {
       console.log(data);
       if (data.CODIGO == 200) {
          let area_estudio = data.DATOS;
          console.log(area_estudio);

          this.AreaForm.controls["nombre"].setValue(area_estudio?.NOM_AREA_ESTUDIO);
          this.AreaForm.controls["descripcion"].setValue(area_estudio?.DESCRIPCION_AREA_ESTUDIO);
          this.AreaForm.controls["id_sede"].setValue(area_estudio?.ID_SEDE);


      }
     else{
       this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
     }
   });

 }

 //funcion para actualizar la sede
 override onSubmit(): void {
   //validar si el formulario es valido
   if (this.AreaForm.valid) {
     let nombre = this.AreaForm.controls["nombre"].value;
     let descripcion = this.AreaForm.controls["descripcion"].value;
     let id_sede = this.AreaForm.controls["id_sede"].value;
     let id_AreaEstudio = +this.AreaID;
     //se llama al servicio de institucionBackendConectionService para actualizar la sede
     this.institucionBackendConectionService.ActualizarAreaEstudio(+id_AreaEstudio,nombre,descripcion,+id_sede).subscribe({
       next: (data: RespuestaServer) => {
         if (data.CODIGO == 200) {
           this.toast.success({detail:"EXITO",summary:"Sede actualizada correctamente",duration:5000, position:'topCenter'});
           let id_sede_db = data.DATOS?.ID_SEDE;
           let area_estudio : AreaEstudio = {
              ID_AREA_ESTUDIO: +id_AreaEstudio!,
              ID_SEDE: +id_sede,
              NOM_AREA_ESTUDIO: nombre,
              DESCRIPCION_AREA_ESTUDIO: descripcion
           }
           this.institucionService.updateArea_estudio(area_estudio,+this.AreaID);
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
