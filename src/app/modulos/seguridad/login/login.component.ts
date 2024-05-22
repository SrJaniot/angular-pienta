import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//libreria para mostrar mensajes emergentes
import { NgToastService } from 'ng-angular-popup';

// libreria para mandar la clave encriptada "npm install crypto-js" y "npm i --save-dev @types/crypto-js"
import {MD5} from 'crypto-js';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

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
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['',[Validators.required]]
    });
  }

//Función para capturar los datos del formulario

  EnviarLogin(){
    //Acá estoy validando si el formulario es válido
    if(this.formularioLogin.invalid){
      //Si el formulario es inválido, voy a mostrar un mensaje
      this.toast.error({detail:"ERROR",summary:"Formulario invalido",duration:5000, position:'topCenter'});
      return;
    }else{
      //capturamos los datos del formulario
      let usuario = this.formularioLogin.controls['usuario'].value;
      let clave = this.formularioLogin.controls['clave'].value;
      let claveEncriptada = MD5(clave).toString();

      //mandamos los datos al backend
      this.seguridadService.IdentificarUsuario(usuario,claveEncriptada).subscribe({
        next: (respuesta:RespuestaServer)=> {
          if(respuesta.CODIGO == 200){
            if (this.seguridadService.AlmacenarDatosUsuarioIdentificadoSESION(respuesta)) {
              //construimos el menu lateral que se va a mostrar en la barra de navegacion por rol especifico
              this.seguridadService.ConstruirMenuLateral(respuesta.DATOS.menu);
              this.toast.success({detail:"BIENVENIDO",summary:"USUARIO IDENTIFICADO",duration:5000, position:'topCenter'});
              //window.location.href = '/home';
              this.router.navigate(['/home']).then(() => {
                window.location.reload();
              });

            }else{
              this.toast.error({detail:"ERROR",summary:"USUARIO YA EXISTE SESION",duration:5000, position:'topCenter'});
            }
          }else{
            this.toast.error({detail:"ERROR",summary:"USUARIO NO IDENTIFICADO",duration:5000, position:'topCenter'});
          }
        }
      })
    }





  }



  //funcion que me permite obtener los controles del formulario
  get obtenerFormGroup(){
    return this.formularioLogin.controls;
  }





}
