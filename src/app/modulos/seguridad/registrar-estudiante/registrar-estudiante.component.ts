import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';
import { InstitucionBackendConectionService } from '../../../servicios/institucion-backend-conection.service';

@Component({
  selector: 'app-registrar-estudiante',
  templateUrl: './registrar-estudiante.component.html',
  styleUrl: './registrar-estudiante.component.css'
})
export class RegistrarEstudianteComponent {


  //Estos son los atributos de mi clase
  //forms del html en este caso solo tengo 1 formulario
  formularioLogin: FormGroup = new FormGroup({});




  //Estos son los métodos de mi clase
  //Este es el constructor de mi clase
  //Este se va a encargar de inicializar el objeto cuando la clase sea llamada
  //En este se va incorporar todo lo que se inicializa
  //Todas las funcionalidades que necesite dentro de la clase, se van a inicializar en el constructor
  constructor(
    //lo que estoy haciendo es llamar una variable fb, con un objeto de tipo FormBuilder, la variable es privada
    private fb: FormBuilder,
    private toast: NgToastService,
    private seguridadService: SeguridadService,
    private router: Router,
    private institucionBackendConectionService: InstitucionBackendConectionService,

  ){}

  //Esta funcion se va a ejecutar cuando el componente se inicie

  ngOnInit(){
    //Acá estoy llamando a la función que construye el formulario
    this.construirformulario();
  }

  //Función que me permite construir mi formulario
  construirformulario(){
    //Acá estoy llamando a la variable que hay más arriba que es fGroup, y le estoy asignando un valor
    //El valor que estoy llamando es fb, que es la variable que inicialicé en el constructor
    this.formularioLogin = this.fb.group({
      //Acá estamos indicando cuantos input tiene el formulario, ya que después de hacer la función
      //de construir formulario, vamos a indicar siempre la cantidad de inputs, esto se hace para cada formulario
      id_gurpo_estudio: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      num_documento: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      tipo_documento: ['', Validators.required],
      usuario_activo: [true, Validators.required],

    });
  }

//Función para capturar los datos del formulario

onSubmit() {
  let nombre = this.formularioLogin.controls["nombre"].value;
  let direccion = this.formularioLogin.controls["direccion"].value;
  let telefono = this.formularioLogin.controls["telefono"].value;
  let correo = this.formularioLogin.controls["correo"].value;
  let num_documento = this.formularioLogin.controls["num_documento"].value;
  let tipo_documento = this.formularioLogin.controls["tipo_documento"].value;
  let usuario_activo = true;
  let id_grupo_estudio = this.formularioLogin.controls["id_gurpo_estudio"].value;

  console.log(id_grupo_estudio);
  console.log(nombre);
  console.log(direccion);
  console.log(telefono);
  console.log(correo);
  console.log(num_documento);
  console.log(tipo_documento);
  console.log(usuario_activo);
  console.log(this.formularioLogin.value);
  
  if (this.formularioLogin.valid) {
    console.log(this.formularioLogin.value);
    let nombre = this.formularioLogin.controls["nombre"].value;
    let direccion = this.formularioLogin.controls["direccion"].value;
    let telefono = this.formularioLogin.controls["telefono"].value;
    let correo = this.formularioLogin.controls["correo"].value;
    let num_documento = this.formularioLogin.controls["num_documento"].value;
    let tipo_documento = this.formularioLogin.controls["tipo_documento"].value;
    let usuario_activo = true;
    let id_grupo_estudio = this.formularioLogin.controls["id_gurpo_estudio"].value;

    correo = correo.toLowerCase();


    console.log(id_grupo_estudio);
    console.log(nombre);
    console.log(direccion);
    console.log(telefono);
    console.log(correo);
    console.log(num_documento);
    console.log(tipo_documento);
    console.log(usuario_activo);





    this.institucionBackendConectionService.CrearEstudiante(+id_grupo_estudio,nombre,direccion,telefono,correo,num_documento,tipo_documento,usuario_activo).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.success == true) {
          console.log(data);
          this.toast.success({detail:"EXITO",summary:"Estudiante creado correctamente",duration:5000, position:'topCenter'});
          //console.log(this.institucionForm.value);
          //tomamos el id de la db
          //let id_GrupoEstudio_db = data.DATOS?.ID_GRUPO_ESTUDIO;
          //construimos un objeto de sede con el id de la base de datos
          //redirigir a la pagina login
          this.router.navigate(['/']);

        }else{
          this.toast.error({detail:"ERROR",summary:"error al crear estudiante",duration:5000, position:'topCenter'});
        }
      },
      error: (err: any) => {
        this.toast.error({detail:"ERROR",summary:"Error creando al estudiante",duration:5000, position:'topCenter'});
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
