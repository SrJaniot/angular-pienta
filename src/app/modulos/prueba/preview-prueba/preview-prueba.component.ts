import { Component, Input, OnInit } from '@angular/core';
import { PruebaService } from '../../../servicios/prueba.service';
import { ActivatedRoute } from '@angular/router';
import { Contextos } from '../../../Modelos/Contextos.model';
import { Preguntas } from '../../../Modelos/Preguntas.model';
import { Opciones } from '../../../Modelos/Opciones.model';
import { RespuestaServerObtenerPreviewPrueba } from '../../../Modelos/RespuestaServerObtenerPreviewPrueba.model';

@Component({
  selector: 'app-preview-prueba',
  templateUrl: './preview-prueba.component.html',
  styleUrls: ['./preview-prueba.component.css']
})
export class PreviewPruebaComponent implements OnInit {
  //@Input() pruebaID!: string;
  pruebaID = 0;

  Contextos: Contextos[] = [];
  Preguntas: Preguntas[] = [];
  Opciones: Opciones[] = [];

  constructor(
    private PruebaService: PruebaService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    //capturar el id de la prueba por la url
    this.route.paramMap.subscribe(params => {
      this.pruebaID = +params.get('id')!;
    });

    console.log(this.pruebaID);
    //*
    this.PruebaService.TraerPruebaPreview(+this.pruebaID).subscribe(
      (data: RespuestaServerObtenerPreviewPrueba) => {
        if (data.CODIGO == 200){
          this.CapturarDatos(data);
          console.log(this.Contextos);
          console.log(this.Preguntas);
          console.log(this.Opciones);
        } else {
          console.log(data);
        }
      }
    );




  }

  CapturarDatos(data: RespuestaServerObtenerPreviewPrueba) {
    // Capturar contextos
    data.DATOS?.CONTEXTOS?.forEach((contextoData: Contextos) => {
      let contexto = new Contextos();
      contexto.ID_CONTEXTO = contextoData.ID_CONTEXTO;
      contexto.NOM_CONTEXTO = contextoData.NOM_CONTEXTO;
      contexto.DESC_CONTEXTO = contextoData.DESC_CONTEXTO;
      contexto.LINK_MEDIA = contextoData.LINK_MEDIA;
      contexto.TIPO_CONTEXTO = contextoData.TIPO_CONTEXTO;

      this.Contextos.push(contexto);
    });

    // Capturar preguntas
    data.DATOS?.PREGUNTAS?.forEach((preguntaData: Preguntas) => {
      let pregunta = new Preguntas();
      pregunta.ID_PREGUNTA = preguntaData.ID_PREGUNTA;
      pregunta.ID_CONTEXTO = preguntaData.ID_CONTEXTO;
      pregunta.ENUNCIADO_PREGUNTA = preguntaData.ENUNCIADO_PREGUNTA;
      pregunta.TIPO_PREGUNTA = preguntaData.TIPO_PREGUNTA;
      pregunta.PUNTAJE_PREGUNTA = preguntaData.PUNTAJE_PREGUNTA;
      pregunta.AUTOR_PREGUNTA = preguntaData.AUTOR_PREGUNTA;
      pregunta.ID_TEMA_AREA = preguntaData.ID_TEMA_AREA;
      pregunta.NOMBRE_TEMA_AREA = preguntaData.NOMBRE_TEMA_AREA;
      pregunta.ID_AREA_EVALUAR = preguntaData.ID_AREA_EVALUAR;
      pregunta.NOMBRE_AREA_EVALUAR = preguntaData.NOMBRE_AREA_EVALUAR;
      pregunta.IMAGEN_PREGUNTA = preguntaData.IMAGEN_PREGUNTA;
      pregunta.TIPO_PREGUNTA_CONTENIDO = preguntaData.TIPO_PREGUNTA_CONTENIDO;
      pregunta.LAYOUT_PREGUNTA = preguntaData.LAYOUT_PREGUNTA;

      this.Preguntas.push(pregunta);
    });

    // Capturar opciones
    data.DATOS?.OPCIONES?.forEach((opcionData: Opciones) => {
      let opcion = new Opciones();
      opcion.ID_OPCION = opcionData.ID_OPCION;
      opcion.ID_PREGUNTA = opcionData.ID_PREGUNTA;
      opcion.TEXTO_OPCION = opcionData.TEXTO_OPCION;
      opcion.IMAGEN_OPCION = opcionData.IMAGEN_OPCION;
      opcion.TIPO_OPCION = opcionData.TIPO_OPCION;
      opcion.ES_CORRECTA = opcionData.ES_CORRECTA;

      this.Opciones.push(opcion);
    });
  }

  getOpcionesPorPregunta(idPregunta: number): Opciones[] {
    return this.Opciones.filter(opcion => opcion.ID_PREGUNTA === idPregunta);
  }
}
