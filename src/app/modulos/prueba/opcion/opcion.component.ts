import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../../servicios/quiz.service';
import { Pregunta } from '../../../Modelos/pregunta.model';

@Component({
  selector: 'app-opcion',
  templateUrl: './opcion.component.html',
  styleUrls: ['./opcion.component.css']
})
export class OpcionComponent implements OnInit {
  opcionForm: FormGroup = new FormGroup({});
  preguntas: Pregunta[] = [];

  constructor(private fb: FormBuilder, private quizService: QuizService) { }

  ngOnInit(): void {
    this.preguntas = this.quizService.getPreguntas();
    this.opcionForm = this.fb.group({
      preguntaId: ['', Validators.required],
      texto: ['', Validators.required],
      esCorrecta: [false]
    });
  }

  onSubmit() {
    if (this.opcionForm.valid) {
      this.quizService.addOpcion(this.opcionForm.value);
      this.opcionForm.reset();
    }
  }
}
