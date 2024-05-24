// quiz.service.ts
import { Injectable } from '@angular/core';
import { Contexto } from '../Modelos/contexto.model';
import { Pregunta } from '../Modelos/pregunta.model';
import { Opcion } from '../Modelos/opcion.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private contextos: Contexto[] = [
    {
      id: 1, // reemplaza con los valores que necesites
      nombre: 'SIN CONTEXTO', // reemplaza con los valores que necesites
      descripcion: 'Preguntas sin contexto (obligatorio)', // reemplaza con los valores que necesites
      autor: 'Pienta', // reemplaza con los valores que necesites
      NombreArchivo: "" // reemplaza con los valores que necesites
    }
  ];
  private preguntas: Pregunta[] = [];
  private opciones: Opcion[] = [];

  getContextos(): Contexto[] {
    return this.contextos;
  }

  addContexto(contexto: Contexto, id: number) {
    contexto.id = id;
    this.contextos.push(contexto);
    console.log(this.contextos);
  }

  getPreguntasByContexto(contextoId: number): Pregunta[] {
    return this.preguntas.filter(p => p.contextoId === contextoId);
  }

  getPreguntas(): Pregunta[] {
    return this.preguntas;
  }

  addPregunta(pregunta: Pregunta) {
    this.preguntas.push(pregunta);
  }

  getOpcionesByPregunta(preguntaId: number): Opcion[] {
    return this.opciones.filter(o => o.preguntaId === preguntaId);
  }

  getOpciones(): Opcion[] {
    return this.opciones;
  }

  addOpcion(opcion: Opcion) {
    this.opciones.push(opcion);
  }
}
