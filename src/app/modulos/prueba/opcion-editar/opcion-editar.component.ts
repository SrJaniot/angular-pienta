import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { OpcionComponent } from '../opcion/opcion.component';
import { FormBuilder } from '@angular/forms';
import { QuizService } from '../../../servicios/quiz.service';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaServerObtenerUNAOpcion } from '../../../Modelos/RespuestaServerObtenerUNAOpcion.model';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { Opcion } from '../../../Modelos/opcion.model';

@Component({
  selector: 'app-opcion-editar',
  templateUrl: './opcion-editar.component.html',
  styleUrl: './opcion-editar.component.css'
})
export class OpcionEditarComponent extends OpcionComponent implements OnInit {
  @Input() opcionID!: string;
  opcionDB: any;

  constructor(
    fb: FormBuilder,
    quizService: QuizService,
    changeDetector: ChangeDetectorRef,
    PreguntaService: PreguntaService,
    toast: NgToastService,
    seguridadService: SeguridadService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super(fb, quizService,changeDetector, PreguntaService, toast, seguridadService);

  }

  override ngOnInit(): void {
    //console.log(this.preguntaID) // Obtén el ID del contexto de la URL
    //console.log(this.contextoId);
    if (!this.opcionID || this.opcionID === ''  || this.opcionID === '0') {
      // Maneja el caso en el que no se proporciona un ID de contexto
      this.router.navigate(['/prueba/quiz']);
      return;
      // Puedes mostrar un mensaje de error o redirigir a otra página
    }
    this.toast.warning({detail:"ADVERTENCIA",summary:"Ten en cuenta que si editas la opcion y, debe ser editado con cambios mínimos para que el contexto y preguntas mantengan coherencia con dicha opcion",duration:15000, position:'topCenter'});
    this.preguntas = this.quizService.getPreguntas();
    this.ConstruirFormularioArchivo();
    this.ConstruirFormularioOpcion();
    this.PreguntaService.ObtenerOpcionID(this.opcionID).subscribe(
      (data: RespuestaServerObtenerUNAOpcion) => {
        console.log(data);
        console.log(data.DATOS);
        console.log(data.DATOS?.TIPO_OPCION);
      if (data.CODIGO == 200) {

        this.opcionDB = {
          preguntaId: data.DATOS?.ID_PREGUNTA,
          texto: data.DATOS?.TEXTO_OPCION,
          esCorrecta: data.DATOS?.ES_CORRECTA,
          imagen_opcion: data.DATOS?.IMAGEN_OPCION,
          tipo_opcion: data.DATOS?.TIPO_OPCION,
        };
        this.opcionForm.setValue(this.opcionDB);



      }else{
          this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
        }


      }
    );
  }





  override onSubmit() {
    if (this.opcionForm.valid) {
      let pregunta_id:number = this.opcionForm.controls['preguntaId'].value;
      let enunciado:string = this.opcionForm.controls['texto'].value;
      let Valor_opcion:boolean = this.opcionForm.controls['esCorrecta'].value;
      let Imagen_opcion:string = this.opcionForm.controls['imagen_opcion'].value;
      let Tipo_opcion:string = this.opcionForm.controls['tipo_opcion'].value;


      console.log(this.opcionID);
      console.log(pregunta_id);
      console.log(enunciado);
      console.log(Valor_opcion);
      console.log(Imagen_opcion);
      console.log(Tipo_opcion);

      this.PreguntaService.ActualizarOpcion(+this.opcionID,pregunta_id,enunciado,Valor_opcion,Imagen_opcion,Tipo_opcion).subscribe({
        next: (data: RespuestaServer) => {
          if (data.CODIGO == 200) {
            this.toast.success({detail:"EXITO",summary:"Opcion actualizada correctamente",duration:5000, position:'topCenter'});


            //construir Opcion para mandarla a la lista:
            const opcion : Opcion ={
              id: +this.opcionID,
              preguntaId: pregunta_id,
              texto: enunciado,
              esCorrecta: Valor_opcion,
              imagen_opcion: Imagen_opcion,
              tipo_opcion: Tipo_opcion,
            };
            this.quizService.updateOpcion(opcion);
          }else{
            this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
          }
        }
      });
    }
  }



}
