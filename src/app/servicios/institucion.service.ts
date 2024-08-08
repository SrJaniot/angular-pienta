import { Injectable } from '@angular/core';
import { Sede } from '../Modelos/sede.model';
import { AreaEstudio } from '../Modelos/areaestudio.model';
import { ProgramaEstudio } from '../Modelos/programaestudio.model';
import { GrupoEstudio } from '../Modelos/grupoestudio.model';
import { Estudiante } from '../Modelos/estudiante.model';
import { Tutor } from '../Modelos/tutor.modle';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {
  //Variables para almacenar los datos de las diferentes items de la institucion
  public Sedes: Sede[] = [];
  public Areas_estudio: AreaEstudio[] = [];
  public Programas_estudio: ProgramaEstudio[] = [];
  public Grupos_estudio: GrupoEstudio[] = [];
  public Estudiantes: Estudiante[] = [];
  public Tutores: Tutor[] = [];


  //funcionalidades de la lista sedes---------------------------------------------------------------------------------------------------------------------------------
  getSedes(): Sede[] {
    return this.Sedes;
  }
  addSede(sede: Sede): boolean {
    //preguntar si el sede ya existe
    if (this.Sedes.find(s => s.ID_SEDE === sede.ID_SEDE)) {
      return false;
    }
    this.Sedes.push(sede);
    if (this.Sedes.find(s => s.ID_SEDE === sede.ID_SEDE)) {
      return true;
    }else{
      return false;
    }
  }
  updateSede(sede: Sede, id: number) {
    let index = this.Sedes.findIndex(s => s.ID_SEDE === id);
    sede.ID_SEDE = id;
    this.Sedes[index] = sede;
  }


  eliminarSede(id: number) {
    // Verifica si alguna Area está asociada con este Sede
    const tieneAreaAsociadas = this.Areas_estudio.some(A => A.ID_SEDE === id);

    // Si no hay Area asociadas, elimina el Sede
    if (!tieneAreaAsociadas) {
      let index = this.Sedes.findIndex(s => s.ID_SEDE === id);
      if (index !== -1) { // Asegura que el contexto existe antes de intentar eliminarlo
        this.Sedes.splice(index, 1);
      }
    } else {
      console.log(`La sede con id ${id} tiene Areas_estudio asociadas y no puede ser eliminado.`);
    }
  }

  //funcionalidades de la lista Areas_estudio---------------------------------------------------------------------------------------------------------------------------------
  getAreas_estudio(): AreaEstudio[] {
    return this.Areas_estudio;
  }
  addArea_estudio(area: AreaEstudio): boolean {
    //preguntar si el area ya existe
    if (this.Areas_estudio.find(a => a.ID_AREA_ESTUDIO === area.ID_AREA_ESTUDIO)) {
      return false;
    }
    this.Areas_estudio.push(area);
    if (this.Areas_estudio.find(a => a.ID_AREA_ESTUDIO === area.ID_AREA_ESTUDIO)) {
      return true;
    }else{
      return false;
    }
  }
  updateArea_estudio(area: AreaEstudio, id: number) {
    let index = this.Areas_estudio.findIndex(a => a.ID_AREA_ESTUDIO === id);
    area.ID_AREA_ESTUDIO = id;
    this.Areas_estudio[index] = area;
  }

  eliminarArea_estudio(id: number) {
    // Verifica si alguna Programa está asociada con este Area
    const tieneProgramaAsociadas = this.Programas_estudio.some(P => P.ID_AREA_ESTUDIO === id);

    // Si no hay Programa asociadas, elimina el Area
    if (!tieneProgramaAsociadas) {
      let index = this.Areas_estudio.findIndex(a => a.ID_AREA_ESTUDIO === id);
      if (index !== -1) { // Asegura que el contexto existe antes de intentar eliminarlo
        this.Areas_estudio.splice(index, 1);
      }
    } else {
      console.log(`El Area con id ${id} tiene Programas_estudio asociadas y no puede ser eliminado.`);
    }
  }

  //funcionalidades de la lista Programas_estudio---------------------------------------------------------------------------------------------------------------------------------
  getProgramas_estudio(): ProgramaEstudio[] {
    return this.Programas_estudio;
  }
  addPrograma_estudio(programa: ProgramaEstudio): boolean {
    //preguntar si el programa ya existe
    if (this.Programas_estudio.find(p => p.ID_PROGRAMA_ESTUDIO === programa.ID_PROGRAMA_ESTUDIO)) {
      return false;
    }
    this.Programas_estudio.push(programa);
    if (this.Programas_estudio.find(p => p.ID_PROGRAMA_ESTUDIO === programa.ID_PROGRAMA_ESTUDIO)) {
      return true;
    }else{
      return false;
    }
  }
  updatePrograma_estudio(programa: ProgramaEstudio, id: number) {
    let index = this.Programas_estudio.findIndex(p => p.ID_PROGRAMA_ESTUDIO === id);
    programa.ID_PROGRAMA_ESTUDIO = id;
    this.Programas_estudio[index] = programa;
  }

  eliminarPrograma_estudio(id: number) {
    // Verifica si alguna Grupo está asociada con este Programa
    const tieneGrupoAsociadas = this.Grupos_estudio.some(G => G.ID_PROGRAMA_ESTUDIO === id);

    // Si no hay Grupo asociadas, elimina el Programa
    if (!tieneGrupoAsociadas) {
      let index = this.Programas_estudio.findIndex(p => p.ID_PROGRAMA_ESTUDIO === id);
      if (index !== -1) { // Asegura que el contexto existe antes de intentar eliminarlo
        this.Programas_estudio.splice(index, 1);
      }
    } else {
      console.log(`El Programa con id ${id} tiene Grupos_estudio asociadas y no puede ser eliminado.`);
    }
  }

  //funcionalidades de la lista Grupos_estudio---------------------------------------------------------------------------------------------------------------------------------
  getGrupos_estudio(): GrupoEstudio[] {
    return this.Grupos_estudio;
  }
  addGrupo_estudio(grupo: GrupoEstudio): boolean {
    //preguntar si el grupo ya existe
    if (this.Grupos_estudio.find(g => g.ID_GRUPO_ESTUDIO === grupo.ID_GRUPO_ESTUDIO)) {
      return false;
    }
    this.Grupos_estudio.push(grupo);
    if (this.Grupos_estudio.find(g => g.ID_GRUPO_ESTUDIO === grupo.ID_GRUPO_ESTUDIO)) {
      return true;
    }else{
      return false;
    }
  }
  updateGrupo_estudio(grupo: GrupoEstudio, id: number) {
    let index = this.Grupos_estudio.findIndex(g => g.ID_GRUPO_ESTUDIO === id);
    grupo.ID_GRUPO_ESTUDIO = id;
    this.Grupos_estudio[index] = grupo;
  }

  eliminarGrupo_estudio(id: number) {
    // Verifica si alguna Estudiante está asociada con este Grupo
    const tieneEstudianteAsociadas = this.Estudiantes.some(E => E.ID_GRUPO_ESTUDIO === id);

    // Si no hay Estudiante asociadas, elimina el Grupo
    if (!tieneEstudianteAsociadas) {
      let index = this.Grupos_estudio.findIndex(g => g.ID_GRUPO_ESTUDIO === id);
      if (index !== -1) { // Asegura que el contexto existe antes de intentar eliminarlo
        this.Grupos_estudio.splice(index, 1);
      }
    } else {
      console.log(`El Grupo con id ${id} tiene Estudiantes asociadas y no puede ser eliminado.`);
    }
  }

  //funcionalidades de la lista Estudiantes---------------------------------------------------------------------------------------------------------------------------------
  getEstudiantes(): Estudiante[] {
    return this.Estudiantes;
  }
  addEstudiante(estudiante: Estudiante): boolean {
    //preguntar si el estudiante ya existe
    if (this.Estudiantes.find(e => e.ID_ESTUDIANTE === estudiante.ID_ESTUDIANTE)) {
      return false;
    }
    this.Estudiantes.push(estudiante);
    if (this.Estudiantes.find(e => e.ID_ESTUDIANTE === estudiante.ID_ESTUDIANTE)) {
      return true;
    }else{
      return false;
    }
  }
  updateEstudiante(estudiante: Estudiante, id: string) {
    let index = this.Estudiantes.findIndex(e => e.ID_ESTUDIANTE === id);
    estudiante.ID_ESTUDIANTE = id;
    this.Estudiantes[index] = estudiante;
  }

  eliminarEstudiante(id: string) {
    let index = this.Estudiantes.findIndex(e => e.ID_ESTUDIANTE === id);
    if (index !== -1) { // Asegura que el estudiante existe antes de intentar eliminarlo
      this.Estudiantes.splice(index, 1);
    }

  }

  //funcionalidades de la lista Tutores---------------------------------------------------------------------------------------------------------------------------------

  getTutores(): Tutor[] {
    return this.Tutores;
  }

  addTutor(tutor: Tutor): boolean {
    //preguntar si el tutor ya existe
    if (this.Tutores.find(t => t.ID_TUTOR === tutor.ID_TUTOR)) {
      return false;
    }
    this.Tutores.push(tutor);
    if (this.Tutores.find(t => t.ID_TUTOR === tutor.ID_TUTOR)) {
      return true;
    }else{
      return false;
    }
  }

  updateTutor(tutor: Tutor, id: number) {
    let index = this.Tutores.findIndex(t => t.ID_TUTOR === id);
    tutor.ID_TUTOR = id;
    this.Tutores[index] = tutor;
  }

  eliminarTutor(id: number) {
    let index = this.Tutores.findIndex(t => t.ID_TUTOR === id);
    if (index !== -1) { // Asegura que el tutor existe antes de intentar eliminarlo
      this.Tutores.splice(index, 1);
    }
  }


}
