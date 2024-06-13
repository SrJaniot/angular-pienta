import { Component, Input } from '@angular/core';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { RespuestaServerObtenerPreviewPregunta } from '../../../Modelos/RespuestaServer.RespuestaServer.ObtenerPreviewPregunta.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview-pregunta',
  templateUrl: './preview-pregunta.component.html',
  styleUrl: './preview-pregunta.component.css'
})
export class PreviewPreguntaComponent {
  @Input() preguntaID!: string;


  constructor(
    private PreguntaService: PreguntaService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    //variable de prueba para mandar por url el parametro OJO CAMBIAR CUANDOS SE TERMINE DE TESTING POR THIS.preguntaID
    let id_pregunta = this.route.snapshot.paramMap.get('id_pregunta');
    //aca se inicializa el componente, es decir tengo que llamar a una funcion que me traiga la preview de la pregunta
    this.PreguntaService.TraerPreguntaPreview(id_pregunta!).subscribe(
      (data: RespuestaServerObtenerPreviewPregunta) => {
        if (data.CODIGO == 200){
          console.log(data);
          console.log(data.DATOS?.CONTEXTO);
          console.log(data.DATOS?.CONTEXTO?.NOMBRE_CONTEXTO);
          console.log(data.DATOS?.PREGUNTA);
          console.log(data.DATOS?.PREGUNTA?.ENUNCIADO_PREGUNTA);
          console.log(data.DATOS?.OPCIONES);
          console.log(data.DATOS?.OPCIONES[0]);
          console.log(data.DATOS?.OPCIONES[0].DESCRIPCION_OPCION);
        }else{
          console.log(data);
        }
      }
    );


  }



}
