import { Component,OnInit } from '@angular/core';
import { donutChartOptions } from '../helpers/donutChartOptions';
import { Chart} from 'angular-highcharts';
import { areaChartOptions } from '../helpers/areaChaeartOptions';
import { barChartOptions } from '../helpers/barChartOptions';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  usersLength: any;
  projectsLength: any;

  constructor(private _userservice: UserService,
              private _projectservice: ProjectService){

  }


  donutChart=new Chart(donutChartOptions)
  barChart=new Chart(barChartOptions)
  areaChart=new Chart(areaChartOptions)

  ngOnInit(): void {

    this._userservice.getAllUsers().subscribe((res) => {
      this.usersLength = res.length;
      console.log("usersLength", this.usersLength)
    })



    this._projectservice.getAllProjects().subscribe((res) => {
      this.projectsLength = res.length;
      console.log("projectsLength", this.projectsLength)
    })
  }

}
