import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaServerObtenerInstitucion } from '../Modelos/RespuestaServerObtenerInstitucion.model';
import { RespuestaServerCrearSede } from '../Modelos/RespuestaServerCrearSede.model';
import { RespuestaServerObtenerSede } from '../Modelos/RespuestaServerObtenerSede.model';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
import { RespuestaServerObtenerSedes } from '../Modelos/RespuestaServerObtenerSedes.model';
import { RespuestaServerCrearAreaEstudio } from '../Modelos/RespuestaServerCrearAreaEstudio.model';
import { RespuestaServerObtenerAreasEstudios } from '../Modelos/RespuestaServerObtenerAreasEstudios.model';
import { RespuestaServerObtenerAreaEstudio } from '../Modelos/RespuestaServerObtenerAreaEstudio.model';

@Injectable({
  providedIn: 'root'
})
export class InstitucionBackendConectionService {

  private url_ms_negocio : string = ConfiguracionRutasBackend.url_backend_ms_negocio;


  constructor(
    private http: HttpClient,

  ) { }
  //funciones del modulo SEDE ---------------------------------------------------------------------------------------------------------------------------------

  ObtenerInstitucion():Observable<RespuestaServerObtenerInstitucion>{
    return this.http.get(this.url_ms_negocio + 'ObtenerInstituciones');
  }

  CrearSede(nombre: string, direccion: string, telefono: string, correo: string, id_institucion: number): Observable<RespuestaServerCrearSede> {
    return this.http.post(`${this.url_ms_negocio}CrearSede`, {
      Nom_sede: nombre,
      Direccion_Sede: direccion,
      Telefono_Sede: telefono,
      Correo_Sede: correo,
      id_institucion: id_institucion
    });
  }
  ObtenerSedeID(id: string):Observable<RespuestaServerObtenerSede>{
    return this.http.get(this.url_ms_negocio + 'ObtenerSede/'+id);
  }
  ActualizarSede(id: number,nombre: string, direccion: string, telefono: string, correo: string, id_institucion: number): Observable<RespuestaServer> {
    return this.http.post(`${this.url_ms_negocio}ActualizarSede`, {
      id_sede: id,
      nom_sede: nombre,
      dir_sede: direccion,
      tel_sede: telefono,
      email_sede: correo,
      id_institucion: id_institucion
    });
  }
  EliminarSede(id: number): Observable<RespuestaServer> {
    return this.http.post(`${this.url_ms_negocio}EliminarSede`, {
      id: id
    });
  }

  ObtenerSedes():Observable<RespuestaServerObtenerSedes>{
    return this.http.get(this.url_ms_negocio + 'ObtenerSedes');
  }


  //funciones del modulo AREA DE ESTUDIO -------------------------------------------------------------------------------------------------------------------------

  CrearAreaEstudio(nombre: string, descripcion: string, id_sede: number): Observable<RespuestaServerCrearAreaEstudio> {

    return this.http.post(`${this.url_ms_negocio}CrearAreaEstudio`, {
      Nom_AreaEstudio: nombre,
      Desc_AreaEstudio: descripcion,
      id_sede: +id_sede
    });
  }

  ObtenerAreasEstudios():Observable<RespuestaServerObtenerAreasEstudios>{
    return this.http.get(this.url_ms_negocio + 'ObtenerAreasEstudio');
  }

  ObtenerAreaEstudioID(id: string):Observable<RespuestaServerObtenerAreaEstudio>{
    return this.http.get(this.url_ms_negocio + 'ObtenerAreaEstudio/'+id);
  }

  ActualizarAreaEstudio(id: number,nombre: string, descripcion: string, id_sede: number): Observable<RespuestaServer> {
    return this.http.post(`${this.url_ms_negocio}ActualizarAreaEstudio`, {
      id_area_estudio: id,
      nom_area_estudio: nombre,
      descripcion_area_estudio: descripcion,
      id_sede: id_sede
    });
  }

  EliminarAreaEstudio(id: number): Observable<RespuestaServer> {
    return this.http.post(`${this.url_ms_negocio}EliminarAreaEstudio`, {
      id: id
    });
  }




}
