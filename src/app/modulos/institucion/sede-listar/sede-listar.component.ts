import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sede } from '../../../Modelos/sede.model';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { NgToastService } from 'ng-angular-popup';
import { InstitucionService } from '../../../servicios/institucion.service';
import { RespuestaServerObtenerSedes } from '../../../Modelos/RespuestaServerObtenerSedes.model';

@Component({
  selector: 'app-sede-listar',
  templateUrl: './sede-listar.component.html',
  styleUrl: './sede-listar.component.css'
})
export class SedeListarComponent {

  displayedColumns: string[] = ['id', 'Nombre', 'Direccion', 'Telefono', 'Correo_Encargado','ID_INSTITUCIÓN','Acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Sede>([]);

  constructor(
    private InstitucionServiceBackend: InstitucionBackendConectionService,
    private toast: NgToastService,
    private InstitucionServiceFrontend: InstitucionService,

  ) { }
  ngOnInit() {
    this.InstitucionServiceBackend.ObtenerSedes().subscribe(
      (data: RespuestaServerObtenerSedes) => {
        console.log(data);
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




    agregarSede( sede: Sede) {
      let respuesta=this.InstitucionServiceFrontend.addSede(sede);
      if(respuesta){
        this.toast.success({ detail: "Sede agregado correctamente", summary: 'Éxito', duration: 5000, position: 'topCenter' });
      } else {
        this.toast.error({ detail: "Error al agregar la Sede", summary: 'Error', duration: 5000, position: 'topCenter' });
      }
    }







}
