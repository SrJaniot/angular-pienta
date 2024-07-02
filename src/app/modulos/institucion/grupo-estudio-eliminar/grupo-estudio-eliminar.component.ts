import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grupo-estudio-eliminar',
  templateUrl: './grupo-estudio-eliminar.component.html',
  styleUrl: './grupo-estudio-eliminar.component.css'
})
export class GrupoEstudioEliminarComponent {
  @Input() GrupoID!: string;


}
