import { Component, Input } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { ResultadosService } from '../../../servicios/resultados.service';
import { NgToastService } from 'ng-angular-popup';
import { RespuestaServerObtenerResultadosPruebaEstudiante } from '../../../Modelos/RespuestaServerObtenerResultadosPruebaEstudiante.model';
import { ActivatedRoute, Route, Router } from '@angular/router';

//npm install jspdf
//npm install dom-to-image
//npm i --save-dev @types/dom-to-image
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-resultados-estudiantes-component',
  templateUrl: './resultados-estudiantes-component.component.html',
  styleUrls: ['./resultados-estudiantes-component.component.css']
})
export class ResultadosEstudiantesComponentComponent {
  IdPrueba: string = '';
  IdEstudiante: string = '';

  // Variables para almacenar los resultados de la prueba
  Nombre_estudiante: string = '';
  Num_documento_estudiante: string = '';
  Nombre_prueba: string = '';
  Fecha_inicio_prueba_estudiante: Date = new Date();
  Fecha_fin_prueba_estudiante: Date = new Date();
  Duracion_prueba_minutos: number = 0;
  Tiempo_duracion_prueba_estudiante_minutos: number = 0;
  Total_preguntas: number = 0;
  Total_preguntas_acertadas: number = 0;
  Total_preguntas_incorrectas: number = 0;
  Total_preguntas_sin_responder: number = 0;
  puntaje_obtenido: number = 0;

  fechainicioLegible: string = '';
  fechafinLegible: string = '';

  num_areas_evaluadas: number = 0;

  // Gráficos
  porcentaje_aciertos: number = 0;
  porcentaje_errores: number = 0;
  porcentaje_sin_responder: number = 0;

  GraficoTortaResultados: any[] = [];
  GraficoPastelAreas: any[] = [];
  GraficoBarrasPromedios: any[] = [];

  constructor(
    private seguridadService: SeguridadService,
    private resultadosService: ResultadosService,
    private toast: NgToastService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.IdPrueba = this.route.snapshot.params['IdPrueba'];
    this.IdEstudiante = this.route.snapshot.params['IdEstudiante'];
    console.log(this.IdPrueba);
    console.log(this.IdEstudiante);

    if (!this.IdPrueba || this.IdPrueba === '' || this.IdPrueba === '1' || this.IdPrueba === '0') {
      // Maneja el caso en el que no se proporciona un ID de contexto
    }
    if (!this.IdEstudiante || this.IdEstudiante === '' || this.IdEstudiante === '1' || this.IdEstudiante === '0') {
      // Maneja el caso en el que no se proporciona un ID de contexto
    }

    this.ObtenerResultadosPruebaEstudiante(this.IdPrueba, this.IdEstudiante);
  }

