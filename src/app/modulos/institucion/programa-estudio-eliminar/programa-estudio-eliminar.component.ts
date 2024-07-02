import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-programa-estudio-eliminar',
  templateUrl: './programa-estudio-eliminar.component.html',
  styleUrl: './programa-estudio-eliminar.component.css'
})
export class ProgramaEstudioEliminarComponent {
  @Input() ProgramaID!: string;


}
