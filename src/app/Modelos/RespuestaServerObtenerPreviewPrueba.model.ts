import { Contextos } from './Contextos.model';
import { Preguntas } from './Preguntas.model';
import { Opciones } from './Opciones.model';

export class RespuestaServerObtenerPreviewPrueba {
  CODIGO?: number;
  MENSAJE?: string;
  DATOS?: {
    PRUEBA: {
      ID_PRUEBA: number;
      NOM_PRUEBA: string;
      DESCRIPCION_PRUEBA: string;
      TIPO_PRUEBA: string;
      FECHA_PRUEBA_INICIO: string;
      FECHA_PRUEBA_FIN: string;
      DURACION_PRUEBA_MINUTOS: number;
      NUMERO_PREGUNTAS: number;
    };
    CONTEXTOS: Contextos[];
    PREGUNTAS: Preguntas[];
    OPCIONES: Opciones[];
  };
}
