import { Component } from '@angular/core';
import { Sede } from '../../../Modelos/sede.model';
import { AreaEstudio } from '../../../Modelos/areaestudio.model';
import { ProgramaEstudio } from '../../../Modelos/programaestudio.model';
import { GrupoEstudio } from '../../../Modelos/grupoestudio.model';
import { Estudiante } from '../../../Modelos/estudiante.model';
import { Tutor } from '../../../Modelos/tutor.modle';
import { InstitucionService } from '../../../servicios/institucion.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrl: './control.component.css'
})
export class ControlComponent {

  sedes: Sede[] = [];
  areas_estudio: AreaEstudio[] = [];
  programas_estudio: ProgramaEstudio[] = [];
  grupos_estudio: GrupoEstudio[] = [];
  estudiantes: Estudiante[] = [];
  tutores: Tutor[] = [];


  showSedeModal = false;
  showSedeEditModal = false;
  showSedeEliminarModal = false;
  showSedeListaModal = false;

  showAreaModal = false;
  showAreaEditModal = false;
  showAreaEliminarModal = false;
  showAreaListaModal = false;

  showProgramaModal = false;
  showProgramaEditModal = false;
  showProgramaEliminarModal = false;
  showProgramaListaModal = false;
  showProgramaPreviewModal = false;

  showGrupoModal = false;
  showGrupoEditModal = false;
  showGrupoEliminarModal = false;
  showGrupoListaModal = false;

  showEstudianteModal = false;
  showEstudianteEditModal = false;
  showEstudianteEliminarModal = false;
  showEstudianteListaModal = false;

  showTutorModal = false;
  showTutorEditModal = false;
  showTutorEliminarModal = false;
  showTutorListaModal = false;



  tuIdDeSede = ''; // El ID del sede que quieres editar
  tuIdDeArea = ''; // El ID de la area que quieres editar
  tuIdDePrograma = ''; // El ID de la programa que quieres editar
  tuIdDeGrupo = ''; // El ID de la pregunta que quieres editar
  tuIdDeEstudiante = ''; // El ID del estudiante que quieres editar
  tuIdDeTutor = ''; // El ID del tutor que quieres editar




  constructor(
    private InstitucionService: InstitucionService,
    private toast: NgToastService,
  ) { }

  ngOnInit(): void {
    this.sedes = this.InstitucionService.getSedes();
    this.areas_estudio = this.InstitucionService.getAreas_estudio();
    this.programas_estudio = this.InstitucionService.getProgramas_estudio();
    this.grupos_estudio = this.InstitucionService.getGrupos_estudio();
    this.estudiantes = this.InstitucionService.getEstudiantes();
    this.tutores = this.InstitucionService.getTutores();
  }











  //----------------------SEDES-----------------------------------------------------------------------------------------------------------------------

  editarSede(id_sede: number) {
    let id_sede_string = id_sede.toString()
    this.tuIdDeSede = id_sede_string;
    this.showSedeEditModal = true;
  }
  eliminarSede(id_sede: number) {
    let id_sede_string = id_sede.toString()
    this.tuIdDeSede = id_sede_string;
    this.showSedeEliminarModal = true;
  }
  eliminarSedeLista(id_sede: number) {
    let id_sede_string = id_sede.toString()
    if (id_sede_string === '0' || id_sede_string === '') {
      this.toast.warning({detail:"ADVERTENCIA",summary:'ACCESO DENEGADO',duration:5000, position: 'topCenter'});
      return;
    }
    this.InstitucionService.eliminarSede(id_sede);
  }
  agregarSede() {
    this.showSedeModal = true;
  }
  listarSede() {
    this.showSedeListaModal = true;
  }

  closeSedeForm() {
    this.showSedeModal = false;
  }
  closeSedeListaForm() {
    this.showSedeListaModal = false;
  }
  closeSedeEditForm() {
    this.showSedeEditModal = false;
  }
  closeSedeEliminarForm() {
    this.showSedeEliminarModal = false;
  }

  //----------------------AREAS-----------------------------------------------------------------------------------------------------------------------

  editarArea(id_area: number) {
    let id_area_string = id_area.toString()
    this.tuIdDeArea = id_area_string;
    this.showAreaEditModal = true;
  }
  eliminarArea(id_area: number) {
    let id_area_string = id_area.toString()
    this.tuIdDeArea = id_area_string;
    this.showAreaEliminarModal = true;
  }
  eliminarAreaLista(id_area: number) {
    let id_area_estudio_string = id_area.toString()
    if (id_area_estudio_string === '0' || id_area_estudio_string === '') {
      this.toast.warning({detail:"ADVERTENCIA",summary:'ACCESO DENEGADO',duration:5000, position: 'topCenter'});
      return;
    }
    this.InstitucionService.eliminarArea_estudio(id_area);
  }
  agregarArea() {
    this.showAreaModal = true;
  }
  listarArea() {
    this.showAreaListaModal = true;
  }

  closeAreaForm() {
    this.showAreaModal = false;
  }
  closeAreaListaForm() {
    this.showAreaListaModal = false;
  }
  closeAreaEditForm() {
    this.showAreaEditModal = false;
  }
  closeAreaEliminarForm() {
    this.showAreaEliminarModal = false;
  }

