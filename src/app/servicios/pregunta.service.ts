import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaServerObtenerAreasEvaluar } from '../Modelos/RespuestaServer.ObtenerAreasEvaluar.model';
import { RespuestaServerObtenerTemasAreasEvaluar } from '../Modelos/RespuestaServer.ObtenerTemasAreasEvaluar.model';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
import { RespuestaServerObtenerContextos } from '../Modelos/RespuestaServerObtenerContextos.model';
import { RespuestaServerObtenerUNContexto } from '../Modelos/RespuestaServerObtenerUNContexto.model';
import { RespuestaServerCrearPregunta } from '../Modelos/RespuestaServer.CrearPregunta.model';
import { RespuestaServerObtenerPreguntas } from '../Modelos/RespuestaServerObtenerPreguntas.model';
import { RespuestaServerObtenerUNAPregunta } from '../Modelos/RespuestaServerObtenerUNAPregunta.model';

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
  CargarArchivoPregunta(formData: FormData): Observable<any> {
    return this.http.post(`${this.url_ms_negocio}cargar-archivo-pregunta`, formData);
  }
  CargarArchivoOpcion(formData: FormData): Observable<any> {
    return this.http.post(`${this.url_ms_negocio}cargar-archivo-opcion`, formData);
  }

  CrearContexto(nombre: string, descripcion: string, autor: string, nomArchivo: string, tipo_contexto:string): Observable<RespuestaServer> {
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}CrearContexto`, {
      Nom_contexto: nombre,
      Desc_contexto: descripcion,
      Nom_archivo_contexto: nomArchivo,
      Autor_contexto: autor,
      Tipo_contexto: tipo_contexto
    });
  }

  ObtenerContextos():Observable<RespuestaServerObtenerContextos>{
    return this.http.get(this.url_ms_negocio + 'ObtenerContextos');
  }
  ObtenerContextoID(id_contexto: string):Observable<RespuestaServerObtenerUNContexto>{
    return this.http.get(this.url_ms_negocio + 'ObtenerContexto/' + id_contexto);
  }

  ActualizarContexto(id_contexto: number, nombre: string, descripcion: string, autor: string, nombreArchivo: string,tipo_contexto:string): Observable<RespuestaServer> {
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}ActualizarContexto`, {
      id_contexto: id_contexto,
      Nom_contexto: nombre,
      Desc_contexto: descripcion,
      Nom_archivo_contexto: nombreArchivo,
      Autor_contexto: autor,
      Tipo_contexto: tipo_contexto
    });
  }

  EliminarContexto(id_contexto: number): Observable<RespuestaServer> {
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}EliminarContexto`, {
      id: id_contexto
    });
  }


  CrearPregunta(contextoId: number, enunciado: string, tipo: number, puntaje: number, autor: string,Imagen_pregunta:string,Tipo_pregunta_contenido:string,Layout_pregunta:string): Observable<RespuestaServerCrearPregunta> {
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}CrearPregunta`, {
      Id_Contexto: contextoId,
      Texto_Pregunta: enunciado,
      Tipo_pregunta: tipo,
      Puntaje_Pregunta: puntaje,
      Autor_Pregunta: autor,
      Imagen_pregunta: Imagen_pregunta,
      Tipo_pregunta_contenido: Tipo_pregunta_contenido,
      Layout_pregunta: Layout_pregunta
    });
  }

  RelacionarPreguntaConTemaArea(id_pregunta: number, id_tema_area: number): Observable<RespuestaServer> {
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}Relacionar-Pregunta-tema`, {
      id_pregunta: id_pregunta,
      id_tema_area: id_tema_area
    });
  }

  RelacionarPreguntaConTemaAreaUPDATE(id_pregunta: number, id_tema_area: number): Observable<RespuestaServer> {
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}Relacionar-Pregunta-tema-UPDATE`, {
      id_pregunta: id_pregunta,
      id_tema_area: id_tema_area
    });
  }




  ObtenerPreguntas():Observable<RespuestaServerObtenerPreguntas>{
    return this.http.get(this.url_ms_negocio + 'ObtenerPreguntas');
  }
  ObtenerPreguntaID(id_pregunta: string):Observable<RespuestaServerObtenerUNAPregunta>{
    return this.http.get(this.url_ms_negocio + 'ObtenerPregunta/' + id_pregunta);
  }


  ActualizarPregunta(id_pregunta:number,id_contexto:number,enunciado:string,tipo:number,puntaje:number,autor:string,imagen_pregunta:string,tipo_pregunta_contenido:string,layout_pregunta:string): Observable<RespuestaServer> {
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
    });
  }



  EliminarPregunta(id_Pregunta: number): Observable<RespuestaServer> {
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}EliminarPregunta`, {
      id: id_Pregunta
    });
  }



}
