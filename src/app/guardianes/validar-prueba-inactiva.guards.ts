import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../servicios/seguridad.service';
import { NgToastService } from 'ng-angular-popup';


export const ValidarNOPresentandoPruebaGuard = () => {

  const servicioSeguridad = inject(SeguridadService);
  const router = inject(Router);
  const toast = inject(NgToastService);

  let PresentandoPrueba = servicioSeguridad.ObtenerPruebaActiva();
    if (PresentandoPrueba.pruebaActiva==true) {
      router.navigate(["/presentar-prueba/"]);
      toast.warning({ detail: "ADVERTENCIA", summary: "Navegación no permitida", duration: 5000, position: 'topCenter' });
      return false;
    }
    return true;
}
