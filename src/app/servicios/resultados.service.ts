import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
import { Observable, Timestamp } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaServerObtenerResultadosPruebaEstudiante } from '../Modelos/RespuestaServerObtenerResultadosPruebaEstudiante.model';
import { RespuestaServerObtenerResultadosPrueba } from '../Modelos/RespuestaServerObtenerResultadosPrueba.model';
import { SeguridadService } from './seguridad.service';





@Injectable({
  providedIn: 'root'
})
export class ResultadosService {
  private url_ms_negocio : string = ConfiguracionRutasBackend.url_backend_ms_negocio;


  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService
  ) { }



  private getHeaders(): HttpHeaders {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  //FUNCION PARA OBTENER LOS RESULTADOS DE LA PRUEBA UN ESTUDIANTE
  ObtenerResultadosPruebaEstudiante(id_prueba: string, id_estudiante: string): Observable<RespuestaServerObtenerResultadosPruebaEstudiante> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerResultadosPruebaEstudiante>(`${this.url_ms_negocio}ObtenerResultadosPruebaEstudiante/${id_prueba}/${id_estudiante}`, { headers });
  }

  //FUNCION PARA OBTENER LOS RESULTADOS DE LA PRUEBA
  ObtenerResultadosPrueba(id_prueba: string): Observable<RespuestaServerObtenerResultadosPrueba> {
    const headers = this.getHeaders();
    return this.http.get<RespuestaServerObtenerResultadosPrueba>(`${this.url_ms_negocio}ObtenerResultadosPrueba/${id_prueba}`, { headers });
  }





}
