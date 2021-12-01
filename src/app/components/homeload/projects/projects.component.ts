import { Component, OnInit } from '@angular/core';
import {Project} from './../../../models/project'
import {ProjectService} from '../../../services/project.service'
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
   projects:Project[]=[]


 

  constructor(private _ProjectService:ProjectService) {
    
  }
  ngOnInit(): void {
    this.getAllProjects()
  }
  getAllProjects(){
    this._ProjectService.getAllProjects().subscribe(projectlist=>{
this.projects=projectlist
    })
  }

}
