import { Component, Input, OnInit } from '@angular/core';
import { prueba } from '../../../Modelos/prueba.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { PruebaService } from '../../../servicios/prueba.service';
import { PruebaControllService } from '../../../servicios/prueba-controll.service';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { RespuestaServerMatricularGrupo } from '../../../Modelos/RespuestaServerMatricularGrupo.model';

@Component({
  selector: 'app-matricula-grupo',
  templateUrl: './matricula-grupo.component.html',
  styleUrls: ['./matricula-grupo.component.css']
})
export class MatriculaGrupoComponent implements OnInit {
  @Input() ID_grupo!: string;

  matriculaForm: FormGroup = new FormGroup({});

  id_rol: number = 0;
  nombre_role: string = '';

  Pruebas: prueba[] = [];

  constructor(
    protected fb: FormBuilder,
    protected toast: NgToastService,
    protected seguridadService: SeguridadService,
    private PruebaService: PruebaService,
    private pruebaControllService: PruebaControllService
  ) {}

  ngOnInit(): void {
    // Obtener rol del usuario a través del servicio de seguridad
    this.seguridadService.ObtenerRolUsuario().subscribe(
      (data: RespuestaServerObtenerRol) => {
        if (data.CODIGO == 200) {
          this.id_rol = data.DATOS?.rol!;
          this.nombre_role = data.DATOS?.nombre_rol!;
        }
      }
    );

    // Obtener Pruebas
    this.Pruebas = this.pruebaControllService.getPruebas();

    // Construir formularios
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.matriculaForm = this.fb.group({
      id_prueba: ['', Validators.required], // Asegúrate de que el valor inicial sea null
    });
  }

  onSubmit() {
    if (this.matriculaForm.valid) {
      let id_prueba = this.matriculaForm.controls["id_prueba"].value;

      this.PruebaService.VincularGrupoPrueba(+id_prueba, +this.ID_grupo).subscribe({
        next: (data: RespuestaServerMatricularGrupo) => {
          if (data.CODIGO == 200) {
            this.toast.success({ detail: "EXITO", summary: "Estudiantes matriculados: " + data.DATOS?.CANTIDAD_ESTUDIANTES_INSERTADOS, duration: 5000, position: 'topCenter' });
          } else {
            this.toast.error({ detail: "ERROR", summary: data.MENSAJE, duration: 5000, position: 'topCenter' });
          }
        },
        error: (err: any) => {
          this.toast.error({ detail: "ERROR", summary: "Error", duration: 5000, position: 'topCenter' });
        }
      });
    }
  }
}
