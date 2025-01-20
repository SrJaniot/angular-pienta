import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { PruebaService } from '../../../servicios/prueba.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { idpreguntas } from '../../../Modelos/idpreguntas.model';
import { RespuestaServerObtenerPreguntasPrueba } from '../../../Modelos/RespuestaServerObtenerPreguntasPrueba.model';
import { NgToastService } from 'ng-angular-popup';
import { Location } from '@angular/common';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { RespuestaServerObtenerFechasInicioFinDuracionPrueba } from '../../../Modelos/RespuestaServerObtenerFechasInicioFinDuracionPrueba.model';
import { RespuestaServeEnviarRespuestasPruebar } from '../../../Modelos/RespuestaServeEnviarRespuestasPruebar.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-presentar-prueba',
  templateUrl: './presentar-prueba.component.html',
  styleUrls: ['./presentar-prueba.component.css']
})
export class PresentarPruebaComponent implements OnInit {
  Preguntas: idpreguntas[] = [];
  selectedPreguntaId: string = '';
  showRulesPanel = true;
  showPreguntasPanel = false;
  isFullScreen = false;
  showBlackOverlay = false; // Variable para controlar la visibilidad del overlay
  watermarkText = 'Confidencial';
  btn_enviar=true;

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private intervalId: any;
  resultadosEnviados: boolean = false; // Bandera para indicar si los resultados ya han sido enviados


  fecha_inicio_prueba_estudiante: Date = new Date();
  fecha_fin_prueba_estudiante: Date = new Date();
  duracion_prueba_minutos: number = 0;




  constructor(
    private PruebaService: PruebaService,
    private route: ActivatedRoute,
    private toast: NgToastService,
    private router: Router,
    private location: Location,
    private seguridadService: SeguridadService,
  ) { }

