import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AreaEstudio } from '../../../Modelos/areaestudio.model';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { NgToastService } from 'ng-angular-popup';
import { InstitucionService } from '../../../servicios/institucion.service';
import { RespuestaServerObtenerAreasEstudios } from '../../../Modelos/RespuestaServerObtenerAreasEstudios.model';
import { RespuestaServerObtenerSede } from '../../../Modelos/RespuestaServerObtenerSede.model';

@Component({
  selector: 'app-area-estudio-listar',
  templateUrl: './area-estudio-listar.component.html',
  styleUrl: './area-estudio-listar.component.css'
})
export class AreaEstudioListarComponent {


  displayedColumns: string[] = ['id', 'Nombre', 'Descripcion', 'id_sede','Acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<AreaEstudio>([]);

  constructor(
    private InstitucionServiceBackend: InstitucionBackendConectionService,
    private toast: NgToastService,
    private InstitucionServiceFrontend: InstitucionService,

  ) { }
  ngOnInit() {
    this.InstitucionServiceBackend.ObtenerAreasEstudios().subscribe(
      (data: RespuestaServerObtenerAreasEstudios) => {
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




    agregarSede( area_estudio: AreaEstudio) {
      let respuesta=this.InstitucionServiceFrontend.addArea_estudio(area_estudio);
      if(respuesta){
        //consultar si la sede se ya esta agregada a la lista de sede del servicio InstitucionService
        let existe = this.InstitucionServiceFrontend.Sedes.find(s => s.ID_SEDE == area_estudio.ID_SEDE);
        if (!existe) {
          //obtener la sede de la base de datos
          this.InstitucionServiceBackend.ObtenerSedeID(""+area_estudio.ID_SEDE).subscribe(
            (data: RespuestaServerObtenerSede) => {
              if (data.CODIGO == 200) {
                let sede = data.DATOS;
                this.InstitucionServiceFrontend.addSede(sede!);
              }
            });
        }
        this.toast.success({ detail: "Area Estudio agregado correctamente", summary: 'Éxito', duration: 5000, position: 'topCenter' });
      } else {
        this.toast.error({ detail: "Error al agregar la Area Estudio", summary: 'Error', duration: 5000, position: 'topCenter' });
      }
    }





}
