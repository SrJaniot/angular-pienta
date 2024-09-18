import { datos_prueba } from "./datos_prueba.model";
import { porcentaje_asierto_areas_evaluadas } from "./porcentaje_asierto_areas_evaluadas.model";

export class RespuestaServerObtenerResultadosPruebaEstudiante{
  CODIGO?: number;
  MENSAJE?: string;
  DATOS?: {
    DATOS_PRUEBA:datos_prueba;
    TIEMPO_TOTAL_PRUEBA_MINUTOS_ESTUDIANTE: number;
    PREGUNTAS_ACERTADAS: number;
    PREGUNTAS_ERRADAS: number;
    PREGUNTAS_SIN_RESPONDER: number;
    PUNTAJE_OBTENIDO: number;
    NUMERO_DE_AREAS_EVALUADAS_EN_LA_PRUEBA: number;
    PORCENTAJE_ASIERTO_AREAS_EVALUADAS:porcentaje_asierto_areas_evaluadas[];
    PROMEDIO_TIEMPO_RESPUESTA_PREGUNTA: number;
    PROMEDIO_PRUEBA_ESTUDIANTE: number;
    PROMEDIO_PRUEBA_GRUPO: number;
    PROMEDIO_PRUEBA_CARRERA: number;
    PROMEDIO_PRUEBA_TOTAL: number;
  }
}

