import { Component } from '@angular/core';
import { RespuestaServerObtenerAreasEvaluar } from '../../../Modelos/RespuestaServer.ObtenerAreasEvaluar.model';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { AreasEvaluar } from '../../../Modelos/ObtenerAreasEvaluar.model';
import { RespuestaServerObtenerTemasAreasEvaluar } from '../../../Modelos/RespuestaServer.ObtenerTemasAreasEvaluar.model';
import { TemasAreasEvaluar } from '../../../Modelos/TemasAreasEvaluar.model';

@Component({
  selector: 'app-crear-preguntas-contexto',
  templateUrl: './crear-preguntas-contexto.component.html',
  styleUrl: './crear-preguntas-contexto.component.css'
})
export class CrearPreguntasContextoComponent {
  //variables
  ListaAreasEvaluar: AreasEvaluar[] = [];
  ListaSubtemas: TemasAreasEvaluar[] = [];

  constructor(
    private PreguntaService: PreguntaService,
  ) { }

  ngOnInit(): void {
    //Traer las areas de la base de datos
    this.PreguntaService.ObtenerAreasPreguntas().subscribe(
      (data: RespuestaServerObtenerAreasEvaluar) => {
        if (data.CODIGO == 200) {
          this.ListaAreasEvaluar = data.DATOS!;
        }
      }
    );

  }

  onTopicChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    console.log('Selected value:', selectedValue);
    // Aquí puedes obtener la información relevante para el tema seleccionado
    // y actualizar la lista de subtemas.
    // Por ejemplo, puedes hacer una solicitud HTTP para obtener los subtemas del tema seleccionado.
    this.PreguntaService.ObtenerSubtemas(selectedValue).subscribe(
      (data: RespuestaServerObtenerTemasAreasEvaluar) => {
        if (data.CODIGO == 200) {
          this.ListaSubtemas = data.DATOS!;
        }
      }
    );
  }




}
