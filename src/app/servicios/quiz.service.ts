// quiz.service.ts
import { Injectable } from '@angular/core';
import { Contexto } from '../Modelos/contexto.model';
import { Pregunta } from '../Modelos/pregunta.model';
import { Opcion } from '../Modelos/opcion.model';
import { NgToastService } from 'ng-angular-popup';

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

  addContexto2(contexto: Contexto): boolean {
    //preguntar si el contexto ya existe
    if (this.contextos.find(c => c.id === contexto.id)) {
      return false;
    }
    this.contextos.push(contexto);
    if (this.contextos.find(c => c.id === contexto.id)) {
      return true;
    }else{
      return false;
    }
  }
  updateContexto(contexto: Contexto, id: number) {
    let index = this.contextos.findIndex(c => c.id === id);
    contexto.id = id;
    this.contextos[index] = contexto;
  }
  
  eliminarContexto(id: number) {
    // Verifica si alguna pregunta está asociada con este contexto
    const tienePreguntasAsociadas = this.preguntas.some(p => p.contextoId === id);

    // Si no hay preguntas asociadas, elimina el contexto
    if (!tienePreguntasAsociadas) {
      let index = this.contextos.findIndex(c => c.id === id);
      if (index !== -1) { // Asegura que el contexto existe antes de intentar eliminarlo
        this.contextos.splice(index, 1);
      }
    } else {
      console.log(`El contexto con id ${id} tiene preguntas asociadas y no puede ser eliminado.`);
    }
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
