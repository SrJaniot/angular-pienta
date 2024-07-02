import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estudiante-editar',
  templateUrl: './estudiante-editar.component.html',
  styleUrl: './estudiante-editar.component.css'
})
export class EstudianteEditarComponent {
  @Input() EstudianteID!: string;


}
