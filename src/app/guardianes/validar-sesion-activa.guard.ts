import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../servicios/seguridad.service';


export const ValidarSesionActivaGuard = () => {

  const servicioSeguridad = inject(SeguridadService);
  const router = inject(Router);

  let existeSesion = servicioSeguridad.validacionDeSesion();
    if (existeSesion) {
      return true;
    }
    router.navigate(["/"]);
    return false;
}
