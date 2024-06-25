import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Opciones } from '../../../Modelos/Opciones.model';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { NgToastService } from 'ng-angular-popup';
import { QuizService } from '../../../servicios/quiz.service';
import { RespuestaServerObtenerOpciones } from '../../../Modelos/RespuestaServerObtenerOpciones.model';
import { Opcion } from '../../../Modelos/opcion.model';
import { RespuestaServerObtenerUNAPregunta } from '../../../Modelos/RespuestaServerObtenerUNAPregunta.model';
import { Pregunta } from '../../../Modelos/pregunta.model';
import { RespuestaServerObtenerUNContexto } from '../../../Modelos/RespuestaServerObtenerUNContexto.model';
import { Contexto } from '../../../Modelos/contexto.model';

@Component({
  selector: 'app-opcion-lista',
  templateUrl: './opcion-lista.component.html',
  styleUrl: './opcion-lista.component.css'
})
export class OpcionListaComponent {

  displayedColumns: string[] = ['id','PreguntaID', 'Enunciado', 'Respuesta', 'Archivo', 'Tipo_opcion','Acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Opciones>([]);

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
    this.PreguntaService.ObtenerOpciones().subscribe(
      (data:RespuestaServerObtenerOpciones ) => {
        if (data.CODIGO == 200) {
          this.dataSource = new MatTableDataSource(data.DATOS);
          this.dataSource.paginator = this.paginator;

          // Personalizar la función de filtro
          this.dataSource.filterPredicate = (data: Opciones, filter: string) => {
            // Aquí puedes especificar los campos por los que quieres filtrar
            const dataStr = data.ID_OPCION!.toString() + data.ID_PREGUNTA!.toString() +data.TEXTO_OPCION! +data.TIPO_OPCION!;
            return dataStr.trim().toLowerCase().includes(filter);
          };
        } else {
          this.toast.error({ detail: 'ERROR', summary: data.MENSAJE!, duration: 5000, position: 'topCenter' });
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  agregarOpcion(opcion: Opciones) {
    //construir la opcion para mandarla al servicio
    //esta constante no es del mismo tipo que el parametro que recibe la funcion el parametro es Opciones y la constante es Opcion
    const opcion2: Opcion = {
        id: opcion.ID_OPCION!,
        preguntaId: opcion.ID_PREGUNTA!,
        texto: opcion.TEXTO_OPCION!,
        esCorrecta: opcion.ES_CORRECTA!,
        imagen_opcion: opcion.IMAGEN_OPCION!,
        tipo_opcion: opcion.TIPO_OPCION!,
    }
    let respuesta = this.quizService.addOpcion2(opcion2);
    if (respuesta) {
        //Agregar Pregunta a la lista si no existe
        let existe = this.quizService.preguntas.find(p => p.id == opcion2.preguntaId);
        if (!existe) {
            //construir pregunta haciendo un llamado al backend
            this.PreguntaService.ObtenerPreguntaID("" + opcion2.preguntaId).subscribe(
                (data: RespuestaServerObtenerUNAPregunta) => {
                    if (data.CODIGO == 200) {
                        //console.log(data.DATOS);
                        //construir la pregunta para mandarla al servicio
                        let NombreTipoPregunta = this.ListaTiposPreguntas.find(x => x.id == data.DATOS?.TIPO_PREGUNTA!)?.nombre;
                        //esta constante no es del mismo tipo que el parametro que recibe la funcion el parametro es Preguntas y la constante es Pregunta
                        const pregunta: Pregunta = {
                            id: data.DATOS?.ID_PREGUNTA!,
                            contextoId: data.DATOS?.ID_CONTEXTO!,
                            enunciado: data.DATOS?.ENUNCIADO_PREGUNTA!,
                            tipo: data.DATOS?.TIPO_PREGUNTA!,
                            tipo_nombre: NombreTipoPregunta,
                            puntaje: data.DATOS?.PUNTAJE_PREGUNTA!,
                            autor: data.DATOS?.AUTOR_PREGUNTA!,
                            Area_Evaluar: data.DATOS?.ID_AREA_EVALUAR!,
                            Area_Evaluar_nombre: data.DATOS?.NOMBRE_AREA_EVALUAR!,
                            Tema_Evaluar: data.DATOS?.ID_TEMA_AREA!,
                            Tema_Evaluar_nombre: data.DATOS?.NOMBRE_TEMA_AREA!,
                            imagen_pregunta: data.DATOS?.IMAGEN_PREGUNTA!,
                            tipo_pregunta_contenido: data.DATOS?.TIPO_PREGUNTA_CONTENIDO!,
                            layout_pregunta: data.DATOS?.LAYOUT_PREGUNTA!,
                        }
                        this.quizService.addPregunta2(pregunta);
                        //agregar contexto a la lista si no existe
                        let existe2 = this.quizService.contextos.find(c => c.id == pregunta.contextoId);
                        if (!existe2) {
                            //construir contexto haciendo un llamado al backend
                            this.PreguntaService.ObtenerContextoID("" + pregunta.contextoId).subscribe(
                                (data: RespuestaServerObtenerUNContexto) => {
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
                                }
                            )
                        }
                    } else {
                        this.toast.error({ detail: 'ERROR', summary: data.MENSAJE!, duration: 5000, position: 'topCenter' });
                    }
                });
        }
        this.toast.success({ detail: "opcion agregada correctamente", summary: 'Éxito', duration: 5000, position: 'topCenter' });
    } else {
        this.toast.error({ detail: "Error al agregar el opcion", summary: 'Error', duration: 5000, position: 'topCenter' });
    }
}



}
