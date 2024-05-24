// pregunta.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../../servicios/quiz.service';
import { Contexto } from '../../../Modelos/contexto.model';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  preguntaForm: FormGroup = new FormGroup({});
  contextos: Contexto[] = [];

  constructor(private fb: FormBuilder, private quizService: QuizService) { }

  ngOnInit(): void {
    this.contextos = this.quizService.getContextos();
    this.preguntaForm = this.fb.group({
      contextoId: ['', Validators.required],
      enunciado: ['', Validators.required],
      tipo: ['', Validators.required],
      puntaje: ['', [Validators.required, Validators.min(1)]],
      autor: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.preguntaForm.valid) {
      this.quizService.addPregunta(this.preguntaForm.value);
      this.preguntaForm.reset();
    }
  }
}