  //----------------------PROGRAMAS-----------------------------------------------------------------------------------------------------------------------

  editarPrograma(id_programa: number) {
    let id_programa_string = id_programa.toString()
    this.tuIdDePrograma = id_programa_string;
    this.showProgramaEditModal = true;
  }
  eliminarPrograma(id_programa: number) {
    let id_programa_string = id_programa.toString()
    this.tuIdDePrograma = id_programa_string;
    this.showProgramaEliminarModal = true;
  }
  eliminarProgramaLista(id_programa: number) {
    let id_programa_estudio_string = id_programa.toString()
    if (id_programa_estudio_string === '0' || id_programa_estudio_string === '') {
      this.toast.warning({detail:"ADVERTENCIA",summary:'ACCESO DENEGADO',duration:5000, position: 'topCenter'});
      return;
    }
    this.InstitucionService.eliminarPrograma_estudio(id_programa);

  }
  agregarPrograma() {
    this.showProgramaModal = true;
  }
  listarPrograma() {
    this.showProgramaListaModal = true;
  }
  previewPrograma() {
    this.showProgramaPreviewModal = true;
  }

  closeProgramaForm() {
    this.showProgramaModal = false;
  }
  closeProgramaListaForm() {
    this.showProgramaListaModal = false;
  }
  closeProgramaEditForm() {
    this.showProgramaEditModal = false;
  }
  closeProgramaEliminarForm() {
    this.showProgramaEliminarModal = false;
  }
  closeProgramaPreviewForm() {
    this.showProgramaPreviewModal = false;
  }

  //----------------------GRUPOS-----------------------------------------------------------------------------------------------------------------------

  editarGrupo(id_grupo: number) {
    let id_grupo_string = id_grupo.toString()
    this.tuIdDeGrupo = id_grupo_string;
    this.showGrupoEditModal = true;
  }
  eliminarGrupo(id_grupo: number) {
    let id_grupo_string = id_grupo.toString()
    this.tuIdDeGrupo = id_grupo_string;
    this.showGrupoEliminarModal = true;
  }
  eliminarGrupoLista(id_grupo: number) {
    let id_grupo_estudio_string = id_grupo.toString()
    if (id_grupo_estudio_string === '0' || id_grupo_estudio_string === '') {
      this.toast.warning({detail:"ADVERTENCIA",summary:'ACCESO DENEGADO',duration:5000, position: 'topCenter'});
      return;
    }
    this.InstitucionService.eliminarGrupo_estudio(id_grupo);
  }
  agregarGrupo() {
    this.showGrupoModal = true;
  }
  listarGrupo() {
    this.showGrupoListaModal = true;
  }

  closeGrupoForm() {
    this.showGrupoModal = false;
  }
  closeGrupoListaForm() {
    this.showGrupoListaModal = false;
  }
  closeGrupoEditForm() {
    this.showGrupoEditModal = false;
  }
  closeGrupoEliminarForm() {
    this.showGrupoEliminarModal = false;
  }

  //----------------------ESTUDIANTES-----------------------------------------------------------------------------------------------------------------------

  editarEstudiante(id_estudiante: number) {
    let id_estudiante_string = id_estudiante.toString()
    this.tuIdDeEstudiante = id_estudiante_string;
    this.showEstudianteEditModal = true;
  }
  eliminarEstudiante(id_estudiante: number) {
    let id_estudiante_string = id_estudiante.toString()
    this.tuIdDeEstudiante = id_estudiante_string;
    this.showEstudianteEliminarModal = true;
  }
  eliminarEstudianteLista(id_estudiante: number) {
    this.showEstudianteListaModal = true;
  }
  agregarEstudiante() {
    this.showEstudianteModal = true;
  }

  listarEstudiante() {
    this.showEstudianteListaModal = true;
  }

  closeEstudianteForm() {
    this.showEstudianteModal = false;
  }
  closeEstudianteListaForm() {
    this.showEstudianteListaModal = false;
  }
  closeEstudianteEditForm() {
    this.showEstudianteEditModal = false;
  }
  closeEstudianteEliminarForm() {
    this.showEstudianteEliminarModal = false;
  }

  //----------------------TUTORES-----------------------------------------------------------------------------------------------------------------------

  editarTutor(id_tutor: number) {
    let id_tutor_string = id_tutor.toString()
    this.tuIdDeTutor = id_tutor_string;
    this.showTutorEditModal = true;
  }
  eliminarTutor(id_tutor: number) {
    let id_tutor_string = id_tutor.toString()
    this.tuIdDeTutor = id_tutor_string;
    this.showTutorEliminarModal = true;
  }
  eliminarTutorLista(id_tutor: number) {
    this.showTutorListaModal = true;
  }
  agregarTutor() {
    this.showTutorModal = true;
  }
  listarTutor() {
    this.showTutorListaModal = true;
  }

  closeTutorForm() {
    this.showTutorModal = false;
  }
  closeTutorListaForm() {
    this.showTutorListaModal = false;
  }
  closeTutorEditForm() {
    this.showTutorEditModal = false;
  }
  closeTutorEliminarForm() {
    this.showTutorEliminarModal = false;
  }








}
