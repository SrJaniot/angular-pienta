import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tutor-editar',
  templateUrl: './tutor-editar.component.html',
  styleUrl: './tutor-editar.component.css'
})
export class TutorEditarComponent {
  @Input() TutorID!: string;


}
