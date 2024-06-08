// pregunta.component.ts
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../../servicios/quiz.service';
import { Contexto } from '../../../Modelos/contexto.model';
import { AreasEvaluar } from '../../../Modelos/ObtenerAreasEvaluar.model';
import { TemasAreasEvaluar } from '../../../Modelos/TemasAreasEvaluar.model';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { RespuestaServerObtenerAreasEvaluar } from '../../../Modelos/RespuestaServer.ObtenerAreasEvaluar.model';
import { RespuestaServerObtenerTemasAreasEvaluar } from '../../../Modelos/RespuestaServer.ObtenerTemasAreasEvaluar.model';
import { RespuestaServerCrearPregunta } from '../../../Modelos/RespuestaServer.CrearPregunta.model';
import { NgToastService } from 'ng-angular-popup';
import { Pregunta } from '../../../Modelos/pregunta.model';
import e from 'express';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {

  //variables
  preguntaForm: FormGroup = new FormGroup({});
  cargaArchivoFG: FormGroup = new FormGroup({});

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | null = null;
  archivoCargado = false;
  nombreArchivoCargado = '';

  contextos: Contexto[] = [];
  ListaAreasEvaluar: AreasEvaluar[] = [];
  ListaSubtemas: TemasAreasEvaluar[] = [];
  ListaTiposPreguntas: any[] = [
    { id: '1', nombre: 'Opción Múltiple Única Respuesta' },
    { id: '2', nombre: 'Opción Múltiple Múltiple Respuesta' },
    { id: '3', nombre: 'Verdadero o Falso' },
    { id: '4', nombre: 'Ensayo' }
  ];

  id_rol:number = 0;
  nombre_role:string = '';


  constructor(
    protected fb: FormBuilder,
    protected quizService: QuizService,
    protected changeDetector: ChangeDetectorRef,
    protected PreguntaService: PreguntaService,
    protected toast: NgToastService,
    protected seguridadService: SeguridadService,
  ) { }

  ngOnInit(): void {
    //obtener rol del usuario a travez del servicio de seguridad
    this.seguridadService.ObtenerRolUsuario().subscribe(
      (data: RespuestaServerObtenerRol) => {
        if (data.CODIGO == 200) {
          this.id_rol = data.DATOS?.rol!;
          this.nombre_role = data.DATOS?.nombre_rol!;
          //console.log(this.id_rol);
          //console.log(this.nombre_role);
        }
      }
    );

  //obtener contextos
    this.PreguntaService.ObtenerAreasPreguntas().subscribe(
      (data: RespuestaServerObtenerAreasEvaluar) => {
        if (data.CODIGO == 200) {
          this.ListaAreasEvaluar = data.DATOS!;
        }
      }
    );

    this.contextos = this.quizService.getContextos();
    this.ConstruirFormularioArchivo();
    this.ConstruirFormularioPregunta();

  }

  ConstruirFormularioArchivo() {
    this.cargaArchivoFG = this.fb.group({
      archivo: [null ] // Asegúrate de que 'archivo' es un control de formulario
    });
  }


  ConstruirFormularioPregunta() {
    this.preguntaForm = this.fb.group({
      contextoId: ['', Validators.required],
      enunciado: [''],
      tipo: ['', Validators.required],
      puntaje: ['', [Validators.required, Validators.min(1)]],
      autor: ['', Validators.required],
      Tema_evaluar: ['', Validators.required],
      area_evaluar: ['', Validators.required],
      Imagen_pregunta: [''],
      Tipo_pregunta_contenido: ['', Validators.required],
      Layout_pregunta: ['', Validators.required],
    });
  }

  onSubmit() {

    if (this.preguntaForm.valid) {
      let contexto_id:number = this.preguntaForm.controls['contextoId'].value;
      let enunciado:string = this.preguntaForm.controls['enunciado'].value;
      let tipo:number= this.preguntaForm.controls['tipo'].value;
      let puntaje:number = this.preguntaForm.controls['puntaje'].value;
      let autor:string = this.preguntaForm.controls['autor'].value;
      let tema_evaluar:number = this.preguntaForm.controls['Tema_evaluar'].value;
      let area_evaluar:number = this.preguntaForm.controls['area_evaluar'].value;

      let Imagen_pregunta:string = this.preguntaForm.controls['Imagen_pregunta'].value;
      let Tipo_pregunta_contenido:string = this.preguntaForm.controls['Tipo_pregunta_contenido'].value;
      let Layout_pregunta:string = this.preguntaForm.controls['Layout_pregunta'].value;


      this.PreguntaService.CrearPregunta(+contexto_id, enunciado, +tipo, puntaje, autor,Imagen_pregunta,Tipo_pregunta_contenido,Layout_pregunta).subscribe(
        (data1: RespuestaServerCrearPregunta) => {
          if (data1.CODIGO == 200) {
            //console.log('Pregunta creada');
            this.PreguntaService.RelacionarPreguntaConTemaArea(data1.DATOS?.ID_PREGUNTA!, +tema_evaluar).subscribe(
              (data2: RespuestaServerCrearPregunta) => {
                if (data2.CODIGO == 200) {
                  //console.log('Pregunta relacionada');

                  this.toast.success({detail:"Pregunta creada",summary:'EXITO',duration:5000, position: 'topCenter'});

                  //capturamos el nombre del tipo de pregunta
                  let tipo_pregunta_nom = this.ListaTiposPreguntas.find(t => t.id === tipo);
                  //capturamos el nombre del tema
                  let tema = this.ListaSubtemas.find(t => t.ID_TEMA_AREA === +tema_evaluar);
                  //capturamos el nombre del area
                  let area = this.ListaAreasEvaluar.find(t => t.ID_AREA_EVALUAR === +area_evaluar);




                  const pregunta:Pregunta = {
                    id: data1.DATOS?.ID_PREGUNTA!,
                    contextoId: +contexto_id,
                    enunciado: enunciado,
                    tipo: +tipo,
                    //esta variable se debe cambiar por el nombre del tipo de pregunta
                    tipo_nombre: tipo_pregunta_nom.nombre,
                    puntaje: puntaje,
                    autor: autor,
                    Area_Evaluar: +area_evaluar,
                    Area_Evaluar_nombre:area?.NOM_AREA_EVALUAR!,
                    Tema_Evaluar: +tema_evaluar,
                    Tema_Evaluar_nombre: tema?.NOM_TEMA_AREA!,
                    imagen_pregunta: Imagen_pregunta,
                    tipo_pregunta_contenido: Tipo_pregunta_contenido,
                    layout_pregunta: Layout_pregunta
                  };
                  this.quizService.addPregunta(pregunta);
                  this.preguntaForm.reset();
                }else{
                  this.toast.error({detail:data2.MENSAJE!,summary:'ERROR',duration:5000, position: 'topCenter'});
                }
              }
            );
          }else{
            this.toast.error({detail:data1.MENSAJE!,summary:'ERROR',duration:5000, position: 'topCenter'});
          }
        }
      );
    }
  }



  onTopicChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    console.log('Selected value:', selectedValue);
    // Aquí puedes obtener la información relevante para el tema seleccionado
    // y actualizar la lista de subtemas.
    // Por ejemplo, puedes hacer una solicitud HTTP para obtener los subtemas del tema seleccionado.
    this.PreguntaService.ObtenerSubtemas(selectedValue).subscribe(
      (data: RespuestaServerObtenerTemasAreasEvaluar) => {
        if (data.CODIGO == 200) {
          this.ListaSubtemas = data.DATOS!;
        }
      }
    );
  }





  //logica de subida de archvio y arrastre de documento para que funcione el input de file



  onFileSelected(event: any) {

    if (event.target.files.length > 0) {
      const f = event.target.files[0];
      //console.log(f);
      if (this.obtenerFgArchivo && this.obtenerFgArchivo["archivo"]) {
        console.log(this.obtenerFgArchivo["archivo"].value);
        this.obtenerFgArchivo['archivo'].setValue(f);
        this.CargarArchivo();
      }
    }

    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      //console.log('File selected:', this.selectedFile);
      // Handle the file here
      //this.CargarArchivo(); // Llamada a la función
    }

    // Force Angular to perform change detection
    this.changeDetector.detectChanges();

    // Reset the value of the file input to allow selecting the same file again
    fileInput.value = ''; // Esto debería evitar el error
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = event.currentTarget as HTMLElement;
    dropzone.classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = event.currentTarget as HTMLElement;
    dropzone.classList.remove('dragover');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = event.currentTarget as HTMLElement;
    dropzone.classList.remove('dragover');

    if (event.dataTransfer) {
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.selectedFile = files[0];
        console.log('File dropped:', this.selectedFile);

        // Handle the file here
        if (this.obtenerFgArchivo && this.obtenerFgArchivo["archivo"]) {
          console.log(this.obtenerFgArchivo["archivo"].value);
          this.obtenerFgArchivo['archivo'].setValue(this.selectedFile);
          this.CargarArchivo();
        }

        // Force Angular to perform change detection
        this.changeDetector.detectChanges();
      }
    }
  }

  openFileSelector() {
    this.fileInput.nativeElement.value = '';
    this.fileInput.nativeElement.click();
  }

  get obtenerFgArchivo() {
    return this.cargaArchivoFG.controls;
  }





  CargarArchivo() {
    const formData = new FormData();
    formData.append('file', this.cargaArchivoFG.controls["archivo"].value);
    console.log(this.cargaArchivoFG.controls["archivo"].value);
    this.PreguntaService.CargarArchivoPregunta(formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.archivoCargado = true;
        this.nombreArchivoCargado = data.file;
        //console.log(this.nombreArchivoCargado);
        //alert("Archivo cargado correctamente.");
        this.toast.success({detail:"EXITO",summary:"Archivo cargado correctamente",duration:5000, position:'topCenter'});

        //asignar el nombre del archivo al campo del formulario del formgroup
        this.preguntaForm.patchValue({
          Imagen_pregunta: data.file
        });


      },
      error: (err: any) => {
        //alert("Error cargando el archivo formato no valido o archivo muy pesado.");
        this.toast.error({detail:"ERROR",summary:"Error cargando el archivo formato no valido o archivo muy pesado",duration:5000, position:'topCenter'});
      }
    });
}




}
