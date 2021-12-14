import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Admin } from '../../../models/admin';
import { AdminService } from '../../../services/admin.service'
import { AuthService } from '../../../services/auth.service'
import { donutChartOptions } from '../helpers/donutChartOptions';
import { barChartOptions } from '../helpers/barChartOptions';
import { Chart } from 'angular-highcharts';
import { areaChartOptions } from '../helpers/areaChaeartOptions';
import { ProjectService } from 'src/app/services/project.service';
import { color, Options } from 'highcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],


})

export class DashboardComponent implements OnInit {

  admins: Admin[] = []
  userName: string = ''
  textDir: any = 'ltr'
  user: any
  usersLength: any;
  projectsLength: any;
  // -------------------------------------------------
  projectPending:number=0
  projectCompleted:number=0
  projectCompletedNo:number=0
  noOfUser:number=0
  barChart:any


  constructor(private _adminservice: AdminService,
    private _authService: AuthService,
    public translate: TranslateService,
    private _userservice: UserService,
    private _projectservice: ProjectService) {

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'ar') {
        console.log(event.lang)
        this.textDir = 'rtl';
      }
      else {
        this.textDir = 'ltr';
      }
      console.log(this.textDir)
    })


    // this.chart1.GetUsersForChart().subscribe((data)=>{
    //   this.user=data
    //   console.log('this.user',this.user)
    // })
  }

  ngOnInit() {
    // this.getAllAdmin();


    this.userName = JSON.stringify(localStorage.getItem('userName') || '{}')
    console.log("userName", this.userName)

    this._userservice.getAllUsers().subscribe((res) => {
      this.usersLength = res.length;
      console.log("usersLength", this.usersLength)
    })


    this._projectservice.getAllProjects().subscribe((res) => {
      this.projectsLength = res.length;
      console.log("projectsLength", this.projectsLength)
    })


    this._adminservice.getAllAdmins().subscribe((res) => {
      this.admins=res
      console.log(this.admins)
    })

    // ---------------------------------------------------------------

    this._projectservice.getNoOfPendingProjects().subscribe((data)=>{
      this.projectPending=data.noOfPendingProjects
      // console.log(this.projectPending)
      let x;
      this._projectservice.getNoOfCompletedProjects().subscribe((data)=>{
        this.projectCompleted=data.noOfcompletedProjects
        this.projectCompletedNo=this.projectCompleted
        this.projectCompleted=data.noOfcompletedProjects/(data.noOfcompletedProjects + this.projectPending)
        this.projectCompleted=this.projectCompleted*100
        x=this.projectCompleted
        // console.log(this.projectPending)
        let drowshap=()=>{
          const barChartOptions: Options={

            chart: {
              type: 'column'
          },
          title: {
              text: 'All Project'
          },
          subtitle: {
              text: 'Click the columns to view Number of Project '
          },
          accessibility: {
              announceNewData: {
                  enabled: true
              }
          },
          xAxis: {
              type: 'category'
          },
          yAxis: {
              title: {
                  text: ''
              }

          },
          legend: {
              enabled: false
          },
          plotOptions: {
              series: {
                  borderWidth: 0,
                  dataLabels: {
                      enabled: true,
                      format: '{point.y:.1f}%'
                  }
              }
          },

          tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
          },

          series: [
              {
                  name: "Projects",
                  colorByPoint: true,
                  type:"column",
                  data: [
                      {
                          name: "Completed Projects",

                          y: this.projectCompleted,
                          drilldown: "Chrome"
                      },
                      {
                          name: "Pendding Projects",
                          y: 100 - this.projectCompleted,
                          drilldown: "Firefox"
                      },
                      {
                          name: "All Project",
                          y: 100,
                          drilldown: "Internet Explorer"
                      }



                  ]
              }
          ],
          drilldown: {
              series: [
                  {
                      name: "Chrome",
                      id: "Chrome",
                      type:"column",
                      data: [
                          [
                              "v65.0",
                              0.1
                          ],
                          [
                              "v64.0",
                              1.3
                          ],
                          [
                              "v63.0",
                              53.02
                          ],
                          [
                              "v62.0",
                              1.4
                          ],
                          [
                              "v61.0",
                              0.88
                          ],
                          [
                              "v60.0",
                              0.56
                          ],
                          [
                              "v59.0",
                              0.45
                          ],
                          [
                              "v58.0",
                              0.49
                          ],
                          [
                              "v57.0",
                              0.32
                          ],
                          [
                              "v56.0",
                              0.29
                          ],
                          [
                              "v55.0",
                              0.79
                          ],
                          [
                              "v54.0",
                              0.18
                          ],
                          [
                              "v51.0",
                              0.13
                          ],
                          [
                              "v49.0",
                              2.16
                          ],
                          [
                              "v48.0",
                              0.13
                          ],
                          [
                              "v47.0",
                              0.11
                          ],
                          [
                              "v43.0",
                              0.17
                          ],
                          [
                              "v29.0",
                              0.26
                          ]
                      ]
                  },
                  {
                      name: "Firefox",
                      id: "Firefox",
                      type:"column",
                      data: [
                          [
                              "v58.0",
                              1.02
                          ],
                          [
                              "v57.0",
                              7.36
                          ],
                          [
                              "v56.0",
                              0.35
                          ],
                          [
                              "v55.0",
                              0.11
                          ],
                          [
                              "v54.0",
                              0.1
                          ],
                          [
                              "v52.0",
                              0.95
                          ],
                          [
                              "v51.0",
                              0.15
                          ],
                          [
                              "v50.0",
                              0.1
                          ],
                          [
                              "v48.0",
                              0.31
                          ],
                          [
                              "v47.0",
                              0.12
                          ]
                      ]
                  },

                  {
                      name: "Safari",
                      id: "Safari",
                      type:"column",
                      data: [
                          [
                              "v11.0",
                              3.39
                          ],
                          [
                              "v10.1",
                              0.96
                          ],
                          [
                              "v10.0",
                              0.36
                          ],
                          [
                              "v9.1",
                              0.54
                          ],
                          [
                              "v9.0",
                              0.13
                          ],
                          [
                              "v5.1",
                              0.2
                          ]
                      ]
                  }

              ]

          }

          }
          this.barChart=new Chart(barChartOptions)
        }
        drowshap()

      });
      console.log("x==="+x)


    });
    this._userservice.getNoOfUsers().subscribe((data)=>{
      this.noOfUser=data.allUserNo
    })
  console.log(this.projectCompleted)






  }

  // getAllAdmin(){
  //   this._adminservice.getAllAdmins().subscribe((res) => {
  //     this.admins=res
  //     console.log(this.admins)
  //   })
  // }


  // donutChart = new Chart(donutChartOptions)
  // barChart = new Chart(barChartOptions)
  // areaChart = new Chart(areaChartOptions)

  donutChart=new Chart(donutChartOptions)
  // barChart=new Chart(this.barChartOptions)
  areaChart=new Chart(areaChartOptions)

}
