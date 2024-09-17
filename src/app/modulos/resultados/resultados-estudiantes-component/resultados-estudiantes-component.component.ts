import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-resultados-estudiantes-component',
  templateUrl: './resultados-estudiantes-component.component.html',
  styleUrl: './resultados-estudiantes-component.component.css'
})
export class ResultadosEstudiantesComponentComponent {
  public chartData = [
    { name: 'Enero', value: 40 },
    { name: 'Febrero', value: 80 },
    { name: 'Marzo', value: 65 }
  ];

  public data = [
    {
      "name": "Group A",
      "series": [
        {
          "name": "2020",
          "value": 6200
        },
        {
          "name": "2021",
          "value": 7300
        }
      ]
    },
    {
      "name": "Group B",
      "series": [
        {
          "name": "2020",
          "value": 5400
        },
        {
          "name": "2021",
          "value": 6700
        }
      ]
    }
  ];



  barChartData = [
    {
      "name": "Resultado de la Prueba",
      "series": [
        { "name": "Enero", "value": 65 },
        { "name": "Febrero", "value": 59 },
        { "name": "Marzo", "value": 80 }
      ]
    },
    {
      "name": "Promedio del Grupo",
      "series": [
        { "name": "Enero", "value": 70 },
        { "name": "Febrero", "value": 75 },
        { "name": "Marzo", "value": 85 }
      ]
    },
    {
      "name": "Promedio de Carreras",
      "series": [
        { "name": "Enero", "value": 60 },
        { "name": "Febrero", "value": 65 },
        { "name": "Marzo", "value": 70 }
      ]
    }
  ];

  singleBarChartData = [
    {
      "name": "P_prueba",
      "value": 65
    },
    {
      "name": "P_salon",
      "value": 60
    },
    {
      "name": "P_carrera",
      "value": 60
    },
    {
      "name": "P_estudiante",
      "value": 70
    }
  ];


  pieChartData = [
    { "name": "Resultados", "value": 65 },
    { "name": "Restante", "value": 35 } // 100 - 65 = 35
  ];

  lineChartData = [
    {
      "name": "Resultado de la Prueba",
      "series": [
        { "name": "Enero", "value": 65 },
        { "name": "Febrero", "value": 59 },
        { "name": "Marzo", "value": 80 }
      ]
    },
    {
      "name": "Promedio del Grupo",
      "series": [
        { "name": "Enero", "value": 70 },
        { "name": "Febrero", "value": 75 },
        { "name": "Marzo", "value": 85 }
      ]
    },
    {
      "name": "Promedio de Carreras",
      "series": [
        { "name": "Enero", "value": 60 },
        { "name": "Febrero", "value": 65 },
        { "name": "Marzo", "value": 70 }
      ]
    }
  ];


  public chartView: [number, number] = [700, 400];

  public colorScheme: Color = {
    name: 'custom',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    selectable: true,
    group: ScaleType.Ordinal // Utiliza ScaleType.Ordinal en lugar de 'Ordinal'
  };

  public showLegend = true;
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Meses';
  public showYAxisLabel = true;
  public yAxisLabel = 'Valor';
}
