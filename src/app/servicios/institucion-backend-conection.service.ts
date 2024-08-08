import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import {  Observable,forkJoin } from 'rxjs';
import { RespuestaServerObtenerInstitucion } from '../Modelos/RespuestaServerObtenerInstitucion.model';
import { RespuestaServerCrearSede } from '../Modelos/RespuestaServerCrearSede.model';
import { RespuestaServerObtenerSede } from '../Modelos/RespuestaServerObtenerSede.model';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
import { RespuestaServerObtenerSedes } from '../Modelos/RespuestaServerObtenerSedes.model';
import { RespuestaServerCrearAreaEstudio } from '../Modelos/RespuestaServerCrearAreaEstudio.model';
import { RespuestaServerObtenerAreasEstudios } from '../Modelos/RespuestaServerObtenerAreasEstudios.model';
import { RespuestaServerObtenerAreaEstudio } from '../Modelos/RespuestaServerObtenerAreaEstudio.model';
import { RespuestaServerCrearProgramaEstudio } from '../Modelos/RespuestaServerCrearProgramaEstudio.model';
import { RespuestaServerObtenerProgramasEstudios } from '../Modelos/RespuestaServerObtenerProgramasEstudios.model';
import { RespuestaServerObtenerProgramaEstudio } from '../Modelos/RespuestaServerObtenerProgramaEstudio.model';
import { RespuestaServerCrearGrupoEstudio } from '../Modelos/RespuestaServerCrearGrupoEstudio.model';
import { RespuestaServerObtenerGrupoEstudios } from '../Modelos/RespuestaServerObtenerGrupoEstudios.model';
import { RespuestaServerObtenerGrupoEstudio } from '../Modelos/RespuestaServerObtenerGrupoEstudio.model';
import { map, catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RespuestaServerObtenerEstudiantes } from '../Modelos/RespuestaServerObtenerEstudiantes.model';
import { RespuestaServerObtenerEstudiante } from '../Modelos/RespuestaServerObtenerEstudiante.model';

@Injectable({
  providedIn: 'root'
})
export class InstitucionBackendConectionService {

  private url_ms_negocio : string = ConfiguracionRutasBackend.url_backend_ms_negocio;
  private url_ms_seguridad : string = ConfiguracionRutasBackend.url_backend_ms_seguridad;


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


  //Funciones del modulo PROGRAMA DE ESTUDIO ---------------------------------------------------------------------------------------------------------------------

  CrearProgramaEstudio(nombre: string, descripcion: string, id_area_estudio: number, tipo_formacion: string): Observable<RespuestaServerCrearProgramaEstudio> {

    return this.http.post(`${this.url_ms_negocio}CrearProgramaEstudio`, {
      Nom_ProgramaEstudio: nombre,
      Descripcion_ProgramaEstudio: descripcion,
      Tipo_Formacion: tipo_formacion,
      id_area_estudio: id_area_estudio,
    });
  }

  ObtenerProgramasEstudios():Observable<RespuestaServerObtenerProgramasEstudios>{
    return this.http.get(this.url_ms_negocio + 'ObtenerProgramasEstudio');
  }

  ObtenerProgramaEstudioID(id: string):Observable<RespuestaServerObtenerProgramaEstudio>{
    return this.http.get(this.url_ms_negocio + 'ObtenerProgramaEstudio/'+id);
  }

  ActualizarProgramaEstudio(id: number,nombre: string, descripcion: string, tipo_formacion:string ,id_area_estudio: number): Observable<RespuestaServer> {
    return this.http.post(`${this.url_ms_negocio}ActualizarProgramaEstudio`, {
      id_porgrama_estudio: id,
      nombre_programa_estudio: nombre,
      descripcion_porgrama_estudio: descripcion,
      tipo_formacion_programa_estudio: tipo_formacion,
      id_area_estudio: id_area_estudio
    });
  }

  EliminarProgramaEstudio(id: number): Observable<RespuestaServer> {
    return this.http.post(`${this.url_ms_negocio}EliminarProgramaEstudio`, {
      id: id
    });
  }



  //Funciones del modulo GRUPO DE ESTUDIO ---------------------------------------------------------------------------------------------------------------------
  CrearGrupoEstudio(id_grupo_estudio: number,nombre: string, descripcion: string,  jornada: string,id_programa_estudio: number): Observable<RespuestaServerCrearGrupoEstudio> {
    return this.http.post(`${this.url_ms_negocio}CrearGrupoEstudio`, {
      id_grupo_estudio: id_grupo_estudio,
      Nom_GrupoEstudio: nombre,
      Descripcion_GrupoEstudio: descripcion,
      Jornada_GrupoEstudio: jornada,
      id_programa_estudio: id_programa_estudio
    });
  }

  ObtenerGruposEstudios():Observable<RespuestaServerObtenerGrupoEstudios>{
    return this.http.get(this.url_ms_negocio + 'ObtenerGruposEstudio');
  }

  ObtenerGrupoEstudioID(id: string):Observable<RespuestaServerObtenerGrupoEstudio>{
    return this.http.get(this.url_ms_negocio + 'ObtenerGrupoEstudio/'+id);
  }

