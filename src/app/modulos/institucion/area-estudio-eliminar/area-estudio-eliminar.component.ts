import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-area-estudio-eliminar',
  templateUrl: './area-estudio-eliminar.component.html',
  styleUrl: './area-estudio-eliminar.component.css'
})
export class AreaEstudioEliminarComponent {
  @Input() AreaID!: string;


}
