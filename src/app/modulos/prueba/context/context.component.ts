// context.component.ts
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../../servicios/quiz.service';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { NgToastService } from 'ng-angular-popup';
import { RespuestaServer } from '../../../Modelos/RespuestaServer.model';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  contextoForm: FormGroup= new FormGroup({});
  cargaArchivoFG: FormGroup = new FormGroup({});

  selectedFile: File | null = null;
  archivoCargado = false;
  nombreArchivoCargado = '';



  constructor(
     private fb: FormBuilder,
     protected quizService: QuizService,
     private changeDetector: ChangeDetectorRef,
     protected preguntaService: PreguntaService,
     protected toast: NgToastService,

    ) { }

  ngOnInit(): void {
    this.ConstruirFormularioArchivo();
    this.ConstruirFormulario();



  }
  ConstruirFormularioArchivo() {
    this.cargaArchivoFG = this.fb.group({
      archivo: [null, Validators.required] // Asegúrate de que 'archivo' es un control de formulario
    });
  }


  ConstruirFormulario() {
    this.contextoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      autor: ['', Validators.required],
      NombreArchivo: ['', Validators.required],
    });
  }









  onSubmit() {
    if (this.contextoForm.valid) {
      //console.log(this.contextoForm.value);
      let nombre = this.contextoForm.controls["nombre"].value;
      let descripcion = this.contextoForm.controls["descripcion"].value;
      let autor = this.contextoForm.controls["autor"].value;
      let nombreArchivo = this.contextoForm.controls["NombreArchivo"].value;

      this.preguntaService.CrearContexto(nombre, descripcion, autor, nombreArchivo).subscribe({
        next: (data: RespuestaServer) => {
          if (data.CODIGO == 200) {
            //console.log(data);
            this.toast.success({detail:"EXITO",summary:"Contexto creado correctamente",duration:5000, position:'topCenter'});
            //console.log(this.contextoForm.value);
            let id_contexto_db = data.DATOS.ID_CONTEXTO;
            let id_contexto_db_entero = parseInt(id_contexto_db);
            this.quizService.addContexto(this.contextoForm.value,id_contexto_db_entero);
            this.contextoForm.reset()
          }else{
            this.toast.error({detail:"ERROR",summary:data.MENSAJE,duration:5000, position:'topCenter'});
          }
        },
        error: (err: any) => {
          this.toast.error({detail:"ERROR",summary:"Error creando el contexto",duration:5000, position:'topCenter'});
        }
      });

      //console.log(nombre);
      //console.log(descripcion);
      //console.log(autor);
      //console.log(nombreArchivo);

      //console.log(this.contextoForm.value);
      //this.quizService.addContexto(this.contextoForm.value);
      //this.contextoForm.reset();
    }
  }




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



  CargarArchivo() {
      const formData = new FormData();
      formData.append('file', this.cargaArchivoFG.controls["archivo"].value);
      console.log(this.cargaArchivoFG.controls["archivo"].value);
      this.preguntaService.CargarArchivoContexto(formData).subscribe({
        next: (data: any) => {
          console.log(data);
          this.archivoCargado = true;
          this.nombreArchivoCargado = data.file;
          //console.log(this.nombreArchivoCargado);
          //alert("Archivo cargado correctamente.");
          this.toast.success({detail:"EXITO",summary:"Archivo cargado correctamente",duration:5000, position:'topCenter'});

          //asignar el nombre del archivo al campo del formulario del formgroup
          this.contextoForm.patchValue({
            NombreArchivo: data.file
          });


        },
        error: (err: any) => {
          //alert("Error cargando el archivo formato no valido o archivo muy pesado.");
          this.toast.error({detail:"ERROR",summary:"Error cargando el archivo formato no valido o archivo muy pesado",duration:5000, position:'topCenter'});
        }
      });
  }



  get obtenerFgArchivo() {
    return this.cargaArchivoFG.controls;
  }



}
