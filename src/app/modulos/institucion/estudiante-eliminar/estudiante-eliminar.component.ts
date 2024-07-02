import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estudiante-eliminar',
  templateUrl: './estudiante-eliminar.component.html',
  styleUrl: './estudiante-eliminar.component.css'
})
export class EstudianteEliminarComponent {
  @Input() EstudianteID!: string;


}
