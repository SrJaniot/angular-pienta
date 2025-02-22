import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { prueba } from '../../../Modelos/prueba.model';
import { NgToastService } from 'ng-angular-popup';
import { PruebaControllService } from '../../../servicios/prueba-controll.service';
import { Router } from '@angular/router';
import { PruebaService } from '../../../servicios/prueba.service';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { RespuestaServerObtenerPruebas } from '../../../Modelos/RespuestaServerObtenerPruebas.model';
import { ConfiguracionRutasBackend } from '../../../config/configuracion.rutas.backend';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrl: './control.component.css'
})
export class ControlComponent implements OnInit, OnDestroy {
  pruebasPendientes: prueba[] = [];
  pruebasEnCurso: prueba[] = [];
  pruebasFinalizadas: prueba[] = [];


  tuIdPrueba = ''; // El ID de la prueba que quieres editar
  tuIdDeEstudiante = ''; // El ID del estudiante que quieres editar

  private intervalId: any;
  private subscription: Subscription = new Subscription();

  showInformacionPruebawModal = false;
  showContinuarPruebaModal = false;

  url_backend_ms_negocio = ConfiguracionRutasBackend.url_backend_ms_negocio;

  constructor(
    private toast: NgToastService,
    private PruebaControllService: PruebaControllService,
    private Router: Router,
    private pruebaService: PruebaService,
    private seguridadService: SeguridadService,
  ) { }

  ngOnInit(): void {
    // Obtener id del usuario usando el LocalStorage
    let usuario = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION();
    let id_usuario = usuario?.usuario?.id_usuario;
    this.pruebasPendientes = [];
    this.pruebasEnCurso = [];
    this.pruebasFinalizadas = [];
    // Configurar el intervalo para obtener pruebas disponibles periódicamente
    this.intervalId = setInterval(() => {
      //limpiar pruebas pendientes
      this.obtenerPruebasDisponibles(id_usuario!);
      this.obtenerPruebasEnCurso(id_usuario!);
      this.obtenerPruebasFinalizadas(id_usuario!);
    }, 5000); // Intervalo de 5 segundos
  }

  ngOnDestroy(): void {
    // Limpiar el intervalo cuando el componente se destruya
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    // Cancelar cualquier suscripción activa
    this.subscription.unsubscribe();
  }

  obtenerPruebasDisponibles(id_usuario: string): void {
    this.subscription.add(
      this.pruebaService.ObtenerPruebaDisponibleID(id_usuario).subscribe(
        (data: RespuestaServerObtenerPruebas) => {
          this.pruebasPendientes = data.DATOS ? data.DATOS : [];
        },
        (error) => {
          this.toast.error({ detail: "ERROR", summary: 'Error al obtener pruebas', duration: 5000, position: 'topCenter' });
        }
      )
    );
  }

  obtenerPruebasEnCurso(id_usuario: string): void {
    this.subscription.add(
      this.pruebaService.ObtenerPruebaEnCursoID(id_usuario).subscribe(
        (data: RespuestaServerObtenerPruebas) => {
          this.pruebasEnCurso = data.DATOS ? data.DATOS : [];
        },
        (error) => {
          this.toast.error({ detail: "ERROR", summary: 'Error al obtener pruebas', duration: 5000, position: 'topCenter' });
        }
      )
    );
  }

  obtenerPruebasFinalizadas(id_usuario: string): void {
    this.subscription.add(
      this.pruebaService.ObtenerPruebasFinalizadasID(id_usuario).subscribe(
        (data: RespuestaServerObtenerPruebas) => {
          this.pruebasFinalizadas = data.DATOS ? data.DATOS : [];
        },
        (error) => {
          this.toast.error({ detail: "ERROR", summary: 'Error al obtener pruebas', duration: 5000, position: 'topCenter' });
        }
      )
    );
  }


  VerInformacionPrueba(idPrueba: number): void {
    let id_prueba_strinng = idPrueba.toString()
    this.tuIdPrueba = id_prueba_strinng// El ID del contexto que quieres editar
    this.showInformacionPruebawModal = true;

  }

  ContinuarPrueba(idPrueba: number): void {
    let id_prueba_strinng = idPrueba.toString()
    this.tuIdPrueba = id_prueba_strinng// El ID del contexto que quieres editar
    this.showContinuarPruebaModal = true;

  }


  closeInformacionPruebaForm(): void {
    this.showInformacionPruebawModal = false;
  }


  VerResultados(idPrueba: number, fecha_fin: string): void {
    let id_estudiante = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION()?.usuario?.id_usuario;

    // Convertir la fecha de la base de datos a un objeto Date
    let fechaFinPrueba = new Date(fecha_fin);
    let fechaActual = new Date();

    console.log(fechaFinPrueba);
    console.log(fechaActual);

    // Comparar las fechas
    if (fechaFinPrueba < fechaActual) {
      this.Router.navigate(['/resultados/resultados-estudiantes', idPrueba, id_estudiante]);
    } else {
      this.toast.error({ detail: "ERROR", summary: 'No Permitido', duration: 5000, position: 'topCenter' });
    }
  }



}
