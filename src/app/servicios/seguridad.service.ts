import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RespuestaServer } from '../Modelos/RespuestaServer.model';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogin } from '../Modelos/UsuarioLogin.model';
import { UsuarioValidadoModel } from '../Modelos/UsuarioValidado.model';
import { PermisoModel } from '../Modelos/Permiso.model';
import { ItemMenuModel } from '../Modelos/item.menu.model';
import { ConfiguracionMenuLateral } from '../config/configuracion.menu.latreal';
import { RespuestaServerObtenerRol } from '../Modelos/RespuestaServerObtenerRol.model';
import { PruebaActiva } from '../Modelos/pruebaActiva.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  private url_ms_seguridad : string = ConfiguracionRutasBackend.url_backend_ms_seguridad;

  constructor(
    private http: HttpClient,
  ) {
    //importante para que se ejecute la validacion de la sesion
    this.validacionDeSesion();

   }

  /**
   * funcion que se encarga de enviar los datos de usuario y clave al backend usando un endpoint con metodo post y con respuesta de tipo RespuestaServer
   * @param usuario
   * @param claveEncriptada
   * @returns
   */
  IdentificarUsuario(usuario: string,claveEncriptada: string):Observable <RespuestaServer>{
    return this.http.post(this.url_ms_seguridad + 'identificar-usuario-SIN-2fa',{
      correo: usuario,
      clave: claveEncriptada
    });
  }


  /**
   * metodo para almacenar los datos del usuario identificado en el localstorage
   * @param datosUsuario
   * @returns
   */
  AlmacenarDatosUsuarioIdentificado(datosUsuario: RespuestaServer):boolean {
    let cadena =JSON.stringify(datosUsuario.DATOS);
    let datosLS= localStorage.getItem('datosUsuario');
    if (datosLS){
      console.log('Ya existe un usuario identificado');

      return false;

    }else{
      localStorage.setItem('datosUsuario', cadena);
      console.log('Usuario identificado almacenado');
      //this.validacionDeSesion(); //actualiza el comportamiento del usuario es decir actualiza el observable "la barra de navegacion"
      //alert("Usuario identificado");
      return true;
    }
  }



  ObteberDatosLocalStorage_USUARIO(): UsuarioLogin | null{
    let datosLS = localStorage.getItem('datosUsuario');
    if (datosLS) {
      return JSON.parse(datosLS);
    } else {
      return null;
    }
  }




  /**
   * metodo para almacenar los datos del usuario identificado en el localstorage
   * @param datosUsuario
   * @returns
   */
  AlmacenarDatosUsuarioIdentificadoSESION(datosUsuario: RespuestaServer):boolean {
    let cadena =JSON.stringify(datosUsuario.DATOS);
    let datosLS= localStorage.getItem('datosSesion');
    if (datosLS){
      console.log('Ya existe un usuario identificado');

      return false;

    }else{
      localStorage.setItem('datosSesion', cadena);
      console.log('Usuario identificado almacenado');
      this.validacionDeSesion(); //actualiza el comportamiento del usuario es decir actualiza el observable "la barra de navegacion"
      //alert("Usuario identificado");
      return true;
    }
  }
  /**
   *  metodo para obtener los datos del usuario identificado en el sistema
   * @returns UsuarioValidadoModel | null
   */
  ObtenerDatosUsuarioIdentificadoSESION(): UsuarioValidadoModel | null{
    let datosLS = localStorage.getItem('datosSesion');
    if (datosLS) {
      return JSON.parse(datosLS);
    } else {
      return null;
    }
  }


  /**
   * metodo para remover los datos del usuario identificado en el sistema y cie
   */
  RemoverDatosUsuarioValidado(){
    let datosLS = localStorage.getItem('datosSesion');
    let datosLS2 = localStorage.getItem('datosUsuario');
    if (datosLS && datosLS2) {
      let sesion=this.ObtenerDatosUsuarioIdentificadoSESION();
      this.CerrarSesion(sesion?.usuario?.id_usuario!,sesion?.token!).subscribe((respuesta:RespuestaServer)=>{
        if (respuesta.CODIGO == 200) {
          console.log('Sesion cerrada en angular y en el backend');
          localStorage.removeItem('datosSesion');
          localStorage.removeItem('datosUsuario');
          this.ActualizarComportamientoUsuario(new UsuarioValidadoModel());
        }else{
          console.log('Error al cerrar la sesion');
        }
      });
    }
  }


  RemoverDatosUsuarioValidadoSesion() :Promise<void>{
    return new Promise((resolve, reject) => {
    let datosLS = localStorage.getItem('datosSesion');
    let datosMenu = localStorage.getItem('menuLateral');
    if (datosLS) {
      let sesion=this.ObtenerDatosUsuarioIdentificadoSESION();
      this.CerrarSesion(sesion?.usuario?.id_usuario!,sesion?.token!).subscribe((respuesta:RespuestaServer)=>{
        console.log(respuesta);
        if (respuesta.CODIGO == 200) {
          console.log('Sesion cerrada en angular y en el backend');
          localStorage.removeItem('datosSesion');
          localStorage.removeItem('menuLateral');
          this.ActualizarComportamientoUsuario(new UsuarioValidadoModel());
          resolve();
        }else{
          console.log('Sesion cerrada SOLO en angular');
          localStorage.removeItem('datosSesion');
          localStorage.removeItem('menuLateral');
          this.ActualizarComportamientoUsuario(new UsuarioValidadoModel());
          resolve();
         }
      });
    }
  } );
  }

  CerrarSesion(id_usuario: string ,token: string):Observable <RespuestaServer> {
    console.log(id_usuario,token)
    return this.http.post(this.url_ms_seguridad + 'cerrar-sesion',{
      id_usuario: id_usuario,
      token: token
    });
  }




  /**
   * Obtiene los datos de la sesion del usuario
   * @returns datos de la sesion del usuario
   */
  datosUsuarioValidado = new BehaviorSubject<UsuarioValidadoModel>(new UsuarioValidadoModel());

  ObteberDatosSesion(): Observable<UsuarioValidadoModel> {
    return this.datosUsuarioValidado.asObservable();
  }

