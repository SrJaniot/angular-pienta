import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PreguntaComponent } from '../pregunta/pregunta.component';
import { FormBuilder } from '@angular/forms';
import { QuizService } from '../../../servicios/quiz.service';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaServerObtenerUNAPregunta } from '../../../Modelos/RespuestaServerObtenerUNAPregunta.model';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { Pregunta } from '../../../Modelos/pregunta.model';
import { RespuestaServerObtenerAreasEvaluar } from '../../../Modelos/RespuestaServer.ObtenerAreasEvaluar.model';

@Component({
  selector: 'app-pregunta-editar',
  templateUrl: './pregunta-editar.component.html',
  styleUrl: './pregunta-editar.component.css'
})
export class PreguntaEditarComponent extends PreguntaComponent implements OnInit {
  @Input() preguntaID!: string;
  preguntaDB: any;

  constructor(
    fb: FormBuilder,
    quizService: QuizService,
    changeDetector: ChangeDetectorRef,
    PreguntaService: PreguntaService,
    toast: NgToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super(fb, quizService,changeDetector, PreguntaService, toast);

  }

  override ngOnInit(): void {
    //console.log(this.preguntaID) // Obtén el ID del contexto de la URL
    //console.log(this.contextoId);
    if (!this.preguntaID || this.preguntaID === ''  || this.preguntaID === '0') {
      // Maneja el caso en el que no se proporciona un ID de contexto
      this.router.navigate(['/prueba/quiz']);
      return;
      // Puedes mostrar un mensaje de error o redirigir a otra página
    }
    this.toast.warning({detail:"ADVERTENCIA",summary:"Ten en cuenta que si editas la pregunta y tienes un contexto y opciones asociadas, debe ser editado con cambios mínimos para que el contexto y opciones mantengan coherencia con dicha pregunta",duration:15000, position:'topCenter'});


    this.PreguntaService.ObtenerAreasPreguntas().subscribe(
      (data: RespuestaServerObtenerAreasEvaluar) => {
        if (data.CODIGO == 200) {
          this.ListaAreasEvaluar = data.DATOS!;
        }
      }
    );

    this.contextos = this.quizService.getContextos();
    this.ConstruirFormularioArchivo();
    this.ConstruirFormularioPregunta();


    this.PreguntaService.ObtenerPreguntaID(this.preguntaID).subscribe(
      (data: RespuestaServerObtenerUNAPregunta) => {
        //console.log(data);
      if (data.CODIGO == 200) {
        this.preguntaDB = {
          contextoId: data.DATOS?.ID_CONTEXTO,
          enunciado: data.DATOS?.ENUNCIADO_PREGUNTA,
          tipo: data.DATOS?.TIPO_PREGUNTA,
          puntaje: data.DATOS?.PUNTAJE_PREGUNTA,
          autor: data.DATOS?.AUTOR_PREGUNTA,
          Tema_evaluar: '',
          area_evaluar: '',
          Imagen_pregunta: data.DATOS?.IMAGEN_PREGUNTA,
          Tipo_pregunta_contenido: data.DATOS?.TIPO_PREGUNTA_CONTENIDO,
          Layout_pregunta: data.DATOS?.LAYOUT_PREGUNTA,

        };
        this.preguntaForm.setValue(this.preguntaDB);
      }else{
          this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
        }


      }
    );



  }





