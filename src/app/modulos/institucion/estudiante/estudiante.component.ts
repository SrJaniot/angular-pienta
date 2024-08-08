import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrupoEstudio } from '../../../Modelos/grupoestudio.model';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { InstitucionService } from '../../../servicios/institucion.service';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { Estudiante } from '../../../Modelos/estudiante.model';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent {

  estudianteForm: FormGroup= new FormGroup({});



  id_rol:number = 0;
  nombre_role:string = '';

  GrupoEstudio: GrupoEstudio[] = [];



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
    this.GrupoEstudio = this.institucionService.getGrupos_estudio();



    //construir formularios
    this.ConstruirFormulario();



  }

  ConstruirFormulario() {
    this.estudianteForm = this.fb.group({
      id_gurpo_estudio: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      num_documento: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      tipo_documento: ['', Validators.required],
      usuario_activo: [true, Validators.required],

    });
  }



  onSubmit() {
    if (this.estudianteForm.valid) {
      //console.log(this.institucionForm.value);
      let nombre = this.estudianteForm.controls["nombre"].value;
      let direccion = this.estudianteForm.controls["direccion"].value;
      let telefono = this.estudianteForm.controls["telefono"].value;
      let correo = this.estudianteForm.controls["correo"].value;
      let num_documento = this.estudianteForm.controls["num_documento"].value;
      let tipo_documento = this.estudianteForm.controls["tipo_documento"].value;
      let usuario_activo = this.estudianteForm.controls["usuario_activo"].value;
      let id_grupo_estudio = this.estudianteForm.controls["id_gurpo_estudio"].value;

      correo = correo.toLowerCase();




      this.institucionBackendConectionService.CrearEstudiante(+id_grupo_estudio,nombre,direccion,telefono,correo,num_documento,tipo_documento,usuario_activo).subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.success == true) {
            console.log(data);
            this.toast.success({detail:"EXITO",summary:"Estudiante creado correctamente",duration:5000, position:'topCenter'});
            //console.log(this.institucionForm.value);
            //tomamos el id de la db
            //let id_GrupoEstudio_db = data.DATOS?.ID_GRUPO_ESTUDIO;
            //construimos un objeto de sede con el id de la base de datos
            let estudiante : Estudiante = {
              ID_ESTUDIANTE: num_documento,
              ID_GRUPO_ESTUDIO: +id_grupo_estudio,
              NOM_ESTUDIANTE: nombre,
              DIR_ESTUDIANTE: direccion,
              TEL_ESTUDIANTE: telefono,
              EMAIL_ESTUDIANTE: correo,
              TIPO_DOCUMENTO: tipo_documento,
            }
            this.institucionService.addEstudiante(estudiante);
            this.estudianteForm.reset()
          }else{
            this.toast.error({detail:"ERROR",summary:"error al crear estudiante",duration:5000, position:'topCenter'});
          }
        },
        error: (err: any) => {
          this.toast.error({detail:"ERROR",summary:"Error creando al estudiante",duration:5000, position:'topCenter'});
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
