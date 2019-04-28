import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import {Section} from './main/main.component';
import {EventsService} from './events.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

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
    id: number;
    name: string;
    score: number
  }[];
  isLoading = true;
  isBattle = false;
  isTeam = false;
  private chart: am4charts.XYChart;
  stories = [
    'Deepbane - он молодой дракон. У него фиолетовая чешуя и исключительно большие крылья. Его дыхание - струя ядовитой жидкости. Он очень мистический. Он живет в экзотических джунглях. Его клад бесконечно мал и почти полностью состоит из магических артефактов.',
    'Slimegout - он молодой дракон. У него синие чешуи и заметно большие и злые когти. Его дыхание - вязкая слизь. Он очень любопытен. Он живет в разрушенном городе в пустыне. Его запас бесконечно мал.',
    'Redscholar the Wise - она ​​древний дракон. У нее красные чешуйки и гребни на спине. Ее дыхание - вязкая слизь. Она ученый в глубине души. Ее знание подземного мира детально. Она живет в заброшенном подземном городе. Ее клад впечатляет и почти полностью состоит из ценных руд с преобладанием серебра.'
  ];

  constructor(private zone: NgZone,
              private eventsService: EventsService,
              private http: HttpClient,
              private route: ActivatedRoute) {
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
      this.events = res.events.slice(0, 5);
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    this.route.queryParams.subscribe(res => {
      if (res.route === 'battle') {
        this.isBattle = true;
        this.isTeam = false;
      } else if (res.route === 'team') {
        this.isTeam = true;
        this.isBattle = false;
      } else {
        this.isTeam = false;
        this.isBattle = false;
      }
      console.log(this.isBattle);
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
