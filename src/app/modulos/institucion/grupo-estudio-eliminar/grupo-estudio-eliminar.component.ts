import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { NgToastService } from 'ng-angular-popup';
import { InstitucionService } from '../../../servicios/institucion.service';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';

@Component({
  selector: 'app-grupo-estudio-eliminar',
  templateUrl: './grupo-estudio-eliminar.component.html',
  styleUrl: './grupo-estudio-eliminar.component.css'
})
export class GrupoEstudioEliminarComponent {
  @Input() GrupoID!: string;
  @Output() cerrarModal = new EventEmitter<void>();


  constructor(
    private router: Router,
    private InstitucionServiceBackend: InstitucionBackendConectionService,
    private toast: NgToastService,
    private InstitucionServiceFrondEnd: InstitucionService,

  ) { }

  ngOnInit(): void {

    console.log(this.GrupoID) // Obtén el ID dela sede de la URL
    //console.log(this.contextoId);
    if (!this.GrupoID || this.GrupoID === ''  ||this.GrupoID === '0') {
      // Maneja el caso en el que no se proporciona un ID de contexto
      this.router.navigate(['/institucion/control']);
      return;
      // Puedes mostrar un mensaje de error o redirigir a otra página
    }
  }

  EliminarProgramaEstudio() {
    this.InstitucionServiceBackend.EliminarGrupoEstudio(+this.GrupoID).subscribe(
      (data : RespuestaServer) => {
        console.log(data);
        if (data.CODIGO == 200) {
          this.InstitucionServiceFrondEnd.eliminarGrupo_estudio(+this.GrupoID);
          this.toast.success({ detail: "Grupo Estudio eliminada correctamente", summary: 'Éxito', duration: 5000, position: 'topCenter' });
          this.router.navigate(['/institucion/control']);
          //cierra el modal del componente padre
          this.cerrarModal.emit(); // Emite el evento para cerrar el modal

        } else {
          this.toast.error({ detail: "Error al eliminar el Grupo Estudio, puede tener dependencias vinculadas", summary: data.MENSAJE, duration: 5000, position: 'topCenter' });
        }
      },
      (error) => {
        this.toast.error({ detail: "Error al eliminar el Grupo Estudio", summary: 'Error', duration: 5000, position: 'topCenter' });
      }
    );

  }

  volver() {
    this.router.navigate(['/institucion/control']);
    this.cerrarModal.emit(); // Emite el evento para cerrar el modal

  }





}
