import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

export interface Section {
  name: string;
  description: string;
}

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart: am4charts.XYChart;
  folders: Section[] = [
    {
      name: 'Сам себе безопасник I',
      description: 'Пройти проверку службы безопасности с первого раза',
    },
    {
      name: 'Сам себе безопасник I',
      description: 'Пройти проверку службы безопасности с первого раза',
    },
    {
      name: 'Сам себе безопасник I',
      description: 'Пройти проверку службы безопасности с первого раза',
    },
    {
      name: 'Сам себе безопасник I',
      description: 'Пройти проверку службы безопасности с первого раза',
    }]

  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('chartdiv', am4charts.RadarChart);

      chart.data = [
        {
        country: 'Python',
        litres: 501
      }, {
        country: 'Node.js',
        litres: 301
      }, {
        country: 'Bash',
        litres: 266
      }, {
        country: 'Angular',
        litres: 165
      }, {
        country: 'React',
        litres: 139
      }, {
        country: 'Docker',
        litres: 336
      }, {
        country: 'CI/CD',
        litres: 290
      }
      ];

      /* Create axes */
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'country';

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      /* Create and configure series */
      const series = chart.series.push(new am4charts.RadarSeries());
      series.dataFields.valueY = 'litres';
      series.dataFields.categoryX = 'country';
      series.name = 'Sales';
      series.strokeWidth = 3;

      this.chart = chart;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
