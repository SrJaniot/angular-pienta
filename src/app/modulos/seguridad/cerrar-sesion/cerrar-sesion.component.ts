import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrl: './cerrar-sesion.component.css'
})
export class CerrarSesionComponent {

  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.CerrarSesion();
  }
  CerrarSesion() {
    this.servicioSeguridad.RemoverDatosUsuarioValidadoSesion();
    //window.location.href = '';
    this.router.navigate(['/seguridad/login']).then(() => {
      window.location.reload();
    });
   }

}
