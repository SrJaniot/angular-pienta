import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tutor-eliminar',
  templateUrl: './tutor-eliminar.component.html',
  styleUrl: './tutor-eliminar.component.css'
})
export class TutorEliminarComponent {
  @Input() TutorID!: string;



}
