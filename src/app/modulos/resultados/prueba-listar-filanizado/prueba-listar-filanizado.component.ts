import { Component, ViewChild } from '@angular/core';
import { prueba } from '../../../Modelos/prueba.model';
import { MatTableDataSource } from '@angular/material/table';
import { RespuestaServerObtenerPruebas } from '../../../Modelos/RespuestaServerObtenerPruebas.model';
import { PruebaControllService } from '../../../servicios/prueba-controll.service';
import { PruebaService } from '../../../servicios/prueba.service';
import { NgToastService } from 'ng-angular-popup';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-prueba-listar-filanizado',
  templateUrl: './prueba-listar-filanizado.component.html',
  styleUrl: './prueba-listar-filanizado.component.css'
})
export class PruebaListarFilanizadoComponent {

  displayedColumns: string[] = ['id', 'Nombre', 'Descripcion', 'TIPO_PRUEBA','Acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<prueba>([]);

  constructor(
    private toast: NgToastService,
    private pruebaControllService: PruebaControllService,
    private PruebaService: PruebaService

  ) { }
  ngOnInit() {
    this.PruebaService.ObtenerPruebasFinalizadas().subscribe(
      (data: RespuestaServerObtenerPruebas) => {
        console.log(data);
        if (data.CODIGO == 200) {
          //console.log(data.DATOS);
          this.dataSource = new MatTableDataSource(data.DATOS);
          this.dataSource.paginator = this.paginator;


        } else {
          this.toast.error({ detail: "Error al obtener los Estudiantes", summary: 'Error', duration: 5000, position: 'topCenter' });
        }
      });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  agregarPrueba(prueba: prueba) {
    console.log(prueba);
    let respuesta = this.pruebaControllService.addPrueba(prueba);
    if (respuesta) {
        this.toast.success({ detail: "prueba agregado correctamente", summary: 'Éxito', duration: 5000, position: 'topCenter' });
    } else {
      this.toast.error({ detail: "Error al agregar la prueba", summary: 'Error', duration: 5000, position: 'topCenter' });
    }
  }

}
