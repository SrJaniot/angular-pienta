import { Opcion } from "./opcion.model";

// pregunta.model.ts
export interface Pregunta {
  id: number;
  contextoId: number;
  enunciado: string;
  tipo: number; // 1: opción múltiple única respuesta, 2: opción múltiple múltiple respuesta, etc.
  tipo_nombre: string;
  puntaje: number;
  autor: string;
  Area_Evaluar: number;
  Area_Evaluar_nombre: string;
  Tema_Evaluar: number;
  Tema_Evaluar_nombre: string;
  
  imagen_pregunta: string;
  tipo_pregunta_contenido: string;
  layout_pregunta: string;

}
