import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreasEvaluar } from '../../../Modelos/ObtenerAreasEvaluar.model';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { InstitucionService } from '../../../servicios/institucion.service';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { RespuestaServerObtenerAreasEvaluar } from '../../../Modelos/RespuestaServer.ObtenerAreasEvaluar.model';
import { Tutor } from '../../../Modelos/tutor.modle';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrl: './tutor.component.css'
})
export class TutorComponent {


  TutorForm: FormGroup= new FormGroup({});



  id_rol:number = 0;
  nombre_role:string = '';

  ListaAreasEvaluar: AreasEvaluar[] = [];



  constructor(
     protected fb: FormBuilder,
     protected toast: NgToastService,
     protected seguridadService: SeguridadService,
     protected institucionService: InstitucionService,
     protected institucionBackendConectionService: InstitucionBackendConectionService,
     protected PreguntaService: PreguntaService
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
    this.PreguntaService.ObtenerAreasPreguntas().subscribe(
      (data: RespuestaServerObtenerAreasEvaluar) => {
        if (data.CODIGO == 200) {
          this.ListaAreasEvaluar = data.DATOS!;
        }
      }
    );



    //construir formularios
    this.ConstruirFormulario();



  }

  ConstruirFormulario() {
    this.TutorForm = this.fb.group({
      id_tutor: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      id_area_evaluar: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      usuario_activo: [true, Validators.required],

    });
  }



  onSubmit() {
    if (this.TutorForm.valid) {
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




      this.institucionBackendConectionService.CrearTutor(+id_area_evaluar,nombre,direccion,telefono,correo,+id_tutor,apellido,usuario_activo).subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.success == true) {
            console.log(data);
            this.toast.success({detail:"EXITO",summary:"Tutor creado correctamente",duration:5000, position:'topCenter'});
            //console.log(this.institucionForm.value);
            //tomamos el id de la db
            //let id_GrupoEstudio_db = data.DATOS?.ID_GRUPO_ESTUDIO;
            //construimos un objeto de sede con el id de la base de datos
            let tutor : Tutor = {
              ID_TUTOR: +id_tutor,
              ID_AREA_EVALUAR: +id_area_evaluar,
              NOM_TUTOR: nombre,
              APELLIDO_TUTOR: apellido,
              DIR_TUTOR: direccion,
              TEL_TUTOR: telefono,
              EMAIL_TUTOR: correo

            }
            this.institucionService.addTutor(tutor);
            this.TutorForm.reset()
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
