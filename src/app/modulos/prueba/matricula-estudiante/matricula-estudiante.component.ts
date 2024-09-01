import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { prueba } from '../../../Modelos/prueba.model';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { PruebaService } from '../../../servicios/prueba.service';
import { PruebaControllService } from '../../../servicios/prueba-controll.service';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { RespuestaServerMatricularGrupo } from '../../../Modelos/RespuestaServerMatricularGrupo.model';

@Component({
  selector: 'app-matricula-estudiante',
  templateUrl: './matricula-estudiante.component.html',
  styleUrl: './matricula-estudiante.component.css'
})
export class MatriculaEstudianteComponent {
  @Input() ID_Estudiante!: string;


  matriculaForm: FormGroup= new FormGroup({});


  id_rol:number = 0;
  nombre_role:string = '';

  Pruebas: prueba[] = [];



  constructor(
     protected fb: FormBuilder,
     protected toast: NgToastService,
     protected seguridadService: SeguridadService,
     private PruebaService: PruebaService,
     private pruebaControllService: PruebaControllService
    ) { }

  ngOnInit(): void {
    //obtener rol del usuario a travez del servicio de seguridad
    this.seguridadService.ObtenerRolUsuario().subscribe(
      (data: RespuestaServerObtenerRol) => {
        if (data.CODIGO == 200) {
          this.id_rol = data.DATOS?.rol!;
          this.nombre_role = data.DATOS?.nombre_rol!;
          //console.log(this.id_rol);
          //console.log(this.nombre_role);
        }
      }
    );
    //obtener Sedes
    this.Pruebas = this.pruebaControllService.getPruebas();



    //construir formularios
    this.ConstruirFormulario();



  }

  ConstruirFormulario() {
    this.matriculaForm = this.fb.group({
      id_prueba: ['', Validators.required],
    });
  }









  onSubmit() {
    if (this.matriculaForm.valid) {
      //console.log(this.institucionForm.value);
      let id_prueba = this.matriculaForm.controls["id_prueba"].value;


      this.PruebaService.VincularEstudiantePrueba(+id_prueba,this.ID_Estudiante).subscribe({
        next: (data: RespuestaServerMatricularGrupo) => {
          if (data.CODIGO == 200) {
            //console.log(data);
            this.toast.success({detail:"EXITO",summary:"Estudiantes matriculados: " + data.DATOS?.CANTIDAD_ESTUDIANTES_INSERTADOS,duration:5000, position:'topCenter'});

          }else{
            this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
          }
        },
        error: (err: any) => {
          this.toast.error({detail:"ERROR",summary:"Error",duration:5000, position:'topCenter'});
        }
      });

      //console.log(nombre);
      //console.log(descripcion);
      //console.log(autor);
      //console.log(nombreArchivo);

      //console.log(this.institucionForm.value);
      //this.quizService.addContexto(this.institucionForm.value);
      //this.institucionForm.reset();
    }
  }


}