  ActualizarGrupoEstudio(id: number,nombre: string, descripcion: string, jornada: string ,id_programa_estudio: number): Observable<RespuestaServer> {
    return this.http.post(`${this.url_ms_negocio}ActualizarGrupoEstudio`, {
      id_grupo_estudio: id,
      nombre_grupo_estudio: nombre,
      descripcion_grupo_estudio: descripcion,
      jornada_grupo_estudio: jornada,
      id_programa_estudio: id_programa_estudio
    });
  }

  EliminarGrupoEstudio(id: number): Observable<RespuestaServer> {
    return this.http.post(`${this.url_ms_negocio}EliminarGrupoEstudio`, {
      id: id
    });
  }


  //Funciones del modulo ESTUDIANTE ---------------------------------------------------------------------------------------------------------------------
  CrearEstudiante(id_grupo_estudio: number, nombre: string, direccion: string, telefono: string, correo: string, num_documento: string, tipo_documento: string, estudiante_activo: boolean): Observable<any> {
    const negocioRequest = this.http.post<RespuestaServerCrearGrupoEstudio>(`${this.url_ms_negocio}CrearEstudiante`, {
      id_grupo_estudio: id_grupo_estudio,
      Nom_Estudiante: nombre,
      Direccion_Estudiante: direccion,
      Telefono_estudiante: telefono,
      Correo_Estudiante: correo,
      id_estudiante: num_documento,
      Tipo_documento_Estudiante: tipo_documento,
    });

    return negocioRequest.pipe(
      switchMap(negocioResponse => {
        if (negocioResponse.CODIGO === 200) {
          const seguridadRequest = this.http.post<any>(`${this.url_ms_seguridad}funcion-inserta-usuario-rolEstudiante-CONACTIVACION`, {
            id_usuario: num_documento,
            nombre: nombre,
            correo: correo,
            celular: telefono,
            clave: num_documento,
            cuenta_activa: estudiante_activo,
          });

          return seguridadRequest.pipe(
            map(seguridadResponse => {
              if (seguridadResponse.CODIGO === 200) {
                return { success: true, negocioResponse, seguridadResponse };
              } else {
                const errorMessage = `Error en la solicitud de seguridad: ${seguridadResponse.MENSAJE || ''}`;
                console.error(errorMessage);
                return { success: false, error: errorMessage };
              }
            }),
            catchError(error => {
              console.error('Error en seguridadRequest:', error);
              return throwError({ success: false, error: error.message });
            })
          );
        } else {
          const errorMessage = `Error en la solicitud de negocio: ${negocioResponse.MENSAJE || ''}`;
          console.error(errorMessage);
          return throwError({ success: false, error: errorMessage });
        }
      }),
      catchError(error => {
        console.error('Error en negocioRequest:', error);
        return throwError({ success: false, error: error.message });
      })
    );
  }


  ObtenerEstudiantes():Observable<RespuestaServerObtenerEstudiantes>{
    return this.http.get(this.url_ms_negocio + 'ObtenerEstudiantes');
  }

  ObtenerEstudiante(id: string):Observable<RespuestaServerObtenerEstudiante>{
    return this.http.get(this.url_ms_negocio + 'ObtenerEstudiante/'+id);
  }


  ActualizarEstudiante(id_grupo_estudio: number, nombre: string, direccion: string, telefono: string, correo: string, num_documento: string, tipo_documento: string, estudiante_activo: boolean): Observable<any> {
    const negocioRequest = this.http.post<any>(`${this.url_ms_negocio}ActualizarEstudiante`, {
      num_documento: num_documento,
      nombre: nombre,
      direccion: direccion,
      telefono: telefono,
      correo: correo,
      id_grupo_estudio: id_grupo_estudio,
      tipo_documento: tipo_documento,
    });

    return negocioRequest.pipe(
      switchMap(negocioResponse => {
        if (negocioResponse.CODIGO === 200) {
          const seguridadRequest = this.http.post<any>(`${this.url_ms_seguridad}funcion-actualiza-usuario-rolEstudiante-CONACTIVACION`, {
            id_usuario: num_documento,
            nombre: nombre,
            correo: correo,
            celular: telefono,
            clave: num_documento,
            cuenta_activa: estudiante_activo,
          });

          return seguridadRequest.pipe(
            map(seguridadResponse => {
              if (seguridadResponse.CODIGO === 200) {
                return { success: true, negocioResponse, seguridadResponse };
              } else {
                const errorMessage = `Error en la solicitud de seguridad: ${seguridadResponse.MENSAJE || ''}`;
                console.error(errorMessage);
                return { success: false, error: errorMessage };
              }
            }),
            catchError(error => {
              console.error('Error en seguridadRequest:', error);
              return throwError({ success: false, error: error.message });
            })
          );
        } else {
          const errorMessage = `Error en la solicitud de negocio: ${negocioResponse.MENSAJE || ''}`;
          console.error(errorMessage);
          return throwError({ success: false, error: errorMessage });
        }
      }),
      catchError(error => {
        console.error('Error en negocioRequest:', error);
        return throwError({ success: false, error: error.message });
      })
    );
  }

}





