import { Component, Input, OnInit } from '@angular/core';
import { SedeComponent } from '../sede/sede.component';
import { FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { InstitucionService } from '../../../servicios/institucion.service';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { Router } from '@angular/router';
import { RespuestaServerObtenerSede } from '../../../Modelos/RespuestaServerObtenerSede.model';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { Sede } from '../../../Modelos/sede.model';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { RespuestaServerObtenerInstitucion } from '../../../Modelos/RespuestaServerObtenerInstitucion.model';

@Component({
  selector: 'app-sede-editar',
  templateUrl: './sede-editar.component.html',
  styleUrl: './sede-editar.component.css'
})
export class SedeEditarComponent extends SedeComponent implements OnInit {
  @Input() sedeID!: string;

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
    //obtener instituciones
    this.institucionBackendConectionService.ObtenerInstitucion().subscribe(
      (data: RespuestaServerObtenerInstitucion) => {
        if (data.CODIGO == 200) {
          this.Instituciones = data.DATOS!;
          //console.log(this.Instituciones);
        }
        else{
          this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
        }
      }
    );

    console.log(this.sedeID) // obtén el ID de la sede de la URL gracias a l @Input que se manda desde el componente "control"
    // valida si el sedeID es valido
    if (!this.sedeID || this.sedeID === ''  || this.sedeID === '0') {
      // Maneja el caso en el que no se proporciona un ID de sede
      this.router.navigate(['/institucion/control']);
      this.toast.warning({detail:"ADVERTENCIA",summary:"ID no valido",duration:15000, position:'topCenter'});
      return;
      // Puedes mostrar un mensaje de error o redirigir a otra página
    }
    this.toast.warning({detail:"ADVERTENCIA",summary:"Ten en cuenta que si editas la sede y tienes instituciones asociadas, debe ser editado con cambios mínimos para que las instituciones mantengan el sentido de la sede",duration:15000, position:'topCenter'});
    this.ConstruirFormulario(); // se construye el formulario para poder operar con el formgroup
    //se traen los datos de la sede a editar usando el id de la sede (sedeID)
    this.institucionBackendConectionService.ObtenerSedeID(this.sedeID).subscribe(
      (data: RespuestaServerObtenerSede) => {
        console.log(data);
      if (data.CODIGO == 200) {
        let sede = {
          nombre: data.DATOS?.NOM_SEDE,
          direccion: data.DATOS?.DIR_SEDE,
          telefono: data.DATOS?.TEL_SEDE,
          email: data.DATOS?.EMAIL_SEDE,
          institucion: data.DATOS?.ID_INSTITUCION
        }
        this.institucionForm.setValue(sede);

      }
      else{
        this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
      }
    });

  }

  //funcion para actualizar la sede
  override onSubmit(): void {
    //validar si el formulario es valido
    if (this.institucionForm.valid) {
      let nombre = this.institucionForm.controls["nombre"].value;
      let direccion = this.institucionForm.controls["direccion"].value;
      let telefono = this.institucionForm.controls["telefono"].value;
      let email = this.institucionForm.controls["email"].value;
      let id_institucion = this.institucionForm.controls["institucion"].value;
      //se llama al servicio de institucionBackendConectionService para actualizar la sede
      this.institucionBackendConectionService.ActualizarSede(+this.sedeID,nombre,direccion,telefono,email,+id_institucion).subscribe({
        next: (data: RespuestaServer) => {
          if (data.CODIGO == 200) {
            this.toast.success({detail:"EXITO",summary:"Sede actualizada correctamente",duration:5000, position:'topCenter'});
            let id_sede_db = data.DATOS?.ID_SEDE;
            let sede : Sede = {
              ID_SEDE: +id_sede_db!,
              NOM_SEDE: nombre,
              DIR_SEDE: direccion,
              TEL_SEDE: telefono,
              EMAIL_SEDE: email,
              ID_INSTITUCION: +id_institucion
            }
            this.institucionService.updateSede(sede,+this.sedeID);
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







