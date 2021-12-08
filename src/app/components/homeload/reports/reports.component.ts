import { Component,OnInit } from '@angular/core';
import { donutChartOptions } from '../helpers/donutChartOptions';
import { Chart} from 'angular-highcharts';
import { areaChartOptions } from '../helpers/areaChaeartOptions';
import { barChartOptions } from '../helpers/barChartOptions';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  donutChart=new Chart(donutChartOptions)
  barChart=new Chart(barChartOptions)
  areaChart=new Chart(areaChartOptions)

  ngOnInit(): void {
  }

}
