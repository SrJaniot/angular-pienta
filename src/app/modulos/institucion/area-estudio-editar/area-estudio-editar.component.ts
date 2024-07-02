import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-area-estudio-editar',
  templateUrl: './area-estudio-editar.component.html',
  styleUrl: './area-estudio-editar.component.css'
})
export class AreaEstudioEditarComponent {
  @Input() AreaID!: string;


}
