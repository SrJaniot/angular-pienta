import { Injectable } from '@angular/core';
import { GrupoEstudio } from '../Modelos/grupoestudio.model';
import { Estudiante } from '../Modelos/estudiante.model';
import { prueba } from '../Modelos/prueba.model';

@Injectable({
  providedIn: 'root'
})
export class PruebaControllService {
  public Grupos_estudio: GrupoEstudio[] = [];
  public Estudiantes: Estudiante[] = [];
  public Pruebas: prueba[] = [];



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

  //funcionalidades de la lista Pruebas---------------------------------------------------------------------------------------------------------------------------------
  getPruebas(): prueba[] {
    return this.Pruebas;
  }
  addPrueba(prueba: prueba): boolean {
    //preguntar si la prueba ya existe
    if (this.Pruebas.find(p => p.ID_PRUEBA === prueba.ID_PRUEBA)) {
      return false;
    }
    this.Pruebas.push(prueba);
    if (this.Pruebas.find(p => p.ID_PRUEBA === prueba.ID_PRUEBA)) {
      return true;
    }else{
      return false;
    }
  }
  updatePrueba(prueba: prueba, id: number) {
    let index = this.Pruebas.findIndex(p => p.ID_PRUEBA === id);
    prueba.ID_PRUEBA = id;
    this.Pruebas[index] = prueba;
  }

  eliminarPrueba(id: number) {
    let index = this.Pruebas.findIndex(p => p.ID_PRUEBA === id);
    if (index !== -1) { // Asegura que la prueba existe antes de intentar eliminarlo
      this.Pruebas.splice(index, 1);
    }

  }
}
