import { Component, ViewChild } from '@angular/core';
//para poder usar esta lista necesitamos instalar ng add @angular/material
//y tambien importarlos en el modulo que estemos usando. en este caso en prueba.module.ts

import { MatPaginator } from '@angular/material/paginator';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { RespuestaServerObtenerContextos } from '../../../Modelos/RespuestaServerObtenerContextos.model';
import { NgToastService } from 'ng-angular-popup';
import { MatTableDataSource } from '@angular/material/table';

import { Contextos } from '../../../Modelos/Contextos.model';
import { QuizService } from '../../../servicios/quiz.service';
import { Contexto } from '../../../Modelos/contexto.model';

@Component({
  selector: 'app-context-lista',
  templateUrl: './context-lista.component.html',
  styleUrl: './context-lista.component.css'
})
export class ContextListaComponent {
  displayedColumns: string[] = ['id', 'Nombre', 'Descripcion', 'Autor', 'Archivo','Acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Contextos>([]);

  constructor(
    private contextoService: PreguntaService,
    private toast: NgToastService,
    private quizService: QuizService,

  ) { }
  ngOnInit() {
    this.contextoService.ObtenerContextos().subscribe(
      (data: RespuestaServerObtenerContextos) => {
        //console.log(data);
        if (data.CODIGO == 200) {
          //console.log(data.DATOS);
          this.dataSource = new MatTableDataSource(data.DATOS);
          this.dataSource.paginator = this.paginator;


        } else {
          this.toast.error({ detail: "Error al obtener los contextos", summary: 'Error', duration: 5000, position: 'topCenter' });
        }
      });
    }



    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }




    agregarContexto( context: Contextos) {
      const context2 : Contexto = {
        id: context.ID_CONTEXTO!,
        nombre: context.NOM_CONTEXTO!,
        descripcion: context.DESC_CONTEXTO!,
        autor: context.AUTOR_CONTEXTO!,
        NombreArchivo: context.LINK_MEDIA,
      }
      let respuesta=this.quizService.addContexto2(context2);
      if(respuesta){
        this.toast.success({ detail: "Contexto agregado correctamente", summary: 'Éxito', duration: 5000, position: 'topCenter' });
      } else {
        this.toast.error({ detail: "Error al agregar el contexto", summary: 'Error', duration: 5000, position: 'topCenter' });
      }
    }









}
