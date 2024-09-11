import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { PruebaService } from '../../../servicios/prueba.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { idpreguntas } from '../../../Modelos/idpreguntas.model';
import { RespuestaServerObtenerPreguntasPrueba } from '../../../Modelos/RespuestaServerObtenerPreguntasPrueba.model';
import { NgToastService } from 'ng-angular-popup';
import { Location } from '@angular/common';
import { SeguridadService } from '../../../servicios/seguridad.service';

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



  constructor(
    private PruebaService: PruebaService,
    private route: ActivatedRoute,
    private toast: NgToastService,
    private router: Router,
    private location: Location,
    private seguridadService: SeguridadService,
  ) { }

  ngOnInit() {
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
  }




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

  enviarResultados() {
    console.log('Enviando resultados...');
  }
}
