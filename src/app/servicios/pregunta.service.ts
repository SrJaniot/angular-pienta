import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaServerObtenerAreasEvaluar } from '../Modelos/RespuestaServer.ObtenerAreasEvaluar.model';
import { RespuestaServerObtenerTemasAreasEvaluar } from '../Modelos/RespuestaServer.ObtenerTemasAreasEvaluar.model';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
import { RespuestaServerObtenerContextos } from '../Modelos/RespuestaServerObtenerContextos.model';
import { RespuestaServerObtenerUNContexto } from '../Modelos/RespuestaServerObtenerUNContexto.model';
import { RespuestaServerCrearPregunta } from '../Modelos/RespuestaServer.CrearPregunta.model';
import { RespuestaServerObtenerPreguntas } from '../Modelos/RespuestaServerObtenerPreguntas.model';
import { RespuestaServerObtenerUNAPregunta } from '../Modelos/RespuestaServerObtenerUNAPregunta.model';
import { RespuestaServerCrearOpcion } from '../Modelos/RespuestaServerCrearOpcion.model';
import { RespuestaServerObtenerOpciones } from '../Modelos/RespuestaServerObtenerOpciones.model';
import { RespuestaServerObtenerUNAOpcion } from '../Modelos/RespuestaServerObtenerUNAOpcion.model';
import { RespuestaServerObtenerPreviewPregunta } from '../Modelos/RespuestaServer.RespuestaServer.ObtenerPreviewPregunta.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private url_ms_negocio : string = ConfiguracionRutasBackend.url_backend_ms_negocio;


  constructor(
    private http: HttpClient,
    private servicioseguridad: SeguridadService

  ) { }


  /**
   * Funcion que se encarga de traer todos las areas de la base de datos
   *
   */
  ObtenerAreasPreguntas():Observable<RespuestaServerObtenerAreasEvaluar>{
    const token= this.servicioseguridad.ObtenerDatosLocalStorage_TOKEN();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url_ms_negocio + 'ObtenerAreas', {headers: headers});
  }

  /**
   * Funcion que se encarga de traer todos los Temas de las areas de la base de datos
   *
   */

  private getHeaders(): HttpHeaders {
    const token = this.servicioseguridad.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  ObtenerSubtemas(idArea: string): Observable<RespuestaServerObtenerTemasAreasEvaluar> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerTemasAreasEvaluar>(this.url_ms_negocio + 'ObtenerTemas/' + idArea, { headers });
  }

  CargarArchivoContexto(formData: FormData): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.url_ms_negocio}cargar-archivo-contexto`, formData, { headers });
  }

  CargarArchivoPregunta(formData: FormData): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.url_ms_negocio}cargar-archivo-pregunta`, formData, { headers });
  }

  CargarArchivoOpcion(formData: FormData): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.url_ms_negocio}cargar-archivo-opcion`, formData, { headers });
  }

  CrearContexto(nombre: string, descripcion: string, autor: string, nomArchivo: string, tipo_contexto: string): Observable<RespuestaServer> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}CrearContexto`, {
      Nom_contexto: nombre,
      Desc_contexto: descripcion,
      Nom_archivo_contexto: nomArchivo,
      Autor_contexto: autor,
      Tipo_contexto: tipo_contexto
    }, { headers });
  }

  ObtenerContextos(): Observable<RespuestaServerObtenerContextos> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerContextos>(this.url_ms_negocio + 'ObtenerContextos', { headers });
  }

  ObtenerContextoID(id_contexto: string): Observable<RespuestaServerObtenerUNContexto> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerUNContexto>(this.url_ms_negocio + 'ObtenerContexto/' + id_contexto, { headers });
  }

  ActualizarContexto(id_contexto: number, nombre: string, descripcion: string, autor: string, nombreArchivo: string, tipo_contexto: string): Observable<RespuestaServer> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}ActualizarContexto`, {
      id_contexto: id_contexto,
      Nom_contexto: nombre,
      Desc_contexto: descripcion,
      Nom_archivo_contexto: nombreArchivo,
      Autor_contexto: autor,
      Tipo_contexto: tipo_contexto
    }, { headers });
  }

  EliminarContexto(id_contexto: number): Observable<RespuestaServer> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}EliminarContexto`, {
      id: id_contexto
    }, { headers });
  }

  CrearPregunta(contextoId: number, enunciado: string, tipo: number, puntaje: number, autor: string, Imagen_pregunta: string, Tipo_pregunta_contenido: string, Layout_pregunta: string): Observable<RespuestaServerCrearPregunta> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServerCrearPregunta>(`${this.url_ms_negocio}CrearPregunta`, {
      Id_Contexto: contextoId,
      Texto_Pregunta: enunciado,
      Tipo_pregunta: tipo,
      Puntaje_Pregunta: puntaje,
      Autor_Pregunta: autor,
      Imagen_pregunta: Imagen_pregunta,
      Tipo_pregunta_contenido: Tipo_pregunta_contenido,
      Layout_pregunta: Layout_pregunta
    }, { headers });
  }

  RelacionarPreguntaConTemaArea(id_pregunta: number, id_tema_area: number): Observable<RespuestaServer> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}Relacionar-Pregunta-tema`, {
      id_pregunta: id_pregunta,
      id_tema_area: id_tema_area
    }, { headers });
  }

  RelacionarPreguntaConTemaAreaUPDATE(id_pregunta: number, id_tema_area: number): Observable<RespuestaServer> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}Relacionar-Pregunta-tema-UPDATE`, {
      id_pregunta: id_pregunta,
      id_tema_area: id_tema_area
    }, { headers });
  }

  ObtenerPreguntas(): Observable<RespuestaServerObtenerPreguntas> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerPreguntas>(this.url_ms_negocio + 'ObtenerPreguntas', { headers });
  }

  ObtenerPreguntaID(id_pregunta: string): Observable<RespuestaServerObtenerUNAPregunta> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerUNAPregunta>(this.url_ms_negocio + 'ObtenerPregunta/' + id_pregunta, { headers });
  }

  ActualizarPregunta(id_pregunta: number, id_contexto: number, enunciado: string, tipo: number, puntaje: number, autor: string, imagen_pregunta: string, tipo_pregunta_contenido: string, layout_pregunta: string): Observable<RespuestaServer> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}ActualizarPregunta`, {
      id_pregunta: id_pregunta,
      id_contexto: id_contexto,
      enunciado_pregunta: enunciado,
      tipo_pregunta: tipo,
      puntaje_pregunta: puntaje,
      autor_pregunta: autor,
      Imagen_pregunta: imagen_pregunta,
      Tipo_pregunta_contenido: tipo_pregunta_contenido,
      Layout_pregunta: layout_pregunta
    }, { headers });
  }

  EliminarPregunta(id_Pregunta: number): Observable<RespuestaServer> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}EliminarPregunta`, {
      id: id_Pregunta
    }, { headers });
  }

  CrearOpcion(pregunta_id: number, enunciado: string, Valor_opcion: boolean, Imagen_opcion: string, Tipo_opcion: string): Observable<RespuestaServerCrearOpcion> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServerCrearOpcion>(`${this.url_ms_negocio}CrearOpcion`, {
      Id_Pregunta: pregunta_id,
      Texto_opcion: enunciado,
      Opcion_Correcta: Valor_opcion,
      Imagen_opcion: Imagen_opcion,
      Tipo_opcion: Tipo_opcion
    }, { headers });
  }

  ObtenerOpciones(): Observable<RespuestaServerObtenerOpciones> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerOpciones>(this.url_ms_negocio + 'ObtenerOpciones', { headers });
  }

  ObtenerOpcionID(id_opcion: string): Observable<RespuestaServerObtenerUNAOpcion> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerUNAOpcion>(this.url_ms_negocio + 'ObtenerOpcion/' + id_opcion, { headers });
  }

  ActualizarOpcion(id_opcion: number, id_pregunta: number, enunciado: string, Opcion_Correcta: boolean, imagen_opcion: string, Tipo_opcion: string): Observable<RespuestaServer> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}ActualizarOpcion`, {
      id_opcion: id_opcion,
      id_pregunta: id_pregunta,
      Texto_opcion: enunciado,
      Opcion_Correcta: Opcion_Correcta,
      Imagen_opcion: imagen_opcion,
      Tipo_opcion: Tipo_opcion
    }, { headers });
  }

  EliminarOpcion(id_opcion: number): Observable<RespuestaServer> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}EliminarOpcion`, {
      id: id_opcion
    }, { headers });
  }

  TraerPreguntaPreview(id_pregunta: string): Observable<RespuestaServerObtenerPreviewPregunta> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerPreviewPregunta>(this.url_ms_negocio + 'ObtenerPreviewPregunta/' + id_pregunta, { headers });
  }


}
