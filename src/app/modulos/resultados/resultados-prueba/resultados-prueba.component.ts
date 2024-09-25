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
import { RespuestaServerObtenerResultadosPrueba } from '../../../Modelos/RespuestaServerObtenerResultadosPrueba.model';
import { datos_estudiante_destacado } from '../../../Modelos/datos_estudiante_destacado.model';

@Component({
  selector: 'app-resultados-prueba',
  templateUrl: './resultados-prueba.component.html',
  styleUrl: './resultados-prueba.component.css'
})
export class ResultadosPruebaComponent {

  IdPrueba: string = '';
  // Variables para almacenar los resultados de la prueba--tabla
  id_prueba: number = 0;
  Nombre_prueba: string = '';
  Duracion_prueba_minutos: number = 0;
  Total_preguntas: number = 0;
  Fecha_inicio_prueba_estudiante: Date = new Date();
  Fecha_fin_prueba_estudiante: Date = new Date();
  promedio_total_prueba: number = 0;
  numero_estudiantes_prueba: number = 0;
  promedio_tiempo_implementado_estudiantes: number = 0;

  fechainicioLegible: string = '';
  fechafinLegible: string = '';

  EstudianteDestacado: datos_estudiante_destacado = new datos_estudiante_destacado();
  EstudianteIrrelevante: datos_estudiante_destacado = new datos_estudiante_destacado();





  GraficoPastelAreas: any[] = [];
  GraficoBarrasPromediosCarrera: any[] = [];
  GraficoBarrasPromediosGrupo: any[] = [];
  GraficoBarrasPromediosEstudiantesDestacados: any[] = [];


  constructor(
    private seguridadService: SeguridadService,
    private resultadosService: ResultadosService,
    private toast: NgToastService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.IdPrueba = this.route.snapshot.params['IdPrueba'];
    console.log(this.IdPrueba);

    if (!this.IdPrueba || this.IdPrueba === '' || this.IdPrueba === '1' || this.IdPrueba === '0') {
      // Maneja el caso en el que no se proporciona un ID de contexto
    }


    this.ObtenerResultadosPrueba(this.IdPrueba);
  }

  ObtenerResultadosPrueba(id_prueba: string): void {
    this.resultadosService.ObtenerResultadosPrueba(id_prueba).subscribe(
      (data: RespuestaServerObtenerResultadosPrueba) => {
        if (data.CODIGO == 200) {
          console.log(data.DATOS);
          this.id_prueba = data.DATOS?.DATOS_PRUEBA.ID_PRUEBA!;
          this.Nombre_prueba = data.DATOS?.DATOS_PRUEBA.NOM_PRUEBA!;
          this.Fecha_inicio_prueba_estudiante = data.DATOS?.DATOS_PRUEBA.FECHA_PRUEBA_INICIO!;
          this.Fecha_fin_prueba_estudiante = data.DATOS?.DATOS_PRUEBA.FECHA_PRUEBA_FIN!;
          this.Duracion_prueba_minutos = data.DATOS?.DATOS_PRUEBA.DURACION_PRUEBA_MINUTOS!;
          this.Total_preguntas = data.DATOS?.DATOS_PRUEBA.NUMERO_PREGUNTAS!;
          this.promedio_total_prueba = data.DATOS?.PROMEDIO_TOTAL!;
          this.numero_estudiantes_prueba = data.DATOS?.NUMERO_ESTUDIANTES!;
          this.promedio_tiempo_implementado_estudiantes = data.DATOS?.PROMEDIO_TIEMPO_IMPLEMENTADO_ESTUDIANTES!;

          console.log(data);

          let fecha_inicio = new Date(this.Fecha_inicio_prueba_estudiante);
          this.fechainicioLegible = fecha_inicio.toLocaleDateString() + ' ' + fecha_inicio.toLocaleTimeString();
          let fecha_fin = new Date(this.Fecha_fin_prueba_estudiante);
          this.fechafinLegible = fecha_fin.toLocaleDateString() + ' ' + fecha_fin.toLocaleTimeString();


          //captura de diagrama de barras promedios carrera
          this.GraficoBarrasPromediosCarrera = [
            {
              "name": "General de la Prueba (Todos los estudiantes)",
              "value": data.DATOS?.PROMEDIO_TOTAL!
            }
          ];
          for (let promedio of data.DATOS?.PROMEDIO_PRUEBA_CARRERA!) {
            this.GraficoBarrasPromediosCarrera.push(
              {
                "name": promedio.NOMBRE_CARRERA,
                "value": promedio.PROMEDIO_PRUEBA_CARRERA
              }
            );
          }
          //captura de diagrama de barras grupo

          this.GraficoBarrasPromediosGrupo = [
            {
              "name": "General de la Prueba (Todos los estudiantes)",
              "value": data.DATOS?.PROMEDIO_TOTAL!
            }
          ];
          for (let promedio of data.DATOS?.PROMEDIO_PRUEBA_GRUPO!) {
            this.GraficoBarrasPromediosGrupo.push(
              {
                "name": promedio.NOMBRE_GRUPO,
                "value": promedio.PROMEDIO_PRUEBA_GRUPO
              }
            );
          }
          //captura de diagrama de torta areas

          let ListadeAreas = data.DATOS?.PORCENTAJE_ASIERTO_AREAS_EVALUADAS!;
          for (let area of ListadeAreas) {
            this.GraficoPastelAreas.push([
              { name: area.NOMBRE_AREA + " % Correcto ", value: area.PORCENTAJE_ACIERTO },
              { name: area.NOMBRE_AREA + " % Incorrecto ", value: 100 - area.PORCENTAJE_ACIERTO! }
            ]);
          }
          console.log(this.GraficoPastelAreas);

          //capturar estudiante destacado
          this.EstudianteDestacado = data.DATOS?.ESTUDIANTE_DESTACADO!;
          this.EstudianteIrrelevante = data.DATOS?.ESTUDIANTE_IRRELEVANTE!;

          //grafico de barras promedios estudiantes destacados
          this.GraficoBarrasPromediosEstudiantesDestacados = [
            {
              "name": "General de la Prueba (Todos los estudiantes)",
              "value": data.DATOS?.PROMEDIO_TOTAL!
            },
            {
              "name": "Estudiante Destacado",
              "value": data.DATOS?.ESTUDIANTE_DESTACADO.PUNTUACION_PRUEBA_ESTUDIANTE!
            },
            {
              "name": "Estudiante Irrelevante",
              "value": data.DATOS?.ESTUDIANTE_IRRELEVANTE.PUNTUACION_PRUEBA_ESTUDIANTE!
            }
          ];





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