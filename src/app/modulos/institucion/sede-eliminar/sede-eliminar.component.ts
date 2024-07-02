import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sede-eliminar',
  templateUrl: './sede-eliminar.component.html',
  styleUrl: './sede-eliminar.component.css'
})
export class SedeEliminarComponent {
  @Input() sedeID!: string;

}
