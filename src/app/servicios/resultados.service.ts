import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
import { Observable, Timestamp } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RespuestaServerObtenerResultadosPruebaEstudiante } from '../Modelos/RespuestaServerObtenerResultadosPruebaEstudiante.model';





@Injectable({
  providedIn: 'root'
})
export class ResultadosService {
  private url_ms_negocio : string = ConfiguracionRutasBackend.url_backend_ms_negocio;


  constructor(
    private http: HttpClient,
  ) { }


  //FUNCION PARA OBTENER LOS RESULTADOS DE LA PRUEBA UN ESTUDIANTE
  ObtenerResultadosPruebaEstudiante(id_prueba: string,id_estudiante: string): Observable<RespuestaServerObtenerResultadosPruebaEstudiante> {
    return this.http.get(`${this.url_ms_negocio}ObtenerResultadosPruebaEstudiante/${id_prueba}/${id_estudiante}`);
  }




}
