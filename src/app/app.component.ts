import { Component } from '@angular/core';
import { SeguridadService } from './servicios/seguridad.service';
import { UsuarioValidadoModel } from './Modelos/UsuarioValidado.model';
import { ItemMenuModel } from './Modelos/item.menu.model';
import { Router } from '@angular/router';
import { ConfiguracionRutasBackend } from './config/configuracion.rutas.backend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PientaFrontEJ';
  //Sidebar toggle show hide function
  //variables
  status = false;
  sesionActiva= false;
  listaMenus: ItemMenuModel[] = [];

  url_backend_ms_negocio = ConfiguracionRutasBackend.url_backend_ms_negocio;

  //constructor
  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router
  ){}

ngOnInit() {
  this.ValidarSesionActiva();
  this.listaMenus = this.servicioSeguridad.ObtenerItemMenuLateral();
  //console.log(this.listaMenus);

}

ValidarSesionActiva() {
  this.servicioSeguridad.ObteberDatosSesion().subscribe({
    next: (datos:UsuarioValidadoModel) => {
      //console.log(datos);
      if (datos.token!= "") {
        this.sesionActiva = true;
      }else{
        this.sesionActiva = false;
      }
      //console.log(datos);
    },
    error: (error:any) => {
      //console.log(error);
      this.sesionActiva = false;
    }
  });


}


isPresentarPruebaRoute(): boolean {
  return this.router.url.startsWith('/presentar-prueba');
}


















addToggle()
{
  this.status = !this.status;
}
}
