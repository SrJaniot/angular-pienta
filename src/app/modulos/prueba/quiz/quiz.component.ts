import { Component, OnInit } from '@angular/core';

import { QuizService } from '../../../servicios/quiz.service';
import { Contexto } from '../../../Modelos/contexto.model';
import { Pregunta } from '../../../Modelos/pregunta.model';
import { Opcion } from '../../../Modelos/opcion.model';
import { NgToastService } from 'ng-angular-popup';

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
  showContextEditModal = false;
  showContextEliminarModal = false;
  showContextListaModal = false;

  showOpcionModal = false;
  showPreguntaModal = false;
  tuIdDeContexto = ''; // El ID del contexto que quieres editar

  constructor(
    private quizService: QuizService,
    private toast: NgToastService,
  ) { }

  ngOnInit(): void {
    this.contextos = this.quizService.getContextos();
    this.preguntas = this.quizService.getPreguntas();
    this.opciones = this.quizService.getOpciones();
  }

  agregarContexto() {
    this.showContextoModal = true;
  }
  listarContextos() {
    this.showContextListaModal = true;
  }
  editarContexto(id_contexto: number) {
    let id_contexto_string = id_contexto.toString()
    if (id_contexto_string === '1' || id_contexto_string === '0' || id_contexto_string === '') {
      this.toast.warning({detail:"ADVERTENCIA",summary:'ACCESO DENEGADO',duration:5000, position: 'topCenter'});
      return;

    }
    this.tuIdDeContexto = id_contexto_string// El ID del contexto que quieres editar
    this.showContextEditModal = true;
  }
  eliminarContexto(id_contexto: number) {
    let id_contexto_string = id_contexto.toString()
    if (id_contexto_string === '1' || id_contexto_string === '0' || id_contexto_string === '') {
      this.toast.warning({detail:"ADVERTENCIA",summary:'ACCESO DENEGADO',duration:5000, position: 'topCenter'});
      return;

    }
    this.tuIdDeContexto = id_contexto_string// El ID del contexto que quieres editar
    this.showContextEliminarModal = true;
  }
  eliminarContextoLista(id_contexto: number) {
    let id_contexto_string = id_contexto.toString()
    if (id_contexto_string === '1' || id_contexto_string === '0' || id_contexto_string === '') {
      this.toast.warning({detail:"ADVERTENCIA",summary:'ACCESO DENEGADO',duration:5000, position: 'topCenter'});
      return;
    }
    this.quizService.eliminarContexto(id_contexto);
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
  closeContextListaForm() {
    this.showContextListaModal = false;
  }
  closeEditContextoForm() {
    this.showContextEditModal = false;
  }

  closeEliminarContextoForm() {
    this.showContextEliminarModal = false;
  }

  closePreguntaForm() {
    this.showPreguntaModal = false;
  }

  closeOpcionForm() {
    this.showOpcionModal = false;
  }
}
