import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../servicios/quiz.service';
import { NgToastService } from 'ng-angular-popup';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';

@Component({
  selector: 'app-pregunta-eliminar',
  templateUrl: './pregunta-eliminar.component.html',
  styleUrl: './pregunta-eliminar.component.css'
})
export class PreguntaEliminarComponent {
  @Input() PreguntaId!: string;
  @Output() cerrarModal = new EventEmitter<void>();


  constructor(
    private router: Router,
    private quizService: QuizService,
    private toast: NgToastService,
    private preguntaService: PreguntaService,

  ) { }

  ngOnInit(): void {

    console.log(this.PreguntaId) // Obtén el ID del contexto de la URL
    //console.log(this.contextoId);
    if (!this.PreguntaId || this.PreguntaId === ''  ||this.PreguntaId === '0') {
      // Maneja el caso en el que no se proporciona un ID de contexto
      this.router.navigate(['/prueba/quiz']);
      return;
      // Puedes mostrar un mensaje de error o redirigir a otra página
    }
  }

  EliminarPregunta() {
    this.preguntaService.EliminarPregunta(+this.PreguntaId).subscribe(
      (data : RespuestaServer) => {
        if (data.CODIGO == 200) {
          this.quizService.eliminarPregunta(+this.PreguntaId);
          this.toast.success({ detail: "Pregunta eliminada correctamente", summary: 'Éxito', duration: 5000, position: 'topCenter' });
          this.router.navigate(['/prueba/quiz']);
          //cierra el modal del componente padre
          this.cerrarModal.emit(); // Emite el evento para cerrar el modal

        } else {
          this.toast.error({ detail: "Error al eliminar el Pregunta", summary: data.MENSAJE, duration: 5000, position: 'topCenter' });
        }
      },
      (error) => {
        this.toast.error({ detail: "Error al eliminar el contexto", summary: 'Error', duration: 5000, position: 'topCenter' });
      }
    );

  }

  volver() {
    this.router.navigate(['/prueba/quiz']);
    this.cerrarModal.emit(); // Emite el evento para cerrar el modal

  }


}
