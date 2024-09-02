import { Component } from '@angular/core';
import { InstitucionService } from '../../../servicios/institucion.service';
import { NgToastService } from 'ng-angular-popup';
import { Estudiante } from '../../../Modelos/estudiante.model';
import { GrupoEstudio } from '../../../Modelos/grupoestudio.model';
import { prueba } from '../../../Modelos/prueba.model';
import { PruebaControllService } from '../../../servicios/prueba-controll.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrl: './control.component.css'
})
export class ControlComponent {


  grupos_estudio: GrupoEstudio[] = [];
  estudiantes: Estudiante[] = [];
  pruebas: prueba[] = [];



  showPruebaGenericaModal = false;
  showPruebaListaModal = false;

  showGrupoListaModal = false;
  showGrupoMatricularModal = false;

  showEstudianteListaModal = false;
  showEstudianteMatricularModal = false;



  tuIdPrueba = ''; // El ID de la prueba que quieres editar
  tuIdDeGrupo = ''; // El ID de la pregunta que quieres editar
  tuIdDeEstudiante = ''; // El ID del estudiante que quieres editar




  constructor(
    private InstitucionService: InstitucionService,
    private toast: NgToastService,
    private PruebaControllService: PruebaControllService,
    private Router: Router
  ) { }

  ngOnInit(): void {

    this.grupos_estudio = this.InstitucionService.getGrupos_estudio();
    this.estudiantes = this.InstitucionService.getEstudiantes();
    this.pruebas = this.PruebaControllService.getPruebas();
  }



  //----------------------PRUEBA-----------------------------------------------------------------------------------------------------------------------

  CrearPruebaGenerica() {
    this.showPruebaGenericaModal = true;
  }


  closePruebaGenericaForm() {
    this.showPruebaGenericaModal = false;
  }

  eliminarPruebaLista(id_prueba: number) {
    let id_prueba_string = id_prueba.toString()
    if (id_prueba_string === '0' || id_prueba_string === '') {
      this.toast.warning({detail:"ADVERTENCIA",summary:'ACCESO DENEGADO',duration:5000, position: 'topCenter'});
      return;
    }
    this.PruebaControllService.eliminarPrueba(id_prueba);
  }

  listarPrueba() {
    this.showPruebaListaModal = true;
  }


  closePruebaListaForm() {
    this.showPruebaListaModal = false;
  }

  previewprueba(id_prueba: number) {
    let id_prueba_string = id_prueba.toString()
    this.tuIdPrueba = id_prueba_string;
    //cambiar a la pagina de vista previa de la prueba
    this.Router.navigate(['/prueba/previerPrueba', id_prueba_string]);
  }



  //----------------------GRUPOS-----------------------------------------------------------------------------------------------------------------------






  eliminarGrupoLista(id_grupo: number) {
    let id_grupo_estudio_string = id_grupo.toString()
    if (id_grupo_estudio_string === '0' || id_grupo_estudio_string === '') {
      this.toast.warning({detail:"ADVERTENCIA",summary:'ACCESO DENEGADO',duration:5000, position: 'topCenter'});
      return;
    }
    this.InstitucionService.eliminarGrupo_estudio(id_grupo);
  }

  listarGrupo() {
    this.showGrupoListaModal = true;
  }


  closeGrupoListaForm() {
    this.showGrupoListaModal = false;
  }
  closeGrupoMatricularModal() {
    this.showGrupoMatricularModal = false;
  }

  MatricularGrupo(id_grupo: number) {
    let id_grupo_string = id_grupo.toString()
    this.tuIdDeGrupo = id_grupo_string;
    this.showGrupoMatricularModal = true;
  }



  //----------------------ESTUDIANTES-----------------------------------------------------------------------------------------------------------------------


  eliminarEstudianteLista(id_estudiante: string) {
    let id_estudiante_string = id_estudiante.toString()
    if (id_estudiante_string === '0' || id_estudiante_string === '') {
      this.toast.warning({detail:"ADVERTENCIA",summary:'ACCESO DENEGADO',duration:5000, position: 'topCenter'});
      return;
    }
    this.InstitucionService.eliminarEstudiante(id_estudiante);  }


  listarEstudiante() {
    this.showEstudianteListaModal = true;
  }


  closeEstudianteListaForm() {
    this.showEstudianteListaModal = false;
  }

  closeEstudianteMatricularModal() {
    this.showEstudianteMatricularModal = false;
  }

  MatricularEstudiante(id_estudiante: string) {
    let id_estudiante_string = id_estudiante.toString()
    this.tuIdDeEstudiante = id_estudiante_string;
    this.showEstudianteMatricularModal = true;
  }



}
