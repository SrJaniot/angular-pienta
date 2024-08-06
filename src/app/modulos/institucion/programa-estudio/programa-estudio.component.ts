import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sede } from '../../../Modelos/sede.model';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { InstitucionService } from '../../../servicios/institucion.service';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { AreaEstudio } from '../../../Modelos/areaestudio.model';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { RespuestaServerCrearProgramaEstudio } from '../../../Modelos/RespuestaServerCrearProgramaEstudio.model';
import { ProgramaEstudio } from '../../../Modelos/programaestudio.model';

@Component({
  selector: 'app-programa-estudio',
  templateUrl: './programa-estudio.component.html',
  styleUrl: './programa-estudio.component.css'
})
export class ProgramaEstudioComponent {
  ProgramaForm: FormGroup= new FormGroup({});


  id_rol:number = 0;
  nombre_role:string = '';

  AreasEstudio: AreaEstudio[] = [];



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
    this.AreasEstudio = this.institucionService.getAreas_estudio();



    //construir formularios
    this.ConstruirFormulario();



  }

  ConstruirFormulario() {
    this.ProgramaForm = this.fb.group({
      id_area_estudio: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo_formacion: ['', Validators.required],
    });
  }









  onSubmit() {
    if (this.ProgramaForm.valid) {
      //console.log(this.institucionForm.value);
      let nombre = this.ProgramaForm.controls["nombre"].value;
      let descripcion = this.ProgramaForm.controls["descripcion"].value;
      let id_areaEstudio = this.ProgramaForm.controls["id_area_estudio"].value;
      let tipo_formacion = this.ProgramaForm.controls["tipo_formacion"].value;

      this.institucionBackendConectionService.CrearProgramaEstudio(nombre,descripcion,+id_areaEstudio,tipo_formacion).subscribe({
        next: (data: RespuestaServerCrearProgramaEstudio) => {
          if (data.CODIGO == 200) {
            //console.log(data);
            this.toast.success({detail:"EXITO",summary:"Area Estudio creado correctamente",duration:5000, position:'topCenter'});
            //console.log(this.institucionForm.value);
            let id_ProgramaEstudio_db = data.DATOS?.ID_PROGRAMA_ESTUDIO;
            //construimos un objeto de sede con el id de la base de datos
            let ProgramaEstudio : ProgramaEstudio = {
              ID_PROGRAMA_ESTUDIO: id_ProgramaEstudio_db!,
              ID_AREA_ESTUDIO: id_areaEstudio,
              NOM_PROGRAMA_ESTUDIO: nombre,
              DESCRIPCION_PROGRAMA_ESTUDIO: descripcion,
              TIPO_FORMACION_PROGRAMA: tipo_formacion
            }
            this.institucionService.addPrograma_estudio(ProgramaEstudio);
            this.ProgramaForm.reset()
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
