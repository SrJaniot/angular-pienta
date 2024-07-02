import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sede-editar',
  templateUrl: './sede-editar.component.html',
  styleUrl: './sede-editar.component.css'
})
export class SedeEditarComponent {
  @Input() sedeID!: string;


}
