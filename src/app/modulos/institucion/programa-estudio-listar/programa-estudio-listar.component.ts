import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProgramaEstudio } from '../../../Modelos/programaestudio.model';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { NgToastService } from 'ng-angular-popup';
import { InstitucionService } from '../../../servicios/institucion.service';
import { RespuestaServerObtenerProgramasEstudios } from '../../../Modelos/RespuestaServerObtenerProgramasEstudios.model';
import { RespuestaServerObtenerAreaEstudio } from '../../../Modelos/RespuestaServerObtenerAreaEstudio.model';
import { RespuestaServerObtenerSede } from '../../../Modelos/RespuestaServerObtenerSede.model';

@Component({
  selector: 'app-programa-estudio-listar',
  templateUrl: './programa-estudio-listar.component.html',
  styleUrl: './programa-estudio-listar.component.css'
})
export class ProgramaEstudioListarComponent {

  displayedColumns: string[] = ['id', 'Nombre', 'Descripcion','tipo_formacion', 'id_area_estudio','Acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<ProgramaEstudio>([]);

  constructor(
    private InstitucionServiceBackend: InstitucionBackendConectionService,
    private toast: NgToastService,
    private InstitucionServiceFrontend: InstitucionService,

  ) { }
  ngOnInit() {
    this.InstitucionServiceBackend.ObtenerProgramasEstudios().subscribe(
      (data: RespuestaServerObtenerProgramasEstudios) => {
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




    agregarProgramaEstudio( programa_estudio: ProgramaEstudio) {
      console.log(programa_estudio);
      let respuesta=this.InstitucionServiceFrontend.addPrograma_estudio(programa_estudio);
      if(respuesta){
        //consultar si la Area Estudio se ya esta agregada a la lista de sede del servicio InstitucionService
        let existeArea = this.InstitucionServiceFrontend.Areas_estudio.find(a => a.ID_AREA_ESTUDIO == programa_estudio.ID_AREA_ESTUDIO);
        if (!existeArea) {
          //obtener la sede de la base de datos
          this.InstitucionServiceBackend.ObtenerAreaEstudioID(""+programa_estudio.ID_AREA_ESTUDIO).subscribe(
            (data: RespuestaServerObtenerAreaEstudio) => {
              if (data.CODIGO == 200) {
                let AreaEstudio = data.DATOS;
                this.InstitucionServiceFrontend.addArea_estudio(AreaEstudio!);
                //consultar si la sede se ya esta agregada a la lista de sede del servicio InstitucionService
                let existeSede = this.InstitucionServiceFrontend.Sedes.find(s => s.ID_SEDE == AreaEstudio?.ID_SEDE);
                if (!existeSede) {
                  //obtener la sede de la base de datos
                  this.InstitucionServiceBackend.ObtenerSedeID(""+AreaEstudio?.ID_SEDE).subscribe(
                    (data: RespuestaServerObtenerSede) => {
                      if (data.CODIGO == 200) {
                        let sede = data.DATOS;
                        this.InstitucionServiceFrontend.addSede(sede!);
                      }
                    });
                  }
              }
            });
        }
        this.toast.success({ detail: "Area Estudio agregado correctamente", summary: 'Éxito', duration: 5000, position: 'topCenter' });
      } else {
        this.toast.error({ detail: "Error al agregar la Area Estudio", summary: 'Error', duration: 5000, position: 'topCenter' });
      }
    }



}
