import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../../servicios/quiz.service';
import { Pregunta } from '../../../Modelos/pregunta.model';
import { PreguntaService } from '../../../servicios/pregunta.service';
import { NgToastService } from 'ng-angular-popup';
import { RespuestaServerCrearOpcion } from '../../../Modelos/RespuestaServerCrearOpcion.model';
import { Opcion } from '../../../Modelos/opcion.model';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { RespuestaServerObtenerRol } from '../../../Modelos/RespuestaServerObtenerRol.model';

@Component({
  selector: 'app-opcion',
  templateUrl: './opcion.component.html',
  styleUrls: ['./opcion.component.css']
})
export class OpcionComponent implements OnInit {

  //variables
  opcionForm: FormGroup = new FormGroup({});
  cargaArchivoFG: FormGroup = new FormGroup({});

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | null = null;
  archivoCargado = false;
  nombreArchivoCargado = '';

  preguntas: Pregunta[] = [];

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


    this.preguntas = this.quizService.getPreguntas();
    //console.log(this.preguntas); // Asegúrate de que aquí obtienes lo que esperas

    this.ConstruirFormularioArchivo();
    this.ConstruirFormularioOpcion();
  }


  ConstruirFormularioArchivo() {
    this.cargaArchivoFG = this.fb.group({
      archivo: [null ] // Asegúrate de que 'archivo' es un control de formulario
    });
  }

  ConstruirFormularioOpcion() {
    this.opcionForm = this.fb.group({
      preguntaId: ['', Validators.required],
      texto: ['', Validators.required],
      esCorrecta: [false],
      imagen_opcion: [''],
      tipo_opcion: ['', Validators.required]
    });
  }




  onSubmit() {

    if (this.opcionForm.valid) {
      let pregunta_id:number = this.opcionForm.controls['preguntaId'].value;
      let enunciado:string = this.opcionForm.controls['texto'].value;
      let Valor_opcion:boolean = this.opcionForm.controls['esCorrecta'].value;

      let Imagen_opcion:string = this.opcionForm.controls['imagen_opcion'].value;
      let Tipo_opcion:string = this.opcionForm.controls['tipo_opcion'].value;


      this.PreguntaService.CrearOpcion(+pregunta_id, enunciado, Valor_opcion, Imagen_opcion, Tipo_opcion).subscribe(
        (data1: RespuestaServerCrearOpcion) => {
          if (data1.CODIGO == 200) {
                  //console.log('Pregunta creada');
                  //console.log('Pregunta relacionada');

                  this.toast.success({detail:"Pregunta creada",summary:'EXITO',duration:5000, position: 'topCenter'});
                  const opcion:Opcion = {
                    id: data1.DATOS?.ID_OPCION!,
                    preguntaId: +pregunta_id,
                    texto: enunciado,
                    esCorrecta: Valor_opcion,
                    imagen_opcion: Imagen_opcion,
                    tipo_opcion: Tipo_opcion,
                  };
                  this.quizService.addOpcion(opcion);
                  this.opcionForm.reset();
          }else{
            this.toast.error({detail:data1.MENSAJE!,summary:'ERROR',duration:5000, position: 'topCenter'});
          }
        }
      );
  }
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
    this.PreguntaService.CargarArchivoOpcion(formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.archivoCargado = true;
        this.nombreArchivoCargado = data.file;
        //console.log(this.nombreArchivoCargado);
        //alert("Archivo cargado correctamente.");
        this.toast.success({detail:"EXITO",summary:"Archivo cargado correctamente",duration:5000, position:'topCenter'});

        //asignar el nombre del archivo al campo del formulario del formgroup
        this.opcionForm.patchValue({
          imagen_opcion: data.file
        });


      },
      error: (err: any) => {
        //alert("Error cargando el archivo formato no valido o archivo muy pesado.");
        this.toast.error({detail:"ERROR",summary:"Error cargando el archivo formato no valido o archivo muy pesado",duration:5000, position:'topCenter'});
      }
    });
}


}
