import { datos_estudiante_destacado } from "./datos_estudiante_destacado.model";
import { datos_promedio_prueba_carrera } from "./datos_promedio_prueba_carrera.model";
import { datos_promedio_prueba_grupo } from "./datos_promedio_prueba_grupo.model";
import { datos_prueba_total } from "./datos_prueba_total.model";
import { porcentaje_asierto_areas_evaluadas } from "./porcentaje_asierto_areas_evaluadas.model";

export class RespuestaServerObtenerResultadosPrueba{
  CODIGO?: number;
  MENSAJE?: string;
  DATOS?: {
    DATOS_PRUEBA:datos_prueba_total;
    PROMEDIO_TOTAL: number;
    NUMERO_ESTUDIANTES: number;
    PROMEDIO_TIEMPO_IMPLEMENTADO_ESTUDIANTES: number;
    PROMEDIO_PRUEBA_CARRERA: datos_promedio_prueba_carrera[];
    PROMEDIO_PRUEBA_GRUPO: datos_promedio_prueba_grupo[];
    PORCENTAJE_ASIERTO_AREAS_EVALUADAS:porcentaje_asierto_areas_evaluadas[];
    ESTUDIANTE_DESTACADO: datos_estudiante_destacado;
    ESTUDIANTE_IRRELEVANTE: datos_estudiante_destacado;
  }
}