  ObtenerResultadosPruebaEstudiante(id_prueba: string, id_estudiante: string): void {
    this.resultadosService.ObtenerResultadosPruebaEstudiante(id_prueba, id_estudiante).subscribe(
      (data: RespuestaServerObtenerResultadosPruebaEstudiante) => {
        if (data.CODIGO == 200) {
          console.log(data.DATOS);
          this.Nombre_estudiante = data.DATOS?.NOMBRE_ESTUDIANTE!;
          this.Num_documento_estudiante = data.DATOS?.NUM_DOC_ESTUDIANTE!;
          this.Nombre_prueba = data.DATOS?.DATOS_PRUEBA.NOM_PRUEBA!;
          this.Fecha_inicio_prueba_estudiante = data.DATOS?.DATOS_PRUEBA.FECHA_PRUEBA_INICIO_ESTUDIANTE!;
          this.Fecha_fin_prueba_estudiante = data.DATOS?.DATOS_PRUEBA.FECHA_PRUEBA_FIN_ESTUDIANTE!;
          this.Duracion_prueba_minutos = data.DATOS?.DATOS_PRUEBA.DURACION_PRUEBA_MINUTOS!;
          this.Tiempo_duracion_prueba_estudiante_minutos = data.DATOS?.TIEMPO_TOTAL_PRUEBA_MINUTOS_ESTUDIANTE!;
          this.Total_preguntas = data.DATOS?.DATOS_PRUEBA.NUMERO_PREGUNTAS!;
          this.Total_preguntas_acertadas = data.DATOS?.PREGUNTAS_ACERTADAS!;
          this.Total_preguntas_incorrectas = data.DATOS?.PREGUNTAS_ERRADAS!;
          this.Total_preguntas_sin_responder = data.DATOS?.PREGUNTAS_SIN_RESPONDER!;
          this.puntaje_obtenido = data.DATOS?.PUNTAJE_OBTENIDO!;
          this.porcentaje_aciertos = this.Total_preguntas_acertadas / this.Total_preguntas * 100;
          this.porcentaje_errores = this.Total_preguntas_incorrectas / this.Total_preguntas * 100;
          this.porcentaje_sin_responder = this.Total_preguntas_sin_responder / this.Total_preguntas * 100;
          console.log(data);

          let fecha_inicio = new Date(this.Fecha_inicio_prueba_estudiante);
          this.fechainicioLegible = fecha_inicio.toLocaleDateString() + ' ' + fecha_inicio.toLocaleTimeString();
          let fecha_fin = new Date(this.Fecha_fin_prueba_estudiante);
          this.fechafinLegible = fecha_fin.toLocaleDateString() + ' ' + fecha_fin.toLocaleTimeString();

          this.GraficoTortaResultados = [
            { name: 'Aciertos %', value: this.porcentaje_aciertos },
            { name: 'Errores %', value: this.porcentaje_errores },
            { name: 'Sin Responder %', value: this.porcentaje_sin_responder }
          ];

          this.GraficoBarrasPromedios = [
            {
              "name": "General de la Prueba (Todos los estudiantes)",
              "value": data.DATOS?.PROMEDIO_PRUEBA_TOTAL!
            },
            {
              "name": "Carrera",
              "value": data.DATOS?.PROMEDIO_PRUEBA_CARRERA!
            },
            {
              "name": "Grupo",
              "value": data.DATOS?.PROMEDIO_PRUEBA_GRUPO!
            },
            {
              "name": "Yo",
              "value": data.DATOS?.PROMEDIO_PRUEBA_ESTUDIANTE!
            }
          ];

          this.num_areas_evaluadas = data.DATOS?.NUMERO_DE_AREAS_EVALUADAS_EN_LA_PRUEBA!;
          if (data.DATOS?.NUMERO_DE_AREAS_EVALUADAS_EN_LA_PRUEBA! > 1) {
            let ListadeAreas = data.DATOS?.PORCENTAJE_ASIERTO_AREAS_EVALUADAS!;
            for (let area of ListadeAreas) {
              this.GraficoPastelAreas.push([
                { name: area.NOMBRE_AREA + " % Correcto ", value: area.PORCENTAJE_ACIERTO },
                { name: area.NOMBRE_AREA + " % Incorrecto ", value: 100 - area.PORCENTAJE_ACIERTO! }
              ]);
            }
            console.log(this.GraficoPastelAreas);
          }

        } else {
          console.log(data);
        }
      },
      (error) => {
        console.error('Error al obtener los resultados de la prueba:', error);
      }
    );
  }

  // Función para generar y descargar el PDF
 // Función para generar y descargar el PDF
downloadPDF() {
  const element = document.getElementById('resultados-estudiantes');
  if (element) {
    const scale = 2; // Ajusta el escalado según sea necesario
    const width = element.clientWidth * scale;
    const height = element.clientHeight * scale;

    domtoimage.toPng(element, {
      width: width,
      height: height,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${element.clientWidth}px`,
        height: `${element.clientHeight}px`
      }
    })
      .then((dataUrl) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (img.height * pdfWidth) / img.width;

          // Si la imagen es más alta que una página, divide en varias páginas
          if (pdfHeight > pdf.internal.pageSize.getHeight()) {
            let y = 0;
            while (y < pdfHeight) {
              pdf.addImage(dataUrl, 'PNG', 0, -y, pdfWidth, pdfHeight);
              y += pdf.internal.pageSize.getHeight();
              if (y < pdfHeight) {
                pdf.addPage();
              }
            }
          } else {
            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
          }

          pdf.save('resultados-estudiantes.pdf');
        };
      })
      .catch((error) => {
        console.error('Error al generar la imagen:', error);
      });
  } else {
    console.error('El elemento con ID "resultados-estudiantes" no se encontró.');
  }
}

  getAreaName(name: string): string {
    const index = name.indexOf('%');
    return index !== -1 ? name.substring(0, index + 1) : name;
  }

  public colorScheme: Color = {
    name: 'custom',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    selectable: true,
    group: ScaleType.Ordinal
  };
}