  async ngOnInit(): Promise<void> {
    let pruebaActiva = this.seguridadService.ObtenerPruebaActiva();
    let pruebaID = pruebaActiva.idPruebaActiva;

    this.PruebaService.ObtenerPreguntasPrueba(+pruebaID!).subscribe(
      (data: RespuestaServerObtenerPreguntasPrueba) => {
        if (data.CODIGO == 200) {
          this.Preguntas = data.DATOS!;
          console.log(this.Preguntas);
        }
      }
    );

    // Capturar el id del estudiante
    let usuario = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION();
    let id_usuario = usuario?.usuario?.id_usuario;

    this.PruebaService.ObtenerFechasInicioFinDuracionPrueba(""+pruebaID, id_usuario!).subscribe(
      async (data: RespuestaServerObtenerFechasInicioFinDuracionPrueba) => {
        if (data.CODIGO == 200) {
          this.fecha_inicio_prueba_estudiante = data.DATOS!.FECHA_INICIO_PRUEBA_ESTUDIANTE;
          this.fecha_fin_prueba_estudiante = data.DATOS!.FECHA_FIN_PRUEBA_ESTUDIANTE;
          this.duracion_prueba_minutos = data.DATOS!.DURACION_PRUEBA_MINUTOS;

          // Validar si llega a existir fecha fin de prueba eliminar la prueba activa y resultados y redirigir a la pagina de inicio
          if (this.fecha_fin_prueba_estudiante) {
            await this.removerPruebaActiva();
            this.delayNavigation(5000); // Retrasar la navegación 3 segundos
            // Parar la ejecución de todas las funciones del componente
            return;
          }

          // Validar si la fecha de inicio de la prueba es mayor a la fecha actual eliminar la prueba activa y resultados y redirigir a la pagina de inicio
          let fecha_actual = new Date();
          if (this.fecha_inicio_prueba_estudiante > fecha_actual) {
            await this.removerPruebaActiva();
            this.delayNavigation(5000); // Retrasar la navegación 3 segundos
            // Parar la ejecución de todas las funciones del componente
            return;
          }

          // Calcular cuantos minutos le quedan a la prueba para finalizar teniendo en cuenta la fecha de inicio y la duración y la fecha actual
          let fecha_inicio = new Date(this.fecha_inicio_prueba_estudiante);
          let fecha_fin = new Date(fecha_inicio.getTime() + this.duracion_prueba_minutos * 60000);
          let diferencia = fecha_fin.getTime() - fecha_actual.getTime();
          let horas = Math.floor(diferencia / 3600000);
          let minutos = Math.floor(diferencia / 60000);
          let segundos = Math.floor((diferencia % 60000) / 1000);
          this.startTimer(horas, minutos, segundos);
        }
      }
    );
    //-- SEGURIDAD--------------------------------------------------------------------------------------------------------------------------------------------
    history.pushState(null, '', location.href);
    this.location.subscribe(() => {
      history.pushState(null, '', location.href);
      this.toast.warning({ detail: "ADVERTENCIA", summary: "Navegación hacia atrás no permitida", duration: 5000, position: 'topCenter' });
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'imperative' || event.navigationTrigger === 'popstate') {
          this.router.navigateByUrl(this.router.url);
          this.toast.warning({ detail: "ADVERTENCIA", summary: "Navegación no permitida", duration: 5000, position: 'topCenter' });
        }
      }
    });
    //--------------------------------------------------------------------------------------------------------------------------------------------------------

  }



  //---------------------------------------------------------------------- SEGURIDAD--------------------------------------------------------------------------------------------------------------------------------------------
  @HostListener('document:keyup', ['$event'])
  handleDocumentKeyUpEvent(event: KeyboardEvent) {
    console.log('Document key up event:', event.key);
    if (event.key === 'PrintScreen') {
      console.log('PrintScreen released on document');
      this.showBlackOverlay = true;

      // Mostrar el toast de alerta
      this.toast.error({ detail: "FRAUDE", summary: "Captura de pantalla detectada FRAUDE", duration: 65000, position: 'topCenter' });

      // Ocultar el overlay después de 5 segundos
      setTimeout(() => {
        this.showBlackOverlay = false;
      }, 65000);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleDocumentKeyDownEvent(event: KeyboardEvent) {
    if (event.ctrlKey && (event.key === 'c' || event.key === 'v' || event.key === 'x')) {
      event.preventDefault();
      this.toast.warning({ detail: "ADVERTENCIA", summary: "Acción no permitida", duration: 5000, position: 'topCenter' });
    }
  }

  @HostListener('document:copy', ['$event'])
  handleDocumentCopyEvent(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      clipboardData.setData('text/plain', 'No haga trampa');
    }
    this.toast.warning({ detail: "ADVERTENCIA", summary: "Intento de copia detectado", duration: 5000, position: 'topCenter' });
  }


  @HostListener('document:contextmenu', ['$event'])
  handleContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.toast.warning({ detail: "ADVERTENCIA", summary: "Acción no permitida", duration: 5000, position: 'topCenter' });
  }

  @HostListener('document:dragstart', ['$event'])
  handleDragStart(event: DragEvent) {
    event.preventDefault();
    this.toast.warning({ detail: "ADVERTENCIA", summary: "Acción no permitida", duration: 5000, position: 'topCenter' });
  }

  @HostListener('document:visibilitychange', [])
  handleVisibilityChange() {
    if (document.hidden) {
      this.showBlackOverlay = true;
      this.toast.error({ detail: "FRAUDE", summary: "Cambio de pestaña detectado FRAUDE", duration: 65000, position: 'topCenter' });
      // Ocultar el overlay después de 5 segundos
      setTimeout(() => {
        this.showBlackOverlay = false;
      }, 65000);
    }
  }
  @HostListener('document:keydown', ['$event'])
  handleDocumentKeyDownEventWINDOWSKEY(event: KeyboardEvent) {
    if (event.key === 'Meta' || event.key === 'OS') {
      console.log('Windows key pressed');
      this.showBlackOverlay = true;

      // Mostrar el toast de alerta
      this.toast.warning({ detail: "ADVERTENCIA", summary: "Tecla de Windows detectada", duration: 15000, position: 'topCenter' });

      // Ocultar el overlay después de 5 segundos
      setTimeout(() => {
        this.showBlackOverlay = false;
      }, 15000);
    }
  }

  @HostListener('document:fullscreenchange')
  @HostListener('document:webkitfullscreenchange')
  @HostListener('document:mozfullscreenchange')
  @HostListener('document:MSFullscreenChange')
  onFullScreenChange() {
    const doc = document as any;
    this.isFullScreen = !!(
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement
    );
  }


  removerPruebaActiva(): Promise<void> {
    return new Promise((resolve) => {
      this.seguridadService.RemoverPruebaActiva();
      resolve();
    });
  }

  delayNavigation(ms: number): void {
    setTimeout(() => {
      window.location.href = '/home';
    }, ms);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------BOTONES DE ACCION------------------------------------------------------------------------------------------------------------------------------------------------------------

  requestFullScreen() {
    const elem = document.documentElement as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then(() => {
        this.isFullScreen = true;
      });
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen().then(() => {
        this.isFullScreen = true;
      });
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen().then(() => {
        this.isFullScreen = true;
      });
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen().then(() => {
        this.isFullScreen = true;
      });
    }
  }

  selectPregunta(id_pregunta: number): void {
    this.selectedPreguntaId = id_pregunta.toString();
    this.showRulesPanel = false;
    this.showPreguntasPanel = true;
  }

  toggleRulesPanel() {
    this.showRulesPanel = true;
    this.showPreguntasPanel = false;
    this.selectedPreguntaId = '';
  }

  isLastQuestion(): boolean {
    if (!this.Preguntas || this.Preguntas.length === 0) {
      return false;
    }
    const currentIndex = this.Preguntas.findIndex(p => p.ID_PREGUNTA === +this.selectedPreguntaId);
    return currentIndex === this.Preguntas.length - 1;
  }

  goToNextQuestion(): void {
    const currentIndex = this.Preguntas.findIndex(p => p.ID_PREGUNTA === +this.selectedPreguntaId);
    if (currentIndex < this.Preguntas.length - 1) {
      this.selectPregunta(this.Preguntas[currentIndex + 1].ID_PREGUNTA);
    }
  }

  goToPreviousQuestion(): void {
    const currentIndex = this.Preguntas.findIndex(p => p.ID_PREGUNTA === +this.selectedPreguntaId);
    if (currentIndex > 0) {
      this.selectPregunta(this.Preguntas[currentIndex - 1].ID_PREGUNTA);
    } else {
      this.toggleRulesPanel();
    }
  }

  enviarResultados(): void {
    console.log('Enviando resultados...');
    // Preparar los datos que se enviarán en el endpoint de resultados
    // Capturar el JSON de las respuestas que está en el localStorage
    let respuestas = JSON.parse(localStorage.getItem('respuestas')!) || [];
    // Convertir en una cadena JSON
    let respuestasarray = JSON.stringify(respuestas);

    // Capturar el ID de la prueba
    let pruebaActiva = this.seguridadService.ObtenerPruebaActiva();
    let pruebaID = pruebaActiva.idPruebaActiva;
    // Capturar el ID del estudiante
    let usuario = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION();
    let id_usuario = usuario?.usuario?.id_usuario;

    // Validar que existan respuestas
    if (respuestas.length == 0) {
      this.toast.error({ detail: "ERROR", summary: "No se han registrado respuestas", duration: 5000, position: 'topCenter' });
      return;
    }
    // Validar que el número de preguntas de la lista preguntas sea igual al número de respuestas
    console.log(this.Preguntas.length);
    console.log(respuestas.length);
    if (this.Preguntas.length != respuestas.length) {
      this.toast.error({ detail: "ERROR", summary: "No se han respondido todas las preguntas", duration: 5000, position: 'topCenter' });
      return;
    }
    // Llamar al servicio de resultados para enviar las respuestas
    this.PruebaService.EnviarResultadosPrueba(+pruebaID!, id_usuario!, respuestasarray).subscribe(
      async (data: RespuestaServeEnviarRespuestasPruebar) => {
        console.log(data);
        if (data.CODIGO == 200) {
          this.toast.success({ detail: "EXITO", summary: "Resultados enviados correctamente", duration: 5000, position: 'topCenter' });
          this.resultadosEnviados = true;
          this.btn_enviar=false;
          // Remover la prueba activa y los resultados del localstorage
          await this.removerPruebaActiva();
          // Detener el cronómetro
          clearInterval(this.intervalId);
          // Redirigir a la página de inicio
          this.delayNavigation(5000); // Retrasar la navegación 5 segundos
          return; // Finalizar la función
        } else {
          this.toast.error({ detail: "ERROR", summary: "Error al enviar los resultados", duration: 5000, position: 'topCenter' });
        }
      },
      async (error: HttpErrorResponse) => {
        console.error('Error al enviar los resultados:', error);
        this.toast.error({ detail: "ERROR", summary: "Error al enviar los resultados", duration: 5000, position: 'topCenter' });
        // Remover la prueba activa y los resultados del localstorage en caso de error
        await this.removerPruebaActiva();
        // Detener el cronómetro
        clearInterval(this.intervalId);
        // Redirigir a la página de inicio
        this.delayNavigation(5000); // Retrasar la navegación 5 segundos
        return; // Finalizar la función
      }
    );
  }


  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------CRONOMETRO------------------------------------------------------------------------------------------------------------------------------------------------------------
  async startTimer(hours: number, minutes: number, seconds: number): Promise<void> {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;

    this.intervalId = setInterval(async () => {
      if (this.resultadosEnviados) {
        clearInterval(this.intervalId);
        return; // Finalizar la función si los resultados ya han sido enviados
      }

      if (this.seconds > 0) {
        this.seconds--;
      } else {
        if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          if (this.hours > 0) {
            this.hours--;
            this.minutes = 59;
            this.seconds = 59;
          } else {
            clearInterval(this.intervalId);
            this.toast.info({ detail: "ALERTA", summary: "Tiempo agotado, sus respuestas se enviarán automáticamente", duration: 5000, position: 'topCenter' });

            // Enviar resultados automáticamente
            console.log('Enviando resultados...');

            // Capturar el JSON de las respuestas que está en el localStorage
            let respuestas = JSON.parse(localStorage.getItem('respuestas')!) || [];
            let respuestasarray = JSON.stringify(respuestas);

            // Capturar el ID de la prueba
            let pruebaActiva = this.seguridadService.ObtenerPruebaActiva();
            let pruebaID = pruebaActiva.idPruebaActiva;

            // Capturar el ID del estudiante
            let usuario = this.seguridadService.ObtenerDatosUsuarioIdentificadoSESION();
            let id_usuario = usuario?.usuario?.id_usuario;

            // Validar que existan respuestas
            if (respuestas.length == 0) {
              this.toast.error({ detail: "ERROR", summary: "No se han registrado respuestas", duration: 5000, position: 'topCenter' });
              await this.removerPruebaActiva();
              this.delayNavigation(5000); // Retrasar la navegación 5 segundos
              return; // Finalizar la función
            }

            // Llamar al servicio de resultados para enviar las respuestas
            this.PruebaService.EnviarResultadosPrueba(+pruebaID!, id_usuario!, respuestasarray).subscribe(
              async (data: RespuestaServeEnviarRespuestasPruebar) => {
                console.log(data);
                if (data.CODIGO == 200) {
                  this.toast.success({ detail: "EXITO", summary: "Resultados enviados correctamente", duration: 5000, position: 'topCenter' });
                  await this.removerPruebaActiva();
                  this.delayNavigation(5000); // Retrasar la navegación 5 segundos
                  return; // Finalizar la función
                } else {
                  this.toast.error({ detail: "ERROR", summary: "Error al enviar los resultados", duration: 5000, position: 'topCenter' });
                }
              },
              async (error) => {
                console.error('Error al enviar los resultados:', error);
                this.toast.error({ detail: "ERROR", summary: "Error al enviar los resultados", duration: 5000, position: 'topCenter' });
                await this.removerPruebaActiva();
                this.delayNavigation(5000); // Retrasar la navegación 5 segundos
                return; // Finalizar la función
              }
            );
          }
        }
      }
    }, 1000);
  }




}

