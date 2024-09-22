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
  async CerrarSesion() {
      await this.removerUsuarioActivo();
      await this.removerPruebaActiva();
      this.delayNavigation(5000);
   }

   removerUsuarioActivo(): Promise<void> {
    return new Promise((resolve) => {
      this.servicioSeguridad.RemoverDatosUsuarioValidadoSesion();
      resolve();
    });
  }


   removerPruebaActiva(): Promise<void> {
    return new Promise((resolve) => {
      this.servicioSeguridad.RemoverPruebaActiva();
      resolve();
    });
  }

  delayNavigation(ms: number): void {
    setTimeout(() => {
      window.location.href = '/';
    }, ms);
  }

}
