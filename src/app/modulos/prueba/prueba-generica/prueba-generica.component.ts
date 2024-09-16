import { Component } from '@angular/core';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreasEvaluar } from '../../../Modelos/ObtenerAreasEvaluar.model';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { RespuestaServerObtenerAreasEvaluar } from '../../../Modelos/RespuestaServer.ObtenerAreasEvaluar.model';
import { PruebaService } from '../../../servicios/prueba.service';
import { RespuestaServerCrearPruebaGenerica } from '../../../Modelos/RespuestaServerCrearPruebaGenerica.model';
import { prueba } from '../../../Modelos/prueba.model';
import { PruebaControllService } from '../../../servicios/prueba-controll.service';

@Component({
  selector: 'app-prueba-generica',
  templateUrl: './prueba-generica.component.html',
  styleUrl: './prueba-generica.component.css'
})
export class PruebaGenericaComponent {
  tipoPruebaSeleccionada: number = 0;



  PruebaForm: FormGroup= new FormGroup({});



  id_rol:number = 0;
  nombre_role:string = '';

  ListaAreasEvaluar: AreasEvaluar[] = [];



  constructor(
     private fb: FormBuilder,
     private toast: NgToastService,
     private seguridadService: SeguridadService,
     private PreguntaService: PreguntaService,
     private PruebaService: PruebaService,
     private pruebaControllService: PruebaControllService
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
    this.PruebaForm = this.fb.group({
      nombre: ['', Validators.required],
      id_area_evaluar: ['', Validators.required],
      num_preguntas: [''],
      Fecha_inicio_prueba: ['', Validators.required],
      Fecha_fin_prueba: ['', Validators.required],
      Cantidad_minutos: ['', [Validators.required]],
    });
  }



  onSubmit() {
    if (this.PruebaForm.valid) {
      //console.log(this.institucionForm.value);

      let nombre = this.PruebaForm.controls["nombre"].value;
      let id_area_evaluar = this.PruebaForm.controls["id_area_evaluar"].value;
      let num_preguntas = this.PruebaForm.controls["num_preguntas"].value;
      let Fecha_inicio_prueba = this.PruebaForm.controls["Fecha_inicio_prueba"].value;
      let Fecha_fin_prueba = this.PruebaForm.controls["Fecha_fin_prueba"].value;
      let Cantidad_minutos = this.PruebaForm.controls["Cantidad_minutos"].value;

      //capturar el nombre del usuario usando el servicio de seguridad en el localstorage
      let usuario_activo = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION();
      let nombre_usuario = usuario_activo?.usuario?.nombre;
      //console.log(usuario_activo);
      //console.log(usuario_activo?.usuario?.id_usuario);
      let descripcion = 'Prueba generada por el usuario: ' + nombre_usuario;
      let tipo = 'generica';

      //Validacion de las fechas
      let fecha_inicio = new Date(Fecha_inicio_prueba);
      let fecha_fin = new Date(Fecha_fin_prueba);
      let fecha_actual = new Date();
      //console.log(fecha_inicio);
      //console.log(fecha_fin);
      //console.log(fecha_actual);
      if (fecha_inicio < fecha_actual) {
        this.toast.error({detail:"ERROR",summary:"La fecha de inicio no puede ser menor a la fecha actual",duration:5000, position:'topCenter'});
        return;
      }
      if (fecha_fin < fecha_inicio) {
        this.toast.error({detail:"ERROR",summary:"La fecha de fin no puede ser menor a la fecha de inicio",duration:5000, position:'topCenter'});
        return;
      }

      //validacion de dos casos, cuando el tipo pruba o id_area_evaluar  menor a 1
      if (this.tipoPruebaSeleccionada == 0) {
        this.toast.error({detail:"ERROR",summary:"Seleccione un tipo de prueba",duration:5000, position:'topCenter'});
        return;
      }
      if (+id_area_evaluar < 1) {
        this.PruebaService.CrearPruebaGenericaTYT(nombre,descripcion,tipo,fecha_inicio,fecha_fin,Cantidad_minutos).subscribe({
          next: (data: RespuestaServerCrearPruebaGenerica) => {
            console.log(data);
            if (data.CODIGO == 200) {
              console.log(data);
              this.toast.success({detail:"EXITO",summary:"Tutor creado correctamente",duration:5000, position:'topCenter'});
              //console.log(this.institucionForm.value);
              //tomamos el id de la db
              //let id_GrupoEstudio_db = data.DATOS?.ID_GRUPO_ESTUDIO;
              //construimos un objeto de sede con el id de la base de datos
              let numero_preguntas_tyt = 100;
              let Prueba : prueba = {
                ID_PRUEBA: data.DATOS?.ID_PRUEBA!,
                NOM_PRUEBA: nombre,
                DESCRIPCION_PRUEBA: descripcion,
                TIPO_PRUEBA: tipo,
                FECHA_PRUEBA_INICIO: fecha_inicio,
                FECHA_PRUEBA_FIN: fecha_fin,
                DURACION_PRUEBA_MINUTOS: Cantidad_minutos,
                NUMERO_PREGUNTAS: numero_preguntas_tyt
              }
              this.pruebaControllService.addPrueba(Prueba);
              this.PruebaForm.reset()
            }else{
              this.toast.error({detail:"ERROR",summary:"error al crear prueba",duration:5000, position:'topCenter'});
            }
          },
          error: (err: any) => {
            this.toast.error({detail:"ERROR",summary:"Error creando al prueba",duration:5000, position:'topCenter'});
          }
        });


      }else{
        this.PruebaService.CrearPruebaGenerica(nombre,descripcion,tipo,fecha_inicio,fecha_fin,Cantidad_minutos,+num_preguntas,+id_area_evaluar).subscribe({
          next: (data: RespuestaServerCrearPruebaGenerica) => {
            //console.log(data);
            if (data.CODIGO == 200) {
              console.log(data);
              this.toast.success({detail:"EXITO",summary:"prueba creado correctamente",duration:5000, position:'topCenter'});
              //console.log(this.institucionForm.value);
              //tomamos el id de la db
              //let id_GrupoEstudio_db = data.DATOS?.ID_GRUPO_ESTUDIO;
              //construimos un objeto de sede con el id de la base de datos
              let Prueba : prueba = {
                ID_PRUEBA: data.DATOS?.ID_PRUEBA!,
                NOM_PRUEBA: nombre,
                DESCRIPCION_PRUEBA: descripcion,
                TIPO_PRUEBA: tipo,
                FECHA_PRUEBA_INICIO: fecha_inicio,
                FECHA_PRUEBA_FIN: fecha_fin,
                DURACION_PRUEBA_MINUTOS: Cantidad_minutos,
                NUMERO_PREGUNTAS: num_preguntas


              }
              this.pruebaControllService.addPrueba(Prueba);
              this.PruebaForm.reset()
            }else{
              this.toast.error({detail:"ERROR",summary:"error al crear prueba",duration:5000, position:'topCenter'});
            }
          },
          error: (err: any) => {
            this.toast.error({detail:"ERROR",summary:"Error creando al prueba",duration:5000, position:'topCenter'});
          }
        });



      }
























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