validacionDeSesion(): boolean{
  let datosLS = localStorage.getItem('datosSesion');
  if (datosLS) {
    let objUsuario= JSON.parse(datosLS);
    this.ActualizarComportamientoUsuario(objUsuario);
    return true;
  } else {
    return false;
  }
}



ActualizarComportamientoUsuario(datos:UsuarioValidadoModel){
  //console.log(this.datosUsuarioValidado);
  return this.datosUsuarioValidado.next(datos);
}


/**
 * metodo que se encarga de construir el menu lateral del sistema por roles
 * @param permisos
 * @returns
 */
ConstruirMenuLateral(permisos: PermisoModel[]){
  let menu: ItemMenuModel[] = [];
  permisos.forEach((permiso: PermisoModel) => {
    let datosRuta = ConfiguracionMenuLateral.listaMenus.filter(x => x.menuid ==permiso.menuid);
    if (datosRuta.length > 0) {
      let item: ItemMenuModel = new ItemMenuModel();
      item.menuid = permiso.menuid;
      item.ruta = datosRuta[0].ruta;
      item.texto = datosRuta[0].texto;
      item.icono = datosRuta[0].icono;
      menu.push(item);
    }
  });
  this.AlmacenarItemMenuLateral(menu);
}

/**
 * metodo que se encarga de almacenar el menu lateral del sistema
 * @param menu
 */
AlmacenarItemMenuLateral(menu: ItemMenuModel[]){
  let cadena =JSON.stringify(menu);
  localStorage.setItem('menuLateral', cadena);
}

/**
 * metodo que se encarga de obtener el menu lateral del sistema
 * @returns ItemMenuModel[]
 */
ObtenerItemMenuLateral(): ItemMenuModel[]{
  let menu : ItemMenuModel[] = [];
  let datosLS = localStorage.getItem('menuLateral');
  if (datosLS) {
    menu = JSON.parse(datosLS);
  }
  return menu;
}




//metodo para obtener el id_rol y nombre_rol del usuario a partir del token
ObtenerRolUsuario():Observable<RespuestaServerObtenerRol>{
  let datosLS = this.ObtenerDatosUsuarioIdentificadoSESION();
  let token = datosLS?.token;
  return this.http.post(this.url_ms_seguridad + 'consultar-rol',{
    token: token
  });
}












//-------------------------------------------------LOGICA DE PRUEBA-------------------------------------------------------------------------------

//Metodo para almacenar en localstorage si una prueba esta activa
AlmacenarPruebaActiva(id_prueba:string){
  //crea un objeto json para almacenar la prueba activa y el id de la prueba
  let objeto= {
    pruebaActiva: true,
    idPruebaActiva: id_prueba
  }
  let cadena =JSON.stringify(objeto);
  let datosLS = localStorage.getItem('pruebaActiva');
  if (datosLS) {
    console.log('Ya existe una prueba activa');
  } else {
    localStorage.setItem('pruebaActiva', cadena);
    console.log('Prueba activa almacenada');
  }

}
//Metodo para obtener si una prueba esta activa
ObtenerPruebaActiva(): PruebaActiva {
  let datosLS = localStorage.getItem('pruebaActiva');
  if (datosLS) {
    return JSON.parse(datosLS);
  } else {
    return new PruebaActiva();
  }
}

  // Método para remover si una prueba está activa
  RemoverPruebaActiva(): Promise<void> {
    return new Promise((resolve, reject) => {
      let datosLS = localStorage.getItem('pruebaActiva');
      let datosLS2 = localStorage.getItem('respuestas');
      if (datosLS) {
        localStorage.removeItem('pruebaActiva');
        localStorage.removeItem('respuestas');
        console.log('Prueba activa removida');
        resolve();
      } else {
        console.log('No hay una prueba activa');
        resolve();
      }
    });
  }
















}
