import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grupo-estudio-editar',
  templateUrl: './grupo-estudio-editar.component.html',
  styleUrl: './grupo-estudio-editar.component.css'
})
export class GrupoEstudioEditarComponent {
  @Input() GrupoID!: string;


}
