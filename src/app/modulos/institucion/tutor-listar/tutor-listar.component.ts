import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Tutor } from '../../../Modelos/tutor.modle';
import { MatTableDataSource } from '@angular/material/table';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { NgToastService } from 'ng-angular-popup';
import { InstitucionService } from '../../../servicios/institucion.service';
import { RespuestaServerObtenerTutores } from '../../../Modelos/RespuestaServerObtenerTutores.model';

@Component({
  selector: 'app-tutor-listar',
  templateUrl: './tutor-listar.component.html',
  styleUrl: './tutor-listar.component.css'
})
export class TutorListarComponent {



  displayedColumns: string[] = ['id', 'Nombre', 'Apellido','Direccion', 'telefono', 'Correo', 'id_area_evaluar','Acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Tutor>([]);

  constructor(
    private InstitucionServiceBackend: InstitucionBackendConectionService,
    private toast: NgToastService,
    private InstitucionServiceFrontend: InstitucionService,

  ) { }
  ngOnInit() {
    this.InstitucionServiceBackend.ObtenerTutores().subscribe(
      (data: RespuestaServerObtenerTutores) => {
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




  agregarEstudiante(tutor: Tutor) {
    console.log(tutor);
    let respuesta = this.InstitucionServiceFrontend.addTutor(tutor);
    if (respuesta) {
      this.toast.success({ detail: "Estudiante agregado correctamente", summary: 'Éxito', duration: 5000, position: 'topCenter' });
    } else {
      this.toast.error({ detail: "Error al agregar la Area Estudio", summary: 'Error', duration: 5000, position: 'topCenter' });
    }
  }

}
