import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import {Section} from './main/main.component';
import {EventsService} from './events.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef} from '@angular/material';

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
      name: 'Контрибьютор недели IV',
      description: 'Внести самый большой вклад в проект за неделю',
    },
    {
      name: 'Один в поле воин VI',
      description: 'Поднять упавший прод после пятничного релиза в субботу',
    },
    {
      name: 'А что, так можно было?',
      description: 'Покрыть тестами 100% кода',
    }];
  events: {
    id: number;
    name: string;
    score: number
  }[];
  isLoading = true;
  isBattle = false;
  isTeam = false;
  experience = 40;
  accessoir = 'Blank';
  avatarSrc = `https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=${this.accessoir}&hairColor=Blonde&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Default&eyebrowType=SadConcerned&mouthType=Default&skinColor=Brown`;
  stories = [
    'Deepbane - он молодой дракон. У него фиолетовая чешуя и исключительно большие крылья. Его дыхание - струя ядовитой жидкости. Он очень мистический. Он живет в экзотических джунглях. Его клад бесконечно мал и почти полностью состоит из магических артефактов.',
    'Slimegout - он молодой дракон. У него синие чешуи и заметно большие и злые когти. Его дыхание - вязкая слизь. Он очень любопытен. Он живет в разрушенном городе в пустыне. Его запас бесконечно мал.',
    'Redscholar the Wise - она ​​древний дракон. У нее красные чешуйки и гребни на спине. Ее дыхание - вязкая слизь. Она ученый в глубине души. Ее знание подземного мира детально. Она живет в заброшенном подземном городе. Ее клад впечатляет и почти полностью состоит из ценных руд с преобладанием серебра.'
  ];
  isAttacking = false;
  dragonHP = 90;
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone,
              private eventsService: EventsService,
              private http: HttpClient,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
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

  goToPizza() {
    window.open('https://dominospizza.ru/');
  }

  attack() {
    this.isAttacking = true;
    this.openDialog();
    setTimeout(() => {
      this.isAttacking = false;
      this.dragonHP -= 25;
    }, 500);
  }

  setAccessoir() {
    if (this.accessoir === 'Blank') {
      this.accessoir = 'Sunglasses';
    } else {
      this.accessoir = 'Blank';
    }

    this.avatarSrc = `https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=${this.accessoir}&hairColor=Blonde&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Default&eyebrowType=SadConcerned&mouthType=Default&skinColor=Brown`;
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px'
    });

    setTimeout(() => {
      this.dialog.closeAll();
    }, 500)

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  template: `
    <img src="../assets/damage.gif" class="damage_popup">
  `,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
