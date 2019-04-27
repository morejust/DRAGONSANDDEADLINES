import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import {Section} from './main/main.component';
import {EventsService} from './events.service';

export interface Section {
  name: string;
  description: string;
}

export interface Event {
  'id': number;
  'name': string;
  'score': number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
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
    }];
  events: {
    events: {
      id: number;
      name: string;
      score: number
    }[];
  };
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone,
              private eventsService: EventsService) {
  }

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
          litres: 400
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
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis<any>());
      categoryAxis.dataFields.category = 'country';

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis<any>());

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
    this.eventsService.getEvents().subscribe((res: any) => {
      this.events = res;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
