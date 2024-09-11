import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class ControlComponent implements OnInit, OnDestroy {
  pruebasPendientes: prueba[] = [];
  pruebasFinalizadas: prueba[] = [];

  tuIdPrueba = ''; // El ID de la prueba que quieres editar
  tuIdDeEstudiante = ''; // El ID del estudiante que quieres editar

  private intervalId: any;
  private subscription: Subscription = new Subscription();

  showInformacionPruebawModal = false;

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

    // Configurar el intervalo para obtener pruebas disponibles periódicamente
    this.intervalId = setInterval(() => {
      this.obtenerPruebasDisponibles(id_usuario!);
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
          this.pruebasPendientes = data.DATOS!;
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

  closeInformacionPruebaForm(): void {
    this.showInformacionPruebawModal = false;
  }
}
