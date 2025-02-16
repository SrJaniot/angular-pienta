import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Timestamp } from 'rxjs';
import { RespuestaServerCrearPruebaGenerica } from '../Modelos/RespuestaServerCrearPruebaGenerica.model';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
import { RespuestaServerObtenerPruebas } from '../Modelos/RespuestaServerObtenerPruebas.model';
import { RespuestaServerMatricularGrupo } from '../Modelos/RespuestaServerMatricularGrupo.model';
import { RespuestaServerObtenerPreviewPrueba } from '../Modelos/RespuestaServerObtenerPreviewPrueba.model';
import { RespuestaServerObtenerPreguntasPrueba } from '../Modelos/RespuestaServerObtenerPreguntasPrueba.model';
import { RespuestaServerObtenerPrueba } from '../Modelos/RespuestaServerObtenerPrueba.model';
import { RespuestaServerObtenerFechasInicioFinDuracionPrueba } from '../Modelos/RespuestaServerObtenerFechasInicioFinDuracionPrueba.model';
import { RespuestaServeEnviarRespuestasPruebar } from '../Modelos/RespuestaServeEnviarRespuestasPruebar.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  private url_ms_negocio : string = ConfiguracionRutasBackend.url_backend_ms_negocio;


  constructor(
    private http: HttpClient,
    private servicioseguridad:SeguridadService

  ) { }


  private getHeaders(): HttpHeaders {
    const token = this.servicioseguridad.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  //funcion para crear prueba generica
  CrearPruebaGenerica(nombre_prueba: string, descripcion_prueba: string, tipo_prueba: string, fecha_prueba_inicio: Date, fecha_prueba_fin: Date, tiempo_prueba: number, numero_preguntas_prueba: number, id_area_evaluar: number): Observable<RespuestaServerCrearPruebaGenerica> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServerCrearPruebaGenerica>(`${this.url_ms_negocio}CrearPruebaGenerica`, {
      nombre_prueba: nombre_prueba,
      descripcion_prueba: descripcion_prueba,
      tipo_prueba: tipo_prueba,
      fecha_prueba_inicio: fecha_prueba_inicio,
      fecha_prueba_fin: fecha_prueba_fin,
      tiempo_prueba: tiempo_prueba,
      numero_preguntas_prueba: numero_preguntas_prueba,
      id_area_evaluar: id_area_evaluar
    }, { headers });
  }

  CrearPruebaGenericaTYT(nombre_prueba: string, descripcion_prueba: string, tipo_prueba: string, fecha_prueba_inicio: Date, fecha_prueba_fin: Date, tiempo_prueba: number): Observable<RespuestaServerCrearPruebaGenerica> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServerCrearPruebaGenerica>(`${this.url_ms_negocio}CrearPruebaGenericaTYT`, {
      nombre_prueba: nombre_prueba,
      descripcion_prueba: descripcion_prueba,
      tipo_prueba: tipo_prueba,
      fecha_prueba_inicio: fecha_prueba_inicio,
      fecha_prueba_fin: fecha_prueba_fin,
      tiempo_prueba: tiempo_prueba
    }, { headers });
  }

  CrearPruebaCustom(nombre_prueba: string, descripcion_prueba: string, tipo_prueba: string, fecha_prueba_inicio: Date, fecha_prueba_fin: Date, tiempo_prueba: number, preguntas: string): Observable<RespuestaServerCrearPruebaGenerica> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServerCrearPruebaGenerica>(`${this.url_ms_negocio}CrearPruebaCustom`, {
      nombre_prueba: nombre_prueba,
      descripcion_prueba: descripcion_prueba,
      tipo_prueba: tipo_prueba,
      fecha_inicio_prueba: fecha_prueba_inicio,
      fecha_fin_prueba: fecha_prueba_fin,
      duracion_prueba: tiempo_prueba,
      preguntas_id: preguntas
    }, { headers });
  }

  VincularGrupoPrueba(id_prueba: number, id_grupo: number): Observable<RespuestaServerMatricularGrupo> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServerMatricularGrupo>(`${this.url_ms_negocio}MatricularGrupoPrueba`, {
      id_prueba: +id_prueba,
      id_grupo: +id_grupo
    }, { headers });
  }

  VincularEstudiantePrueba(id_prueba: number, id_estudiante: string): Observable<RespuestaServerMatricularGrupo> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServerMatricularGrupo>(`${this.url_ms_negocio}MatricularEstudiantePrueba`, {
      id_prueba: +id_prueba,
      id_estudiante: id_estudiante
    }, { headers });
  }

  ObtenerPruebas(): Observable<RespuestaServerObtenerPruebas> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerPruebas>(`${this.url_ms_negocio}ObtenerPruebas`, { headers });
  }

  TraerPruebaPreview(id_prueba: number): Observable<RespuestaServerObtenerPreviewPrueba> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServerObtenerPreviewPrueba>(`${this.url_ms_negocio}ObtenerPreviewPrueba`, {
      id: id_prueba
    }, { headers });
  }

  ObtenerPreguntasPrueba(id_prueba: number): Observable<RespuestaServerObtenerPreguntasPrueba> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServerObtenerPreguntasPrueba>(`${this.url_ms_negocio}ObtenerPreguntasPrueba`, {
      id: +id_prueba
    }, { headers });
  }

  ObtenerFechasInicioFinDuracionPrueba(id_prueba: string, id_estudiante: string): Observable<RespuestaServerObtenerFechasInicioFinDuracionPrueba> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerFechasInicioFinDuracionPrueba>(`${this.url_ms_negocio}ObtenerFechaInicioFinDuracionPrueba/${id_prueba}/${id_estudiante}`, { headers });
  }

  ObtenerPruebaDisponibleID(id_estudiante: string): Observable<RespuestaServerObtenerPruebas> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerPruebas>(`${this.url_ms_negocio}ObtenerPruebaDisponible/${id_estudiante}`, { headers });
  }

  ObtenerPruebaEnCursoID(id_estudiante: string): Observable<RespuestaServerObtenerPruebas> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerPruebas>(`${this.url_ms_negocio}ObtenerPruebaEnCurso/${id_estudiante}`, { headers });
  }

  ObtenerPruebasFinalizadasID(id_estudiante: string): Observable<RespuestaServerObtenerPruebas> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerPruebas>(`${this.url_ms_negocio}ObtenerPruebaFinalizadas/${id_estudiante}`, { headers });
  }

  ObtenerPruebasFinalizadas(): Observable<RespuestaServerObtenerPruebas> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerPruebas>(`${this.url_ms_negocio}ObtenerPruebasFinalizadas`, { headers });
  }

  ObtenerPruebaID(id_prueba: string): Observable<RespuestaServerObtenerPrueba> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerPrueba>(`${this.url_ms_negocio}ObtenerPrueba/${id_prueba}`, { headers });
  }

  IniciarPruebaEstudiante(id_prueba: number, id_estudiante: string, duracion_prueba: number): Observable<RespuestaServer> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServer>(`${this.url_ms_negocio}RegistrarFechaInicioPrueba`, {
      id_prueba: id_prueba,
      id_estudiante: id_estudiante,
      Duracion_minutos_Prueba: duracion_prueba
    }, { headers });
  }

  EnviarResultadosPrueba(id_prueba: number, id_estudiante: string, respuestas: string): Observable<RespuestaServeEnviarRespuestasPruebar> {
    const headers = this.getHeaders();
    return this.http.post<RespuestaServeEnviarRespuestasPruebar>(`${this.url_ms_negocio}RegistrarRespuestasPreguntasPruebaEstudiante`, {
      id_prueba: id_prueba,
      id_estudiante: id_estudiante,
      preguntas_opciones: respuestas
    }, { headers });
  }

}
