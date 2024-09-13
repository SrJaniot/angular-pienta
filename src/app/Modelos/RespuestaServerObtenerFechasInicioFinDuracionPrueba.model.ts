
export class RespuestaServerObtenerFechasInicioFinDuracionPrueba{
  CODIGO?: number;
  MENSAJE?: string;
  DATOS?: {
    ID_PRUEBA: number;
    ID_ESTUDIANTE: string;
    FECHA_INICIO_PRUEBA_ESTUDIANTE: Date;
    FECHA_FIN_PRUEBA_ESTUDIANTE: Date;
    DURACION_PRUEBA_MINUTOS: number;
  }
}

