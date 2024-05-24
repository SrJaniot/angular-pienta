import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaServerObtenerAreasEvaluar } from '../Modelos/RespuestaServer.ObtenerAreasEvaluar.model';
import { RespuestaServerObtenerTemasAreasEvaluar } from '../Modelos/RespuestaServer.ObtenerTemasAreasEvaluar.model';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private url_ms_negocio : string = ConfiguracionRutasBackend.url_backend_ms_negocio;


  constructor(
    private http: HttpClient,

  ) { }


  /**
   * Funcion que se encarga de traer todos las areas de la base de datos
   *
   */
  ObtenerAreasPreguntas():Observable<RespuestaServerObtenerAreasEvaluar>{
    return this.http.get(this.url_ms_negocio + 'ObtenerAreas');
  }

  /**
   * Funcion que se encarga de traer todos los Temas de las areas de la base de datos
   *
   */
  ObtenerSubtemas(idArea: string):Observable<RespuestaServerObtenerTemasAreasEvaluar>{
    return this.http.get(this.url_ms_negocio + 'ObtenerTemas/' + idArea);
  }

  CargarArchivoContexto(formData: FormData): Observable<any> {
    return this.http.post(`${this.url_ms_negocio}cargar-archivo-contexto`, formData);
  }

  CrearContexto(nombre: string, descripcion: string, autor: string, nomArchivo: string): Observable<RespuestaServer> {
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}CrearContexto`, {
      Nom_contexto: nombre,
      Desc_contexto: descripcion,
      Nom_archivo_contexto: nomArchivo,
      Autor_contexto: autor
    });
  }
}
