import { Component, ViewChild } from '@angular/core';
//para poder usar esta lista necesitamos instalar ng add @angular/material
//y tambien importarlos en el modulo que estemos usando. en este caso en prueba.module.ts

import { MatPaginator } from '@angular/material/paginator';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { NgToastService } from 'ng-angular-popup';
import { MatTableDataSource } from '@angular/material/table';

import { QuizService } from '../../../servicios/quiz.service';
import { RespuestaServerObtenerPreguntas } from '../../../Modelos/RespuestaServerObtenerPreguntas.model';
import { Preguntas } from '../../../Modelos/Preguntas.model';
import { Pregunta } from '../../../Modelos/pregunta.model';
import { RespuestaServerObtenerUNContexto } from '../../../Modelos/RespuestaServerObtenerUNContexto.model';
import { Contexto } from '../../../Modelos/contexto.model';

@Component({
  selector: 'app-pregunta-lista',
  templateUrl: './pregunta-lista.component.html',
  styleUrl: './pregunta-lista.component.css'
})
export class PreguntaListaComponent {
  displayedColumns: string[] = ['id','ContextoID', 'Enunciado', 'TipoPregunta', 'Puntaje', 'Autor','AreaEvaluar','TemaEvaluar','Acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Preguntas>([]);

  ListaTiposPreguntas: any[] = [
    { id: '1', nombre: 'Opción Múltiple Única Respuesta' },
    { id: '2', nombre: 'Opción Múltiple Múltiple Respuesta' },
    { id: '3', nombre: 'Verdadero o Falso' },
    { id: '4', nombre: 'Ensayo' }
  ];

  constructor(
    private PreguntaService: PreguntaService,
    private toast: NgToastService,
    private quizService: QuizService,

  ) { }
  ngOnInit() {
    this.PreguntaService.ObtenerPreguntas().subscribe(
      (data:RespuestaServerObtenerPreguntas ) => {
        //console.log(data);
        if (data.CODIGO == 200) {
          //console.log(data.DATOS);
          this.dataSource = new MatTableDataSource(data.DATOS);
          this.dataSource.paginator = this.paginator;


        } else {
          this.toast.error({ detail: 'ERROR', summary: data.MENSAJE!, duration: 5000, position: 'topCenter' });
        }
      });
    }



    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }




    agregarPregunta( pregunta: Preguntas) {
      //construir la pregunta para mandarla al servicio
      let NombreTipoPregunta = this.ListaTiposPreguntas.find(x => x.id == pregunta.TIPO_PREGUNTA)?.nombre;
      //esta constante no es del mismo tipo que el parametro que recibe la funcion el parametro es Preguntas y la constante es Pregunta
      const pregunta2 : Pregunta = {
        id: pregunta.ID_PREGUNTA!,
        contextoId: pregunta.ID_CONTEXTO!,
        enunciado: pregunta.ENUNCIADO_PREGUNTA!,
        tipo: pregunta.TIPO_PREGUNTA!,
        tipo_nombre: NombreTipoPregunta,
        puntaje: pregunta.PUNTAJE_PREGUNTA!,
        autor: pregunta.AUTOR_PREGUNTA!,
        Area_Evaluar: pregunta.ID_AREA_EVALUAR!,
        Area_Evaluar_nombre: pregunta.NOMBRE_AREA_EVALUAR!,
        Tema_Evaluar: pregunta.ID_TEMA_AREA!,
        Tema_Evaluar_nombre: pregunta.NOMBRE_TEMA_AREA!,

        imagen_pregunta: pregunta.IMAGEN_PREGUNTA!,
        tipo_pregunta_contenido: pregunta.TIPO_PREGUNTA_CONTENIDO!,
        layout_pregunta: pregunta.LAYOUT_PREGUNTA!,

      }
      let respuesta=this.quizService.addPregunta2(pregunta2);
      if(respuesta){
        //agregar contexto a la lista si no existe
        let existe = this.quizService.contextos.find(c => c.id == pregunta2.contextoId);
        if(!existe){
          //construir contexto haciendo un llamado al backend
          this.PreguntaService.ObtenerContextoID(""+pregunta2.contextoId).subscribe(
            (data:RespuestaServerObtenerUNContexto ) => {
              if (data.CODIGO == 200) {
                //console.log(data.DATOS);
                //construir el contexto para mandarlo al servicio
                const contexto: Contexto = {
                  id: data.DATOS?.ID_CONTEXTO!,
                  nombre: data.DATOS?.NOM_CONTEXTO!,
                  descripcion: data.DATOS?.DESC_CONTEXTO!,
                  NombreArchivo: data.DATOS?.LINK_MEDIA!,
                  autor: data.DATOS?.AUTOR_CONTEXTO!,
                  tipoContexto: data.DATOS?.TIPO_CONTEXTO!,
                }
                this.quizService.addContexto2(contexto);
              } else {
                this.toast.error({ detail: 'ERROR', summary: data.MENSAJE!, duration: 5000, position: 'topCenter' });
              }
            });
        }
        this.toast.success({ detail: "Pregunta agregado correctamente", summary: 'Éxito', duration: 5000, position: 'topCenter' });
      } else {
        this.toast.error({ detail: "Error al agregar el Pregunta", summary: 'Error', duration: 5000, position: 'topCenter' });
      }
    }





}
