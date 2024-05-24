import { Opcion } from "./opcion.model";

// pregunta.model.ts
export interface Pregunta {
  id: number;
  contextoId: number;
  enunciado: string;
  tipo: number; // 1: opción múltiple única respuesta, 2: opción múltiple múltiple respuesta, etc.
  puntaje: number;
  autor: string;
  opciones: Opcion[];
}
