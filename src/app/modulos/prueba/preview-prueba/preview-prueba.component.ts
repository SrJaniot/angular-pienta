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
  showRulesPanel = true;
  showPreguntasPanel = false;


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
    this.showRulesPanel = false;
    this.showPreguntasPanel = true;

  }
  toggleRulesPanel() {
    this.showRulesPanel = true;
    this.showPreguntasPanel = false;
    this.selectedPreguntaId = '';
  }
  isLastQuestion(): boolean {
    if (!this.Preguntas || this.Preguntas.length === 0) {
      return false;
    }
    const currentIndex = this.Preguntas.findIndex(p => p.ID_PREGUNTA === +this.selectedPreguntaId);
    return currentIndex === this.Preguntas.length - 1;
  }


  goToNextQuestion(): void {
    const currentIndex = this.Preguntas.findIndex(p => p.ID_PREGUNTA === +this.selectedPreguntaId);
    if (currentIndex < this.Preguntas.length - 1) {
      this.selectPregunta(this.Preguntas[currentIndex + 1].ID_PREGUNTA);
    }
  }

  goToPreviousQuestion(): void {
    const currentIndex = this.Preguntas.findIndex(p => p.ID_PREGUNTA === +this.selectedPreguntaId);
    if (currentIndex > 0) {
      this.selectPregunta(this.Preguntas[currentIndex - 1].ID_PREGUNTA);
    } else {
      this.toggleRulesPanel();
    }
  }



  enviarResultados() {
    console.log('Enviando resultados...');
  }

}
