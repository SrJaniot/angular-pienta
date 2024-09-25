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
import { RespuestaServerObtenerPruebas } from '../../../Modelos/RespuestaServerObtenerPruebas.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscar-pruebas-estudiantes-resultados',
  templateUrl: './buscar-pruebas-estudiantes-resultados.component.html',
  styleUrl: './buscar-pruebas-estudiantes-resultados.component.css'
})
export class BuscarPruebasEstudiantesResultadosComponent {

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
     private router: Router,
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
    this.PruebaService.ObtenerPruebasFinalizadasID(this.ID_Estudiante).subscribe(
      (data: RespuestaServerObtenerPruebas) => {
        //console.log(data);
        if (data.CODIGO == 200) {
          //console.log(data.DATOS);
          this.Pruebas = data.DATOS!;
          //this.dataSource.paginator = this.paginator;
        } else {
          this.toast.error({ detail: "Error al obtener las pruebas", summary: 'Error', duration: 5000, position: 'topCenter' });
        }
      });



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

      //redirigir a la pagina de resultados de la prueba por estudiante
      this.router.navigate(['/resultados/resultados-estudiantes', id_prueba, this.ID_Estudiante]);


      //console.log(nombre);
      //console.log(descripcion);
      //console.log(autor);
      //console.log(nombreArchivo);

      //console.log(this.institucionForm.value);
      //this.quizService.addContexto(this.institucionForm.value);
      //this.institucionForm.reset();
    }else{
      this.toast.error({ detail: "Error al obtener las pruebas", summary: 'Error', duration: 5000, position: 'topCenter' });
    }
  }


}
