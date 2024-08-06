import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';
import { NgToastService } from 'ng-angular-popup';
import { InstitucionService } from '../../../servicios/institucion.service';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';

@Component({
  selector: 'app-programa-estudio-eliminar',
  templateUrl: './programa-estudio-eliminar.component.html',
  styleUrl: './programa-estudio-eliminar.component.css'
})
export class ProgramaEstudioEliminarComponent {
  @Input() ProgramaID!: string;
  @Output() cerrarModal = new EventEmitter<void>();


  constructor(
    private router: Router,
    private InstitucionServiceBackend: InstitucionBackendConectionService,
    private toast: NgToastService,
    private InstitucionServiceFrondEnd: InstitucionService,

  ) { }

  ngOnInit(): void {

    console.log(this.ProgramaID) // Obtén el ID dela sede de la URL
    //console.log(this.contextoId);
    if (!this.ProgramaID || this.ProgramaID === ''  ||this.ProgramaID === '0') {
      // Maneja el caso en el que no se proporciona un ID de contexto
      this.router.navigate(['/institucion/control']);
      return;
      // Puedes mostrar un mensaje de error o redirigir a otra página
    }
  }

  EliminarProgramaEstudio() {
    this.InstitucionServiceBackend.EliminarProgramaEstudio(+this.ProgramaID).subscribe(
      (data : RespuestaServer) => {
        console.log(data);
        if (data.CODIGO == 200) {
          this.InstitucionServiceFrondEnd.eliminarPrograma_estudio(+this.ProgramaID);
          this.toast.success({ detail: "Programa Estudio eliminada correctamente", summary: 'Éxito', duration: 5000, position: 'topCenter' });
          this.router.navigate(['/institucion/control']);
          //cierra el modal del componente padre
          this.cerrarModal.emit(); // Emite el evento para cerrar el modal

        } else {
          this.toast.error({ detail: "Error al eliminar el Area Estudio, puede tener dependencias vinculadas", summary: data.MENSAJE, duration: 5000, position: 'topCenter' });
        }
      },
      (error) => {
        this.toast.error({ detail: "Error al eliminar el Area Estudio", summary: 'Error', duration: 5000, position: 'topCenter' });
      }
    );

  }

  volver() {
    this.router.navigate(['/institucion/control']);
    this.cerrarModal.emit(); // Emite el evento para cerrar el modal

  }



}
