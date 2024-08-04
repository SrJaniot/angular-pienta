import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { QuizService } from '../../../servicios/quiz.service';
import { Institucion } from '../../../Modelos/institucion.model';
import { InstitucionService } from '../../../servicios/institucion.service';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { RespuestaServerObtenerInstitucion } from '../../../Modelos/RespuestaServerObtenerInstitucion.model';
import { RespuestaServerCrearSede } from '../../../Modelos/RespuestaServerCrearSede.model';
import { Sede } from '../../../Modelos/sede.model';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrl: './sede.component.css'
})
export class SedeComponent {
  institucionForm: FormGroup= new FormGroup({});


  id_rol:number = 0;
  nombre_role:string = '';

  Instituciones: Institucion[] = [];



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


    //construir formularios
    this.ConstruirFormulario();



  }

  ConstruirFormulario() {
    this.institucionForm = this.fb.group({
      institucion: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.required, Validators.email]],
    });
  }









  onSubmit() {
    if (this.institucionForm.valid) {
      //console.log(this.institucionForm.value);
      let nombre = this.institucionForm.controls["nombre"].value;
      let direccion = this.institucionForm.controls["direccion"].value;
      let telefono = this.institucionForm.controls["telefono"].value;
      let email = this.institucionForm.controls["email"].value;
      let id_institucion = this.institucionForm.controls["institucion"].value;

      this.institucionBackendConectionService.CrearSede(nombre,direccion,telefono,email,+id_institucion).subscribe({
        next: (data: RespuestaServerCrearSede) => {
          if (data.CODIGO == 200) {
            //console.log(data);
            this.toast.success({detail:"EXITO",summary:"Sede creado correctamente",duration:5000, position:'topCenter'});
            //console.log(this.institucionForm.value);
            let id_sede_db = data.DATOS?.ID_SEDE;
            //construimos un objeto de sede con el id de la base de datos
            let sede : Sede = {
              ID_SEDE: +id_sede_db!,
              NOM_SEDE: nombre,
              DIR_SEDE: direccion,
              TEL_SEDE: telefono,
              EMAIL_SEDE: email,
              ID_INSTITUCION: +id_institucion
            }
            this.institucionService.addSede(sede);
            this.institucionForm.reset()
          }else{
            this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
          }
        },
        error: (err: any) => {
          this.toast.error({detail:"ERROR",summary:"Error creando la Sede",duration:5000, position:'topCenter'});
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
