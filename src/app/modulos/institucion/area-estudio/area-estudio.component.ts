import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sede } from '../../../Modelos/sede.model';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { InstitucionService } from '../../../servicios/institucion.service';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { RespuestaServerCrearSede } from '../../../Modelos/RespuestaServerCrearSede.model';
import { RespuestaServerCrearAreaEstudio } from '../../../Modelos/RespuestaServerCrearAreaEstudio.model';
import { AreaEstudio } from '../../../Modelos/areaestudio.model';

@Component({
  selector: 'app-area-estudio',
  templateUrl: './area-estudio.component.html',
  styleUrl: './area-estudio.component.css'
})
export class AreaEstudioComponent {

  AreaForm: FormGroup= new FormGroup({});


  id_rol:number = 0;
  nombre_role:string = '';

  Sedes: Sede[] = [];



  constructor(
     protected fb: FormBuilder,
     protected toast: NgToastService,
     protected seguridadService: SeguridadService,
     protected institucionService: InstitucionService,
     protected institucionBackendConectionService: InstitucionBackendConectionService,
    ) { }

  ngOnInit(): void {
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
    //obtener Sedes
    this.Sedes = this.institucionService.getSedes();



    //construir formularios
    this.ConstruirFormulario();



  }

  ConstruirFormulario() {
    this.AreaForm = this.fb.group({
      id_sede: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }









  onSubmit() {
    if (this.AreaForm.valid) {
      //console.log(this.institucionForm.value);
      let nombre = this.AreaForm.controls["nombre"].value;
      let descripcion = this.AreaForm.controls["descripcion"].value;
      let id_sede = this.AreaForm.controls["id_sede"].value;

      this.institucionBackendConectionService.CrearAreaEstudio(nombre,descripcion,+id_sede).subscribe({
        next: (data: RespuestaServerCrearAreaEstudio) => {
          if (data.CODIGO == 200) {
            //console.log(data);
            this.toast.success({detail:"EXITO",summary:"Area Estudio creado correctamente",duration:5000, position:'topCenter'});
            //console.log(this.institucionForm.value);
            let id_AreaEstudio_db = data.DATOS?.ID_AREA_ESTUDIO;
            //construimos un objeto de sede con el id de la base de datos
            let AreaEstudio : AreaEstudio = {
              ID_AREA_ESTUDIO: id_AreaEstudio_db!,
              ID_SEDE: id_sede,
              NOM_AREA_ESTUDIO: nombre,
              DESCRIPCION_AREA_ESTUDIO: descripcion

            }
            this.institucionService.addArea_estudio(AreaEstudio);
            this.AreaForm.reset()
          }else{
            this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
          }
        },
        error: (err: any) => {
          this.toast.error({detail:"ERROR",summary:"Error creando la Area estudio",duration:5000, position:'topCenter'});
        }
      });

      //console.log(nombre);
      //console.log(descripcion);
      //console.log(autor);
      //console.log(nombreArchivo);

      //console.log(this.institucionForm.value);
      //this.quizService.addContexto(this.institucionForm.value);
      //this.institucionForm.reset();
    }
  }



}
