import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {
  nombre_usuario: string = '';
  nombre_rol_usuario: string = '';
  correo_usuario: string = '';
  num_documento_usuario: string = '';
  telefono_usuario: string = '';

  constructor(
    private seguridadService: SeguridadService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    //obtener usuario logueado usando el servicio de seguridad
    let usuario=this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION();
    if (usuario) {
      console.log(usuario);
      this.nombre_usuario = usuario.usuario?.nombre!;
      this.correo_usuario = usuario.usuario?.correo!;
      this.num_documento_usuario = usuario.usuario?.id_usuario!;
      this.telefono_usuario = usuario.usuario?.celular!;
      this.seguridadService.ObtenerRolUsuario().subscribe(
        (datos) => {
          console.log(datos);
          this.nombre_rol_usuario = datos.DATOS?.nombre_rol!;
        },
        (error) => {
          console.log(error);
          this.toast.error({detail:"Error al obtener el rol del usuario",summary:"Error",duration:5000, position:'topCenter'});
        }
      );



    }else{
      this.toast.error({detail:"error",summary:"No se encontro usuario",duration:5000, position:'topCenter'});
      this.router.navigate(['/seguridad/cerrar-sesion']);
    }




  }

}
