import { Component, OnInit } from '@angular/core';

import { QuizService } from '../../../servicios/quiz.service';
import { Contexto } from '../../../Modelos/contexto.model';
import { Pregunta } from '../../../Modelos/pregunta.model';
import { Opcion } from '../../../Modelos/opcion.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  contextos: Contexto[] = [];
  preguntas: Pregunta[] = [];
  opciones: Opcion[] = [];
  showContextoModal = false;
  showOpcionModal = false;
  showPreguntaModal = false;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.contextos = this.quizService.getContextos();
    this.preguntas = this.quizService.getPreguntas();
    this.opciones = this.quizService.getOpciones();
  }

  agregarContexto() {
    this.showContextoModal = true;
  }

  agregarPregunta() {
    this.showPreguntaModal = true;
  }

  agregarOpcion() {
    this.showOpcionModal = true;
  }

  closeContextoForm() {
    this.showContextoModal = false;
  }

  closePreguntaForm() {
    this.showPreguntaModal = false;
  }

  closeOpcionForm() {
    this.showOpcionModal = false;
  }
}
