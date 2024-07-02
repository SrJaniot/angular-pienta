import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-programa-estudio-editar',
  templateUrl: './programa-estudio-editar.component.html',
  styleUrl: './programa-estudio-editar.component.css'
})
export class ProgramaEstudioEditarComponent {
  @Input() ProgramaID!: string;


}
