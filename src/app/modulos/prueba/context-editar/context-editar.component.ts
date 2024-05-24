// editar-context.component.ts
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../../servicios/quiz.service';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { NgToastService } from 'ng-angular-popup';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextComponent } from '../context/context.component';
import { RespuestaServerObtenerUNContexto } from '../../../Modelos/RespuestaServerObtenerUNContexto.model';

@Component({
  selector: 'app-context-editar',
  templateUrl: './context-editar.component.html',
  styleUrl: './context-editar.component.css'
})
export class EditarContextComponent extends ContextComponent implements OnInit {
  @Input() contextoId!: string;

  constructor(
    fb: FormBuilder,
    quizService: QuizService,
    changeDetector: ChangeDetectorRef,
    preguntaService: PreguntaService,
    toast: NgToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super(fb, quizService, changeDetector, preguntaService, toast);

  }

  override ngOnInit(): void {
    console.log(this.contextoId) // Obtén el ID del contexto de la URL
    //console.log(this.contextoId);
    if (!this.contextoId || this.contextoId === '' || this.contextoId === '1' || this.contextoId === '0') {
      // Maneja el caso en el que no se proporciona un ID de contexto
      this.router.navigate(['/prueba/quiz']);
      return;
      // Puedes mostrar un mensaje de error o redirigir a otra página

    }

    this.ConstruirFormularioArchivo();
    this.ConstruirFormulario();



    this.preguntaService.ObtenerContextoID(this.contextoId).subscribe(
      (data: RespuestaServerObtenerUNContexto) => {
        console.log(data);
      if (data.CODIGO == 200) {
        let contexto = {
          nombre: data.DATOS?.NOM_CONTEXTO,
          descripcion: data.DATOS?.DESC_CONTEXTO,
          autor: data.DATOS?.AUTOR_CONTEXTO,
          NombreArchivo: data.DATOS?.LINK_MEDIA
        };
        this.contextoForm.setValue(contexto);
      }else{
          this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
        }


      }
    );



  }





  override onSubmit() {
    if (this.contextoForm.valid) {
      let nombre = this.contextoForm.controls["nombre"].value;
      let descripcion = this.contextoForm.controls["descripcion"].value;
      let autor = this.contextoForm.controls["autor"].value;
      let nombreArchivo = this.contextoForm.controls["NombreArchivo"].value;
      let id_contexto_int = parseInt(this.contextoId);

      this.preguntaService.ActualizarContexto(id_contexto_int, nombre, descripcion, autor, nombreArchivo).subscribe({
        next: (data: RespuestaServer) => {
          if (data.CODIGO == 200) {
            this.toast.success({detail:"EXITO",summary:"Contexto actualizado correctamente",duration:5000, position:'topCenter'});
            let id_contexto_db = data.DATOS.ID_CONTEXTO;
            let id_contexto_db_entero = parseInt(id_contexto_db);
            this.quizService.updateContexto(this.contextoForm.value,id_contexto_db_entero);
            this.contextoForm.reset()
          }else{
            this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
          }
        },
        error: (err: any) => {
          this.toast.error({detail:"ERROR",summary:"Error actualizando el contexto",duration:5000, position:'topCenter'});
        }
      });
    }
  }
}
