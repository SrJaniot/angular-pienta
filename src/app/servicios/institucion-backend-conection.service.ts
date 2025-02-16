import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { RespuestaServerObtenerTutores } from '../Modelos/RespuestaServerObtenerTutores.model';
import { RespuestaServerObtenerTutor } from '../Modelos/RespuestaServerObtenerTutor.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class InstitucionBackendConectionService {

  private url_ms_negocio : string = ConfiguracionRutasBackend.url_backend_ms_negocio;
  private url_ms_seguridad : string = ConfiguracionRutasBackend.url_backend_ms_seguridad;


  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService,

  ) { }
  //funciones del modulo SEDE ---------------------------------------------------------------------------------------------------------------------------------

  ObtenerInstitucion(): Observable<RespuestaServerObtenerInstitucion> {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<RespuestaServerObtenerInstitucion>(this.url_ms_negocio + 'ObtenerInstituciones', { headers });
  }

  CrearSede(nombre: string, direccion: string, telefono: string, correo: string, id_institucion: number): Observable<RespuestaServerCrearSede> {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.url_ms_negocio}CrearSede`, {
      Nom_sede: nombre,
      Direccion_Sede: direccion,
      Telefono_Sede: telefono,
      Correo_Sede: correo,
      id_institucion: id_institucion
    }, { headers });  // Reemplaza con tu token de autenticación
  }


  ObtenerSedeID(id: string):Observable<RespuestaServerObtenerSede>{
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url_ms_negocio + 'ObtenerSede/'+id, { headers });
  }
  ActualizarSede(id: number,nombre: string, direccion: string, telefono: string, correo: string, id_institucion: number): Observable<RespuestaServer> {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.url_ms_negocio}ActualizarSede`, {
      id_sede: id,
      nom_sede: nombre,
      dir_sede: direccion,
      tel_sede: telefono,
      email_sede: correo,
      id_institucion: id_institucion
    }, { headers });
  }
  EliminarSede(id: number): Observable<RespuestaServer> {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.url_ms_negocio}EliminarSede`, {
      id: id
    }, { headers });
  }

  ObtenerSedes():Observable<RespuestaServerObtenerSedes>{
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url_ms_negocio + 'ObtenerSedes', { headers });
  }


  //funciones del modulo AREA DE ESTUDIO -------------------------------------------------------------------------------------------------------------------------

  CrearAreaEstudio(nombre: string, descripcion: string, id_sede: number): Observable<RespuestaServerCrearAreaEstudio> {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.url_ms_negocio}CrearAreaEstudio`, {
      Nom_AreaEstudio: nombre,
      Desc_AreaEstudio: descripcion,
      id_sede: +id_sede
    }, { headers });
  }

  ObtenerAreasEstudios():Observable<RespuestaServerObtenerAreasEstudios>{
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url_ms_negocio + 'ObtenerAreasEstudio',{ headers });
  }

  ObtenerAreaEstudioID(id: string):Observable<RespuestaServerObtenerAreaEstudio>{
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url_ms_negocio + 'ObtenerAreaEstudio/'+id,{ headers });
  }

  ActualizarAreaEstudio(id: number,nombre: string, descripcion: string, id_sede: number): Observable<RespuestaServer> {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.url_ms_negocio}ActualizarAreaEstudio`, {
      id_area_estudio: id,
      nom_area_estudio: nombre,
      descripcion_area_estudio: descripcion,
      id_sede: id_sede
    }, { headers });
  }

  EliminarAreaEstudio(id: number): Observable<RespuestaServer> {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.url_ms_negocio}EliminarAreaEstudio`, {
      id: id
    }, { headers });
  }


  //Funciones del modulo PROGRAMA DE ESTUDIO ---------------------------------------------------------------------------------------------------------------------

  CrearProgramaEstudio(nombre: string, descripcion: string, id_area_estudio: number, tipo_formacion: string): Observable<RespuestaServerCrearProgramaEstudio> {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.url_ms_negocio}CrearProgramaEstudio`, {
      Nom_ProgramaEstudio: nombre,
      Descripcion_ProgramaEstudio: descripcion,
      Tipo_Formacion: tipo_formacion,
      id_area_estudio: id_area_estudio,
    }, { headers });
  }

  ObtenerProgramasEstudios():Observable<RespuestaServerObtenerProgramasEstudios>{
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url_ms_negocio + 'ObtenerProgramasEstudio',{ headers });

  }

  ObtenerProgramaEstudioID(id: string):Observable<RespuestaServerObtenerProgramaEstudio>{
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url_ms_negocio + 'ObtenerProgramaEstudio/'+id,{ headers });
  }

  ActualizarProgramaEstudio(id: number,nombre: string, descripcion: string, tipo_formacion:string ,id_area_estudio: number): Observable<RespuestaServer> {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.url_ms_negocio}ActualizarProgramaEstudio`, {
      id_porgrama_estudio: id,
      nombre_programa_estudio: nombre,
      descripcion_porgrama_estudio: descripcion,
      tipo_formacion_programa_estudio: tipo_formacion,
      id_area_estudio: id_area_estudio
    }, { headers });
  }

  EliminarProgramaEstudio(id: number): Observable<RespuestaServer> {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.url_ms_negocio}EliminarProgramaEstudio`, {
      id: id
    }, { headers });
  }



  //Funciones del modulo GRUPO DE ESTUDIO ---------------------------------------------------------------------------------------------------------------------
  CrearGrupoEstudio(id_grupo_estudio: number,nombre: string, descripcion: string,  jornada: string,id_programa_estudio: number): Observable<RespuestaServerCrearGrupoEstudio> {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.url_ms_negocio}CrearGrupoEstudio`, {
      id_grupo_estudio: id_grupo_estudio,
      Nom_GrupoEstudio: nombre,
      Descripcion_GrupoEstudio: descripcion,
      Jornada_GrupoEstudio: jornada,
      id_programa_estudio: id_programa_estudio
    }, { headers });  // Reemplaza con tu token de autenticación
  }

  ObtenerGruposEstudios():Observable<RespuestaServerObtenerGrupoEstudios>{
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url_ms_negocio + 'ObtenerGruposEstudio',{ headers });
  }

  ObtenerGrupoEstudioID(id: string):Observable<RespuestaServerObtenerGrupoEstudio>{
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url_ms_negocio + 'ObtenerGrupoEstudio/'+id,{ headers });
  }

  ActualizarGrupoEstudio(id: number,nombre: string, descripcion: string, jornada: string ,id_programa_estudio: number): Observable<RespuestaServer> {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.url_ms_negocio}ActualizarGrupoEstudio`, {
      id_grupo_estudio: id,
      nombre_grupo_estudio: nombre,
      descripcion_grupo_estudio: descripcion,
      jornada_grupo_estudio: jornada,
      id_programa_estudio: id_programa_estudio
    },  { headers });
  }

  EliminarGrupoEstudio(id: number): Observable<RespuestaServer> {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.url_ms_negocio}EliminarGrupoEstudio`, {
      id: id
    }, { headers });
  }


  //Funciones del modulo ESTUDIANTE ---------------------------------------------------------------------------------------------------------------------
  CrearEstudiante(id_grupo_estudio: number, nombre: string, direccion: string, telefono: string, correo: string, num_documento: string, tipo_documento: string, estudiante_activo: boolean): Observable<any> {
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const negocioRequest = this.http.post<RespuestaServerCrearGrupoEstudio>(`${this.url_ms_negocio}CrearEstudiante`, {
      id_grupo_estudio: id_grupo_estudio,
      Nom_Estudiante: nombre,
      Direccion_Estudiante: direccion,
      Telefono_estudiante: telefono,
      Correo_Estudiante: correo,
      id_estudiante: num_documento,
      Tipo_documento_Estudiante: tipo_documento,
    }, { headers });

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
          }, { headers });

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
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url_ms_negocio + 'ObtenerEstudiantes',{ headers });
  }

  ObtenerEstudiante(id: string):Observable<RespuestaServerObtenerEstudiante>{
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url_ms_negocio + 'ObtenerEstudiante/'+id,{ headers });
  }


  ActualizarEstudiante(id_grupo_estudio: number, nombre: string, direccion: string, telefono: string, correo: string, num_documento: string, tipo_documento: string, estudiante_activo: boolean): Observable<any> {

    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(+id_grupo_estudio)

    const negocioRequest = this.http.post<any>(`${this.url_ms_negocio}ActualizarEstudiante`, {
      num_documento: num_documento,
      nombre: nombre,
      direccion: direccion,
      telefono: telefono,
      correo: correo,
      id_grupo_estudio: +id_grupo_estudio,
      tipo_documento: tipo_documento,
    }, { headers });

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
          }, { headers });

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

  //Funciones del modulo TUTOR ---------------------------------------------------------------------------------------------------------------------
  CrearTutor(id_area_evaluar: number, nombre: string, direccion: string, telefono: string, correo: string, id_tutor: number, apellido: string, tutor_activo: boolean): Observable<any> {
    console.log("id_area_evaluar",id_area_evaluar,"nombre",nombre,"direccion",direccion,"telefono",telefono,"correo",correo,"id_tutor",id_tutor,"apellido",apellido,"tutor_activo",tutor_activo)
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const negocioRequest = this.http.post<any>(`${this.url_ms_negocio}CrearTutor`,
      {
        Nombre: nombre,
        Apellido: apellido,
        id_tutor: +id_tutor,
        direccion: direccion,
        telefono: telefono,
        correo: correo,
        id_area_evaluar: +id_area_evaluar,
      }, { headers });

    return negocioRequest.pipe(
      switchMap(negocioResponse => {
        if (negocioResponse.CODIGO === 200) {
          const seguridadRequest = this.http.post<any>(`${this.url_ms_seguridad}funcion-inserta-usuario-rolTutor-CONACTIVACION`, {
            id_usuario: ""+id_tutor,
            nombre: nombre + ' ' + apellido,
            correo: correo,
            celular: telefono,
            clave: ""+id_tutor,
            cuenta_activa: tutor_activo,
          }, { headers });

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

  ObtenerTutores():Observable<RespuestaServerObtenerTutores>{
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url_ms_negocio + 'ObtenerTutores',{ headers });
  }
  ObtenerTutor(id: string):Observable<RespuestaServerObtenerTutor>{
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url_ms_negocio + 'ObtenerTutor/'+id,{ headers });
  }

  ActualizarTutor(id_area_evaluar: number, nombre: string, direccion: string, telefono: string, correo: string, id_tutor: number, apellido: string, tutor_activo: boolean): Observable<any> {
    console.log("id_area_evaluar",id_area_evaluar,"nombre",nombre,"direccion",direccion,"telefono",telefono,"correo",correo,"id_tutor",id_tutor,"apellido",apellido,"tutor_activo",tutor_activo)
    const token = this.seguridadService.ObtenerDatosLocalStorage_TOKEN(); // Reemplaza con tu token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const negocioRequest = this.http.post<any>(`${this.url_ms_negocio}ActualizarTutor`, {
      Nombre: nombre,
      Apellido: apellido,
      id_tutor: +id_tutor,
      direccion: direccion,
      telefono: telefono,
      correo: correo,
      id_area_evaluar: +id_area_evaluar,
    }, { headers });

    return negocioRequest.pipe(
      switchMap(negocioResponse => {
        if (negocioResponse.CODIGO === 200) {
          const seguridadRequest = this.http.post<any>(`${this.url_ms_seguridad}funcion-actualiza-usuario-rolTutor-CONACTIVACION`, {
            id_usuario: ""+id_tutor,
            nombre: nombre + ' ' + apellido,
            correo: correo,
            celular: telefono,
            clave: ""+id_tutor,
            cuenta_activa: tutor_activo,
          }, { headers });

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





