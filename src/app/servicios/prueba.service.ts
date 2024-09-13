import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { Observable, Timestamp } from 'rxjs';
import { RespuestaServerCrearPruebaGenerica } from '../Modelos/RespuestaServerCrearPruebaGenerica.model';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
import { RespuestaServerObtenerPruebas } from '../Modelos/RespuestaServerObtenerPruebas.model';
import { RespuestaServerMatricularGrupo } from '../Modelos/RespuestaServerMatricularGrupo.model';
import { RespuestaServerObtenerPreviewPrueba } from '../Modelos/RespuestaServerObtenerPreviewPrueba.model';
import { RespuestaServerObtenerPreguntasPrueba } from '../Modelos/RespuestaServerObtenerPreguntasPrueba.model';
import { RespuestaServerObtenerPrueba } from '../Modelos/RespuestaServerObtenerPrueba.model';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  private url_ms_negocio : string = ConfiguracionRutasBackend.url_backend_ms_negocio;


  constructor(
    private http: HttpClient,

  ) { }

  //funcion para crear prueba generica
  CrearPruebaGenerica(nombre_prueba: string, descripcion_prueba: string, tipo_prueba: string, fecha_prueba_inicio: Date, fecha_prueba_fin: Date,tiempo_prueba:number,numero_preguntas_prueba: number,id_area_evaluar:number): Observable<RespuestaServerCrearPruebaGenerica> {
    return this.http.post(`${this.url_ms_negocio}CrearPruebaGenerica`, {
      nombre_prueba: nombre_prueba,
      descripcion_prueba: descripcion_prueba,
      tipo_prueba: tipo_prueba,
      fecha_prueba_inicio: fecha_prueba_inicio,
      fecha_prueba_fin: fecha_prueba_fin,
      tiempo_prueba: tiempo_prueba,
      numero_preguntas_prueba: numero_preguntas_prueba,
      id_area_evaluar: id_area_evaluar
    });
  }
  CrearPruebaGenericaTYT(nombre_prueba: string, descripcion_prueba: string, tipo_prueba: string, fecha_prueba_inicio: Date, fecha_prueba_fin: Date,tiempo_prueba:number): Observable<RespuestaServerCrearPruebaGenerica> {
    console.log(nombre_prueba);
    console.log(descripcion_prueba);
    console.log(tipo_prueba);
    console.log(fecha_prueba_inicio);
    console.log(fecha_prueba_fin);
    console.log(tiempo_prueba);


    return this.http.post(`${this.url_ms_negocio}CrearPruebaGenericaTYT`, {
      nombre_prueba: nombre_prueba,
      descripcion_prueba: descripcion_prueba,
      tipo_prueba: tipo_prueba,
      fecha_prueba_inicio: fecha_prueba_inicio,
      fecha_prueba_fin: fecha_prueba_fin,
      tiempo_prueba: tiempo_prueba
    });
  }

  CrearPruebaCustom(nombre_prueba: string, descripcion_prueba: string, tipo_prueba: string, fecha_prueba_inicio: Date, fecha_prueba_fin: Date,tiempo_prueba:number,preguntas:string): Observable<RespuestaServerCrearPruebaGenerica> {
    return this.http.post(`${this.url_ms_negocio}CrearPruebaCustom`, {
      nombre_prueba: nombre_prueba,
      descripcion_prueba: descripcion_prueba,
      tipo_prueba: tipo_prueba,
      fecha_inicio_prueba: fecha_prueba_inicio,
      fecha_fin_prueba: fecha_prueba_fin,
      duracion_prueba: tiempo_prueba,
      preguntas_id: preguntas
    });
  }

  VincularGrupoPrueba(id_prueba: number, id_grupo: number): Observable<RespuestaServerMatricularGrupo> {
    console.log(id_prueba);
    console.log(id_grupo);
    return this.http.post(`${this.url_ms_negocio}MatricularGrupoPrueba`, {
      id_prueba: +id_prueba,
      id_grupo: +id_grupo
    });
  }

  VincularEstudiantePrueba(id_prueba: number, id_estudiante: string): Observable<RespuestaServerMatricularGrupo> {
    console.log(id_prueba);
    console.log(id_estudiante);
    return this.http.post(`${this.url_ms_negocio}MatricularEstudiantePrueba`, {
      id_prueba: +id_prueba,
      id_estudiante: id_estudiante
    });
  }

  ObtenerPruebas(): Observable<RespuestaServerObtenerPruebas> {
    return this.http.get(`${this.url_ms_negocio}ObtenerPruebas`);
  }

  TraerPruebaPreview(id_prueba: number): Observable<RespuestaServerObtenerPreviewPrueba> {
    console.log(id_prueba);
    return this.http.post(`${this.url_ms_negocio}ObtenerPreviewPrueba`, {
      id: id_prueba
    });
  }

  ObtenerPreguntasPrueba(id_prueba: number): Observable<RespuestaServerObtenerPreguntasPrueba> {
    return this.http.post(`${this.url_ms_negocio}ObtenerPreguntasPrueba`, {
      id: +id_prueba
    });
  }

  ObtenerPruebaDisponibleID(id_estudiante: string): Observable<RespuestaServerObtenerPruebas> {
    return this.http.get(`${this.url_ms_negocio}ObtenerPruebaDisponible/${id_estudiante}`);
  }
  ObtenerPruebaEnCursoID(id_estudiante: string): Observable<RespuestaServerObtenerPruebas> {
    return this.http.get(`${this.url_ms_negocio}ObtenerPruebaEnCurso/${id_estudiante}`);
  }




  ObtenerPruebaID(id_prueba: string): Observable<RespuestaServerObtenerPrueba> {
    return this.http.get(`${this.url_ms_negocio}ObtenerPrueba/${id_prueba}`);
  }

  IniciarPruebaEstudiante(id_prueba: number,id_estudiante:string,duracion_prueba:number): Observable<RespuestaServer> {
    return this.http.post(`${this.url_ms_negocio}RegistrarFechaInicioPrueba`, {
      id_prueba: id_prueba,
      id_estudiante: id_estudiante,
      Duracion_minutos_Prueba: duracion_prueba
    });
  }

}
