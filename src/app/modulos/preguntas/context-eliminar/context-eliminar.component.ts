import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../servicios/quiz.service';
import { NgToastService } from 'ng-angular-popup';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';

@Component({
  selector: 'app-context-eliminar',
  templateUrl: './context-eliminar.component.html',
  styleUrl: './context-eliminar.component.css'
})
export class ContextEliminarComponent {
  @Input() contextoId!: string;
  @Output() cerrarModal = new EventEmitter<void>();


  constructor(
    private router: Router,
    private quizService: QuizService,
    private toast: NgToastService,
    private preguntaService: PreguntaService,

  ) { }

  ngOnInit(): void {

    console.log(this.contextoId) // Obtén el ID del contexto de la URL
    //console.log(this.contextoId);
    if (!this.contextoId || this.contextoId === '' || this.contextoId === '1' || this.contextoId === '0') {
      // Maneja el caso en el que no se proporciona un ID de contexto
      this.router.navigate(['/prueba/quiz']);
      return;
      // Puedes mostrar un mensaje de error o redirigir a otra página
    }
  }

  EliminarContexto() {
    this.preguntaService.EliminarContexto(+this.contextoId).subscribe(
      (data : RespuestaServer) => {
        if (data.CODIGO == 200) {
          this.quizService.eliminarContexto(+this.contextoId);
          this.toast.success({ detail: "Contexto eliminado correctamente", summary: 'Éxito', duration: 5000, position: 'topCenter' });
          this.router.navigate(['/preguntas/quiz']);
          //cierra el modal del componente padre
          this.cerrarModal.emit(); // Emite el evento para cerrar el modal

        } else {
          this.toast.error({ detail: "Error al eliminar el contexto", summary: data.MENSAJE, duration: 5000, position: 'topCenter' });
        }
      },
      (error) => {
        this.toast.error({ detail: "Error al eliminar el contexto", summary: 'Error', duration: 5000, position: 'topCenter' });
      }
  );

  }

  volver() {
    this.router.navigate(['/preguntas/quiz']);
    this.cerrarModal.emit(); // Emite el evento para cerrar el modal

  }





}