  override onSubmit() {
    if (this.preguntaForm.valid) {
      let contexto_id:number = this.preguntaForm.controls['contextoId'].value;
      let enunciado:string = this.preguntaForm.controls['enunciado'].value;
      let tipo:number= this.preguntaForm.controls['tipo'].value;
      let puntaje:number = this.preguntaForm.controls['puntaje'].value;
      let autor:string = this.preguntaForm.controls['autor'].value;
      let tema_evaluar:number = this.preguntaForm.controls['Tema_evaluar'].value;
      let area_evaluar:number = this.preguntaForm.controls['area_evaluar'].value;

      let imagen_pregunta = this.preguntaForm.controls['Imagen_pregunta'].value;
      let tipo_pregunta_contenido = this.preguntaForm.controls['Tipo_pregunta_contenido'].value;
      let layout_pregunta = this.preguntaForm.controls['Layout_pregunta'].value;

      this.PreguntaService.ActualizarPregunta(+this.preguntaID,+contexto_id,enunciado,+tipo,puntaje,autor,imagen_pregunta,tipo_pregunta_contenido,layout_pregunta).subscribe({
        next: (data: RespuestaServer) => {
          if (data.CODIGO == 200) {
            //preguntar si el id_tema_area y id_area_evaluar cambiaron
            if (this.preguntaDB.Tema_evaluar !== tema_evaluar || this.preguntaDB.area_evaluar !== area_evaluar) {
              this.PreguntaService.RelacionarPreguntaConTemaAreaUPDATE(+this.preguntaID, +tema_evaluar).subscribe(
                (data2: RespuestaServer) => {
                  if (data2.CODIGO == 200) {
                    this.toast.success({detail:"EXITO",summary:"Pregunta actualizada correctamente y sus relaciones",duration:5000, position:'topCenter'});


                    //construir pregunta para mandarla a la lista:
                    //capturamos el nombre del tipo de pregunta
                    let tipo_pregunta_nom = this.ListaTiposPreguntas.find(t => t.id === ""+tipo);
                    //capturamos el nombre del tema
                    let tema = this.ListaSubtemas.find(t => t.ID_TEMA_AREA === +tema_evaluar);
                    //capturamos el nombre del area
                    let area = this.ListaAreasEvaluar.find(t => t.ID_AREA_EVALUAR === +area_evaluar);
                    const pregunta:Pregunta = {
                      id: data.DATOS?.ID_PREGUNTA!,
                      contextoId: +contexto_id,
                      enunciado: enunciado,
                      tipo: +tipo,
                      //esta variable se debe cambiar por el nombre del tipo de pregunta
                      tipo_nombre: tipo_pregunta_nom.nombre,
                      puntaje: puntaje,
                      autor: autor,
                      Area_Evaluar: +area_evaluar,
                      Area_Evaluar_nombre:area?.NOM_AREA_EVALUAR!,
                      Tema_Evaluar: +tema_evaluar,
                      Tema_Evaluar_nombre: tema?.NOM_TEMA_AREA!,

                      imagen_pregunta: imagen_pregunta,
                      tipo_pregunta_contenido: tipo_pregunta_contenido,
                      layout_pregunta: layout_pregunta,

                    };

                    //imprimir pregunta


                    this.quizService.updatePregunta(pregunta);


                  }else{
                    this.toast.error({detail:"ERROR",summary:data2.MENSAJE,duration:5000, position:'topCenter'});
                  }
                }
              );
            } else {
              this.toast.success({detail:"EXITO",summary:"Pregunta actualizada correctamente",duration:5000, position:'topCenter'});

              //construir pregunta para mandarla a la lista:
              //capturamos el nombre del tipo de pregunta
              //console.log(tipo);
              let tipo_pregunta_nom = this.ListaTiposPreguntas.find(t => t.id === ""+tipo);
              //console.log(tipo_pregunta_nom);
              //capturamos el nombre del tema
              let tema = this.ListaSubtemas.find(t => t.ID_TEMA_AREA === +tema_evaluar);
              //capturamos el nombre del area
              let area = this.ListaAreasEvaluar.find(t => t.ID_AREA_EVALUAR === +area_evaluar);
              const pregunta:Pregunta = {
              id: data.DATOS?.ID_PREGUNTA!,
              contextoId: +contexto_id,
              enunciado: enunciado,
              tipo: +tipo,
              //esta variable se debe cambiar por el nombre del tipo de pregunta
              tipo_nombre: tipo_pregunta_nom.nombre,
              puntaje: puntaje,
              autor: autor,
              Area_Evaluar: +area_evaluar,
              Area_Evaluar_nombre:area?.NOM_AREA_EVALUAR!,
              Tema_Evaluar: +tema_evaluar,
              Tema_Evaluar_nombre: tema?.NOM_TEMA_AREA!,

              imagen_pregunta: imagen_pregunta,
              tipo_pregunta_contenido: tipo_pregunta_contenido,
              layout_pregunta: layout_pregunta,



              };
              //imprimir pregunta
              console.log(pregunta)
              console.log(pregunta)
              console.log(pregunta)
              console.log(pregunta)
              this.quizService.updatePregunta(pregunta);
            }
          }else{
            this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
          }
        },
        error: (err: any) => {
          this.toast.error({detail:"ERROR",summary:"Error actualizando el contexto",duration:5000, position:'topCenter'});
        }
      });
    }
  }



}
