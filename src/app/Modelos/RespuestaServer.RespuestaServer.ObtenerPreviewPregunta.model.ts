
export class RespuestaServerObtenerPreviewPregunta{
  CODIGO?: number;
  MENSAJE?: string;
  DATOS?: {
    CONTEXTO:{
      ID_CONTEXTO: number;
      NOMBRE_CONTEXTO: string;
      DESCRIPCION_CONTEXTO: string;
      ARCHIVO_CONTEXTO: string;
      AUTOR_CONTEXTO: string;
      TIPO_CONTEXTO: string;
    };
    PREGUNTA:{
      ID_PREGUNTA: number;
      ID_CONTEXTO:  number;
      ENUNCIADO_PREGUNTA: string;
      TIPO_PREGUNTA: number;
      PUNTAJE_PREGUNTA:   number;
      AUTOR_PREGUNTA: string;
      ID_TEMA_AREA: number;
      NOMBRE_TEMA_AREA: string;
      ID_AREA_EVALUAR: number;
      NOMBRE_AREA_EVALUAR: string;
      IMAGEN_PREGUNTA: string;
      TIPO_PREGUNTA_CONTENIDO: string;
      LAYOUT_PREGUNTA: string;
    };
    OPCIONES:[
      {
        ID_OPCION: number;
        ID_PREGUNTA: number;
        DESCRIPCION_OPCION: string;
        ES_CORRECTA: boolean;
        IMAGEN_OPCION: string;
        TIPO_OPCION_CONTENIDO: string;
      }
    ];
  };
}



