import { Component } from '@angular/core';
import { prueba } from '../../../Modelos/prueba.model';
import { NgToastService } from 'ng-angular-popup';
import { PruebaControllService } from '../../../servicios/prueba-controll.service';
import { Router } from '@angular/router';
import { PruebaService } from '../../../servicios/prueba.service';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { RespuestaServerObtenerPruebas } from '../../../Modelos/RespuestaServerObtenerPruebas.model';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrl: './control.component.css'
})
export class ControlComponent {
  pruebasPendientes: prueba[]= [];
  pruebasFinalizadas: prueba[]= [];


  showPruebaGenericaModal = false;
  showPruebaListaModal = false;
  showGrupoListaModal = false;
  showGrupoMatricularModal = false;
  showEstudianteListaModal = false;
  showEstudianteMatricularModal = false;
  tuIdPrueba = ''; // El ID de la prueba que quieres editar
  tuIdDeGrupo = ''; // El ID de la pregunta que quieres editar
  tuIdDeEstudiante = ''; // El ID del estudiante que quieres editar
  constructor(
    private toast: NgToastService,
    private PruebaControllService: PruebaControllService,
    private Router: Router,
    private pruebaService: PruebaService,
    private seguridadService: SeguridadService,
  ) { }
  ngOnInit(): void {
    //obtener id del usuario usando el LocalStorage
    let usuario = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION();
    let id_usuario = usuario?.usuario?.id_usuario;

    //obtener pruebas disponibles

    this.pruebaService.ObtenerPruebaDisponibleID(id_usuario!).subscribe(
      (data:RespuestaServerObtenerPruebas ) => {
        this.pruebasPendientes = data.DATOS!;
      }
    );
  }
  CrearPruebaGenerica() {
    this.showPruebaGenericaModal = true;
  }
  closePruebaGenericaForm() {
    this.showPruebaGenericaModal = false;
  }


}
