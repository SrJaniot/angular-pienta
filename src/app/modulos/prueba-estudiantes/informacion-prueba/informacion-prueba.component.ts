import { Component, Input } from '@angular/core';
import { PruebaService } from '../../../servicios/prueba.service';
import { NgToastService } from 'ng-angular-popup';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { prueba } from '../../../Modelos/prueba.model';
import { RespuestaServerObtenerPrueba } from '../../../Modelos/RespuestaServerObtenerPrueba.model';

@Component({
  selector: 'app-informacion-prueba',
  templateUrl: './informacion-prueba.component.html',
  styleUrl: './informacion-prueba.component.css'
})
export class InformacionPruebaComponent {
  @Input() IdPrueba!: string;
  prueba!: prueba;
  aceptoTerminos: boolean = false;


  constructor(
    private toast: NgToastService,
    private seguridadService: SeguridadService,
    private route: ActivatedRoute,
    private router: Router,
    private pruebaService: PruebaService
  ) {}

   ngOnInit(): void {
    console.log(this.IdPrueba) // Obtén el ID del contexto de la URL
    //console.log(this.contextoId);
    if (!this.IdPrueba || this.IdPrueba === '' || this.IdPrueba === '1' || this.IdPrueba === '0') {
      // Maneja el caso en el que no se proporciona un ID de contexto
      this.router.navigate(['/']);
      return;
      // Puedes mostrar un mensaje de error o redirigir a otra página

    }
    this.toast.warning({detail:"ADVERTENCIA",summary:"Al presionar 'Presentar', comenzará la prueba. Solo tendrás un intento para completarla. Una vez que se agote el tiempo asignado, la prueba se cerrará automáticamente y no podrás realizar ningún cambio adicional. Asegúrate de estar listo antes de continuar.",duration:15000, position:'topCenter'});
    this.ObtenerDatosPrueba(this.IdPrueba);
  }


  ObtenerDatosPrueba(idPrueba: string): void {
    this.pruebaService.ObtenerPruebaID(idPrueba).subscribe(
      (data: RespuestaServerObtenerPrueba) => {
        if (data.CODIGO == 200) {
          return this.prueba = data.DATOS!;
        } else {
          console.log(data);
          return null;
        }
      }
    );

  }

  PresentarPrueba(): void {
    if (this.aceptoTerminos) {
      //almacenar el id de la prueba en el localstorage
      this.seguridadService.AlmacenarPruebaActiva(this.IdPrueba);
      this.router.navigate(['/presentar-prueba']).then(() => {
        window.location.reload();
    });
    }else{
      this.toast.error({detail:"ERROR",summary:"Debes aceptar los términos y condiciones para continuar",duration:5000,position:'topCenter'});
    }

  }




}
