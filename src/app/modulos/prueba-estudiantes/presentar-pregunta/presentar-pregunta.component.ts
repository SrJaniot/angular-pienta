import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { RespuestaServerObtenerPreviewPregunta } from '../../../Modelos/RespuestaServer.RespuestaServer.ObtenerPreviewPregunta.model';
import { ActivatedRoute } from '@angular/router';
import { Contextos } from '../../../Modelos/Contextos.model';
import { Preguntas } from '../../../Modelos/Preguntas.model';
import { Opciones } from '../../../Modelos/Opciones.model';
import { ConfiguracionRutasBackend } from '../../../config/configuracion.rutas.backend';

@Component({
  selector: 'app-presentar-pregunta',
  templateUrl: './presentar-pregunta.component.html',
  styleUrl: './presentar-pregunta.component.css'
})
export class PresentarPreguntaComponent implements OnChanges {
  //variables
  @Input() preguntaID!: string;

  Contexto: Contextos = new Contextos();
  Pregunta: Preguntas = new Preguntas();
  Opciones: Opciones[] = [];
  Tipo_opcion: string = '';
  respuestaSeleccionada: number | null = null;

  url_backend_ms_negocio = ConfiguracionRutasBackend.url_backend_ms_negocio;


  constructor(
    private PreguntaService: PreguntaService,
    private route: ActivatedRoute,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['preguntaID'] && !changes['preguntaID'].isFirstChange()) {
      console.log('Pregunta ID cambiado:', this.preguntaID);
      this.cargarPregunta();
      this.cargarSeleccion();

    }
  }

  ngOnInit() {
    this.cargarPregunta();
    this.cargarSeleccion();

  }

  cargarPregunta() {
    console.log('Cargando pregunta con ID:', this.preguntaID);
    this.PreguntaService.TraerPreguntaPreview(this.preguntaID).subscribe(
      (data: RespuestaServerObtenerPreviewPregunta) => {
        if (data.CODIGO == 200){
          this.CapturarDatos(data);
          console.log(this.Contexto);
          console.log(this.Pregunta);
          console.log(this.Opciones);
        } else {
          console.log(data);
        }
      }
    );
  }

  //funcion para capturar todos los atributos de respuesta del servidor en variables
  CapturarDatos(data: RespuestaServerObtenerPreviewPregunta) {
    //aca capturamos dato por dato de la respuesta del servidor para el objeto Contexto
    this.Contexto.ID_CONTEXTO = data.DATOS?.CONTEXTO?.ID_CONTEXTO;
    this.Contexto.NOM_CONTEXTO = data.DATOS?.CONTEXTO?.NOMBRE_CONTEXTO;
    this.Contexto.DESC_CONTEXTO = data.DATOS?.CONTEXTO?.DESCRIPCION_CONTEXTO;
    this.Contexto.LINK_MEDIA = data.DATOS?.CONTEXTO?.ARCHIVO_CONTEXTO;
    this.Contexto.AUTOR_CONTEXTO = data.DATOS?.CONTEXTO?.AUTOR_CONTEXTO;
    this.Contexto.TIPO_CONTEXTO = data.DATOS?.CONTEXTO?.TIPO_CONTEXTO;
    //aca capturamos dato por dato de la respuesta del servidor para el objeto Pregunta
    this.Pregunta.ID_PREGUNTA = data.DATOS?.PREGUNTA?.ID_PREGUNTA;
    this.Pregunta.ID_CONTEXTO = data.DATOS?.PREGUNTA?.ID_CONTEXTO;
    this.Pregunta.ENUNCIADO_PREGUNTA = data.DATOS?.PREGUNTA?.ENUNCIADO_PREGUNTA;
    this.Pregunta.TIPO_PREGUNTA = data.DATOS?.PREGUNTA?.TIPO_PREGUNTA;
    this.Pregunta.PUNTAJE_PREGUNTA = data.DATOS?.PREGUNTA?.PUNTAJE_PREGUNTA;
    this.Pregunta.AUTOR_PREGUNTA = data.DATOS?.PREGUNTA?.AUTOR_PREGUNTA;
    this.Pregunta.ID_TEMA_AREA = data.DATOS?.PREGUNTA?.ID_TEMA_AREA;
    this.Pregunta.NOMBRE_TEMA_AREA = data.DATOS?.PREGUNTA?.NOMBRE_TEMA_AREA;
    this.Pregunta.ID_AREA_EVALUAR = data.DATOS?.PREGUNTA?.ID_AREA_EVALUAR;
    this.Pregunta.NOMBRE_AREA_EVALUAR = data.DATOS?.PREGUNTA?.NOMBRE_AREA_EVALUAR;
    this.Pregunta.IMAGEN_PREGUNTA = data.DATOS?.PREGUNTA?.IMAGEN_PREGUNTA;
    this.Pregunta.TIPO_PREGUNTA_CONTENIDO = data.DATOS?.PREGUNTA?.TIPO_PREGUNTA_CONTENIDO;
    this.Pregunta.LAYOUT_PREGUNTA = data.DATOS?.PREGUNTA?.LAYOUT_PREGUNTA;
    //aca capturamos dato por dato de la respuesta del servidor para el objeto Opciones
    //utilizamos un bucle foreach para recorrer todas las opciones
    this.Opciones = [];
    data.DATOS?.OPCIONES?.forEach(element => {
      let opcion = new Opciones();
      opcion.ID_OPCION = element.ID_OPCION;
      opcion.ID_PREGUNTA = element.ID_PREGUNTA;
      opcion.TEXTO_OPCION = element.DESCRIPCION_OPCION;
      opcion.ES_CORRECTA = element.ES_CORRECTA;
      opcion.IMAGEN_OPCION = element.IMAGEN_OPCION;
      opcion.TIPO_OPCION = element.TIPO_OPCION_CONTENIDO;
      this.Tipo_opcion = element.TIPO_OPCION_CONTENIDO;
      this.Opciones.push(opcion);
    });


  }

  cargarSeleccion(): void {
    // Obtener la lista actual de respuestas del localStorage
    let respuestas = JSON.parse(localStorage.getItem('respuestas')!) || [];
    // Buscar si ya existe una respuesta para la pregunta actual
    console.log('Respuestas:', respuestas);

    console.log('id_pregunta', this.preguntaID);
    const respuesta = respuestas.find((respuesta: any) => respuesta.idPregunta === +this.preguntaID);


    console.log('Respuesta encontrada:', respuesta);



    if (respuesta) {
      // Si existe, establecer la opción seleccionada
      this.respuestaSeleccionada = respuesta.idOpcion;
    }
  }

  guardarSeleccion(idPregunta: number, idOpcion: number): void {
    // Obtener la lista actual de respuestas del localStorage
    let respuestas = JSON.parse(localStorage.getItem('respuestas')!) || [];

    // Buscar si ya existe una respuesta para la pregunta dada
    const index = respuestas.findIndex((respuesta: any) => respuesta.idPregunta === idPregunta);

    if (index !== -1) {
      // Si ya existe, actualiza la respuesta
      respuestas[index].idOpcion = idOpcion;
    } else {
      // Si no existe, crea la nueva dupla de pregunta y opción
      const nuevaRespuesta = { idPregunta, idOpcion };
      // Añadir la nueva respuesta a la lista
      respuestas.push(nuevaRespuesta);
    }

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('respuestas', JSON.stringify(respuestas));
  }






}
