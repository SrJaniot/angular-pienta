import { Component, Input, OnInit } from '@angular/core';
import { PruebaService } from '../../../servicios/prueba.service';
import { ActivatedRoute } from '@angular/router';
import { Pregunta } from '../../../Modelos/pregunta.model';
import { idpreguntas } from '../../../Modelos/idpreguntas.model';
import { RespuestaServerObtenerPreguntasPrueba } from '../../../Modelos/RespuestaServerObtenerPreguntasPrueba.model';


@Component({
  selector: 'app-preview-prueba',
  templateUrl: './preview-prueba.component.html',
  styleUrls: ['./preview-prueba.component.css']
})
export class PreviewPruebaComponent implements OnInit {
  pruebaID = 0;
  Preguntas: idpreguntas[] = [];
  selectedPreguntaId: string = '';

  constructor(
    private PruebaService: PruebaService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.pruebaID = +params.get('id')!;
    });
    console.log(this.pruebaID);

    this.PruebaService.ObtenerPreguntasPrueba(this.pruebaID).subscribe(
      (data: RespuestaServerObtenerPreguntasPrueba) => {
        if (data.CODIGO == 200) {
          this.Preguntas = data.DATOS!;
          console.log(this.Preguntas);
        }
      }
    );
  }

  selectPregunta(id_pregunta: number): void {
    this.selectedPreguntaId = id_pregunta.toString();
    console.log(this.selectedPreguntaId);
  }
}
