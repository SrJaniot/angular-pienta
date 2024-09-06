import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pregunta } from '../../../Modelos/pregunta.model';
import { QuizService } from '../../../servicios/quiz.service';
import { NgToastService } from 'ng-angular-popup';
import { PruebaControllService } from '../../../servicios/prueba-controll.service';
import { PruebaService } from '../../../servicios/prueba.service';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { prueba } from '../../../Modelos/prueba.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prueba-custom',
  templateUrl: './prueba-custom.component.html',
  styleUrls: ['./prueba-custom.component.css']
})
export class PruebaCustomComponent {
  currentStep = 1;
  preguntas: Pregunta[] = [];

  showPreguntaListaModal = false;
  showPreguntaPreviewModal = false;

  tuIdDePregunta = ''; // El ID de la pregunta que quieres editar

  step1Form: FormGroup = new FormGroup({});
  step2Form: FormGroup = new FormGroup({});
  step3Form: FormGroup = new FormGroup({});




  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private toast : NgToastService,
    private pruebaControllService: PruebaControllService,
    private pruebaService: PruebaService,
    private seguridadService: SeguridadService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.quizService.limpiarListaPreguntas();
    this.preguntas = this.quizService.getPreguntas();

    //construir formulario
    this.ConstruirFormularioPaso1();
    this.ConstruirFormularioPaso2();

  }

  ConstruirFormularioPaso1() {
    this.step1Form = this.fb.group({
      nombre_prueba: ['', Validators.required],
      fecha_inicio_prueba: ['', Validators.required],
      fecha_fin_prueba: ['', Validators.required,],
      duracion_prueba: ['', Validators.required]
    });
  }

  ConstruirFormularioPaso2() {
    this.step2Form = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required]
    });

  }

  //----------------------PRUEBA-----------------------------------------------------------------------------------------------------------------------
  closePreviewPreguntaForm() {
    this.showPreguntaPreviewModal = false;
  }

  previewpregunta(id_pregunta: number) {
    let id_pregunta_strinng = id_pregunta.toString()
    this.tuIdDePregunta = id_pregunta_strinng// El ID del contexto que quieres editar
    this.showPreguntaPreviewModal = true;
  }
  eliminarPreguntaLista(id_pregunta: number) {
    let id_Pregunta_string = id_pregunta.toString()
    if (id_Pregunta_string === '0' || id_Pregunta_string === '') {
      this.toast.warning({detail:"ADVERTENCIA",summary:'ACCESO DENEGADO',duration:5000, position: 'topCenter'});
      return;
    }
    this.quizService.eliminarPregunta(id_pregunta);
  }

  listarPreguntas() {
    this.showPreguntaListaModal = true;
  }

  closePreguntaListaForm() {
    this.showPreguntaListaModal = false;
  }


  CrearPruebaCustom() {
    if (this.step1Form.valid) {
      let nombre_prueba = this.step1Form.get('nombre_prueba')?.value;
      let fecha_inicio_prueba = this.step1Form.get('fecha_inicio_prueba')?.value;
      let fecha_fin_prueba = this.step1Form.get('fecha_fin_prueba')?.value;
      let duracion_prueba = this.step1Form.get('duracion_prueba')?.value;

      //capturar el nombre del usuario usando el servicio de seguridad en el localstorage
      let usuario_activo = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION();
      let nombre_usuario = usuario_activo?.usuario?.nombre;
      //console.log(usuario_activo);
      //console.log(usuario_activo?.usuario?.id_usuario);
      let descripcion = 'Prueba generada por el usuario: ' + nombre_usuario;
      let tipo = 'custom';
      //Crea un json con todos los id de las preguntas seleccionadas es decir las preguntas que estan en la lista de preguntas
      let preguntas_seleccionadas = this.preguntas.map(p => p.id);

      // Convertir la lista de enteros a una cadena JSON
      let preguntas_seleccionadas_json = JSON.stringify(preguntas_seleccionadas);

      //console.log(preguntas_seleccionadas_json); // Verifica la salida en la consola      //conbertir a json la lista de preguntas seleccionadas


      //console.log(preguntas_seleccionadas);




      //validar que la fecha de inicio sea menor a la fecha fin y que no sea menor a la fecha actual
      let fecha_inicio = new Date(fecha_inicio_prueba);
      let fecha_fin = new Date(fecha_fin_prueba);
      let fecha_actual = new Date();
      if (fecha_inicio > fecha_fin || fecha_inicio < fecha_actual) {
        this.toast.warning({detail:"ADVERTENCIA",summary:'FECHAS INVALIDAS',duration:5000, position: 'topCenter'});
        return;
      }
      //validar que  exista almenos una pregunta
      if (preguntas_seleccionadas.length === 0) {
        this.toast.warning({detail:"ADVERTENCIA",summary:'NO HAY PREGUNTAS',duration:5000, position: 'topCenter'});
        return;
      }
      //crear la prueba
      this.pruebaService.CrearPruebaCustom(nombre_prueba, descripcion, tipo, fecha_inicio, fecha_fin, duracion_prueba,preguntas_seleccionadas_json).subscribe(
        (data) => {
          console.log(data);
          if (data.CODIGO === 200) {
            //agregar la prueba a la lista de pruebas
            let pruena:prueba = {
              ID_PRUEBA: data.DATOS!.ID_PRUEBA,
              NOM_PRUEBA: nombre_prueba,
              DESCRIPCION_PRUEBA: descripcion,
              TIPO_PRUEBA: tipo,
              FECHA_PRUEBA_INICIO: fecha_inicio,
              FECHA_PRUEBA_FIN: fecha_fin,
              DURACION_PRUEBA_MINUTOS: duracion_prueba,
              NUMERO_PREGUNTAS: preguntas_seleccionadas.length
            }
            this.pruebaControllService.addPrueba(pruena);
            this.toast.success({detail:"EXITO",summary:'Prueba creada',duration:5000, position: 'topCenter'});
            this.router.navigate(['/prueba/control']);
          } else {
            this.toast.error({detail:"ERROR",summary:'Prueba no creada',duration:5000, position: 'topCenter'});
          }
        }
      );

    }

  }












//----------------------PASOS-----------------------------------------------------------------------------------------------------------------------
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitForm() {
    if (this.step1Form.valid && this.step2Form.valid && this.step3Form.valid) {
      const formData = {
        ...this.step1Form.value,
        ...this.step2Form.value,
        ...this.step3Form.value
      };
      console.log('Formulario enviado:', formData);
    } else {
      console.log('Formulario no válido');
    }
  }
}
