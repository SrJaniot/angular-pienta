import { Component } from '@angular/core';
import { ProgramaEstudio } from '../../../Modelos/programaestudio.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { InstitucionService } from '../../../servicios/institucion.service';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { RespuestaServerCrearGrupoEstudio } from '../../../Modelos/RespuestaServerCrearGrupoEstudio.model';
import { GrupoEstudio } from '../../../Modelos/grupoestudio.model';

@Component({
  selector: 'app-grupo-estudio',
  templateUrl: './grupo-estudio.component.html',
  styleUrl: './grupo-estudio.component.css'
})
export class GrupoEstudioComponent {
  GrupoForm: FormGroup= new FormGroup({});



  id_rol:number = 0;
  nombre_role:string = '';

  ProgramasEstudio: ProgramaEstudio[] = [];



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
    this.ProgramasEstudio = this.institucionService.getProgramas_estudio();



    //construir formularios
    this.ConstruirFormulario();



  }

  ConstruirFormulario() {
    this.GrupoForm = this.fb.group({
      id_programa_estudio: ['', Validators.required],
      id_grupo_estudio: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      jornada: ['', Validators.required],
    });
  }









  onSubmit() {
    if (this.GrupoForm.valid) {
      //console.log(this.institucionForm.value);
      let nombre = this.GrupoForm.controls["nombre"].value;
      let descripcion = this.GrupoForm.controls["descripcion"].value;
      let jornada = this.GrupoForm.controls["jornada"].value;
      let id_grupo_estudio = this.GrupoForm.controls["id_grupo_estudio"].value;
      let id_programa_estudio = this.GrupoForm.controls["id_programa_estudio"].value;


      this.institucionBackendConectionService.CrearGrupoEstudio(+id_grupo_estudio,nombre,descripcion,jornada,+id_programa_estudio).subscribe({
        next: (data: RespuestaServerCrearGrupoEstudio) => {
          if (data.CODIGO == 200) {
            //console.log(data);
            this.toast.success({detail:"EXITO",summary:"Area Estudio creado correctamente",duration:5000, position:'topCenter'});
            //console.log(this.institucionForm.value);
            let id_GrupoEstudio_db = data.DATOS?.ID_GRUPO_ESTUDIO;
            //construimos un objeto de sede con el id de la base de datos
            let GrupoEstudio : GrupoEstudio = {
              ID_GRUPO_ESTUDIO: id_GrupoEstudio_db!,
              ID_PROGRAMA_ESTUDIO: id_programa_estudio,
              NOM_GRUPO_ESTUDIO: nombre,
              DESCRIPCION_GRUPO_ESTUDIO: descripcion,
              JORNADA_GRUPO_ESTUDIO: jornada

            }
            this.institucionService.addGrupo_estudio(GrupoEstudio);
            this.GrupoForm.reset()
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
