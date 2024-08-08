import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Estudiante } from '../../../Modelos/estudiante.model';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { NgToastService } from 'ng-angular-popup';
import { InstitucionService } from '../../../servicios/institucion.service';
import { RespuestaServerObtenerEstudiantes } from '../../../Modelos/RespuestaServerObtenerEstudiantes.model';
import { RespuestaServerObtenerGrupoEstudio } from '../../../Modelos/RespuestaServerObtenerGrupoEstudio.model';
import { RespuestaServerObtenerProgramaEstudio } from '../../../Modelos/RespuestaServerObtenerProgramaEstudio.model';
import { RespuestaServerObtenerAreaEstudio } from '../../../Modelos/RespuestaServerObtenerAreaEstudio.model';
import { RespuestaServerObtenerSede } from '../../../Modelos/RespuestaServerObtenerSede.model';

@Component({
  selector: 'app-estudiante-listar',
  templateUrl: './estudiante-listar.component.html',
  styleUrl: './estudiante-listar.component.css'
})
export class EstudianteListarComponent {



  displayedColumns: string[] = ['id', 'Nombre', 'Direccion', 'telefono', 'Correo', 'id_grupo','tipo_doc','Acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Estudiante>([]);

  constructor(
    private InstitucionServiceBackend: InstitucionBackendConectionService,
    private toast: NgToastService,
    private InstitucionServiceFrontend: InstitucionService,

  ) { }
  ngOnInit() {
    this.InstitucionServiceBackend.ObtenerEstudiantes().subscribe(
      (data: RespuestaServerObtenerEstudiantes) => {
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




  agregarEstudiante(estudiante: Estudiante) {
    console.log(estudiante);
    let respuesta = this.InstitucionServiceFrontend.addEstudiante(estudiante);
    if (respuesta) {
      //consultar si el grupo de estudio se ya esta agregado a la lista de sede del servicio InstitucionService
      let existeGrupo = this.InstitucionServiceFrontend.Grupos_estudio.find(g => g.ID_GRUPO_ESTUDIO == estudiante.ID_GRUPO_ESTUDIO);
      if (!existeGrupo) {
        //obtener el grupo de estudio de la base de datos
        this.InstitucionServiceBackend.ObtenerGrupoEstudioID("" + estudiante.ID_GRUPO_ESTUDIO).subscribe(
          (data: RespuestaServerObtenerGrupoEstudio) => {
            if (data.CODIGO == 200) {
              let grupo_estudio = data.DATOS;
              this.InstitucionServiceFrontend.addGrupo_estudio(grupo_estudio!);
              //consultar si el programa de estudio se ya esta agregado a la lista de sede del servicio InstitucionService
              let existePrograma = this.InstitucionServiceFrontend.Programas_estudio.find(p => p.ID_PROGRAMA_ESTUDIO == grupo_estudio?.ID_PROGRAMA_ESTUDIO);
              if (!existePrograma) {
                //obtener el programa de la base de datos
                this.InstitucionServiceBackend.ObtenerProgramaEstudioID("" + grupo_estudio?.ID_PROGRAMA_ESTUDIO).subscribe(
                  (data: RespuestaServerObtenerProgramaEstudio) => {
                    if (data.CODIGO == 200) {
                      let programa_estudio = data.DATOS;
                      this.InstitucionServiceFrontend.addPrograma_estudio(programa_estudio!);
                      //consultar si la Area Estudio se ya esta agregada a la lista de sede del servicio InstitucionService
                      let existeArea = this.InstitucionServiceFrontend.Areas_estudio.find(a => a.ID_AREA_ESTUDIO == programa_estudio?.ID_AREA_ESTUDIO);
                      if (!existeArea) {
                        //obtener la sede de la base de datos
                        this.InstitucionServiceBackend.ObtenerAreaEstudioID("" + programa_estudio?.ID_AREA_ESTUDIO).subscribe(
                          (data: RespuestaServerObtenerAreaEstudio) => {
                            if (data.CODIGO == 200) {
                              let AreaEstudio = data.DATOS;
                              this.InstitucionServiceFrontend.addArea_estudio(AreaEstudio!);
                              //consultar si la sede se ya esta agregada a la lista de sede del servicio InstitucionService
                              let existeSede = this.InstitucionServiceFrontend.Sedes.find(s => s.ID_SEDE == AreaEstudio?.ID_SEDE);
                              if (!existeSede) {
                                //obtener la sede de la base de datos
                                this.InstitucionServiceBackend.ObtenerSedeID("" + AreaEstudio?.ID_SEDE).subscribe(
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

                    }


                  }
                );
              }
            }
          });
      }
      this.toast.success({ detail: "Estudiante agregado correctamente", summary: 'Éxito', duration: 5000, position: 'topCenter' });
    } else {
      this.toast.error({ detail: "Error al agregar la Area Estudio", summary: 'Error', duration: 5000, position: 'topCenter' });
    }
  }


}
