import { Component, OnInit } from '@angular/core';
import {Project} from './../../../models/project'
import {ProjectService} from '../../../services/project.service'
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
   projects:Project[]=[]
   _project:any|Project;
   oneproject:any|Project;
   editform!:FormGroup;
  constructor(private _ProjectService:ProjectService,private router: Router,private _formBuilder:FormBuilder) {

  }
  ngOnInit(): void {
    this.getAllProjects()
    this.editform=this._formBuilder.group({
      id:[""],
      name:["",[Validators.required]],
      state:["",[Validators.required]],
      budget:["",[Validators.required]],
      description:["",[Validators.required]],

     })
  };
  getAllProjects(){
    this._ProjectService.getAllProjects().subscribe(projectlist=>{
    this.projects=projectlist;
    console.log(this.projects)
    console.log(this.projects)

    })
  };
  viewDetails(pId: number): void {
   this.router.navigate(['dash/home/project-details/', pId])

  }

  Edite(id: number){
    this._ProjectService.getProjectByID(id).subscribe(res => {
      this._project=res;
      console.log(this._project)
      this.editform.controls['id'].setValue(this._project?._id);
      this.editform.controls['name'].setValue(this._project?.projectName);
      this.editform.controls['state'].setValue(this._project?.state);
      this.editform.controls['budget'].setValue(this._project?.budget);
      this.editform.controls['description'].setValue(this._project?.description);
    },(error)=>{
      //swal
    })

  }
  update(editform:any,id:number) {
    this._ProjectService.getProjectByID(editform.value._id).subscribe(res => {
      this.oneproject=res
    })
console.log(this.oneproject)
this.oneproject._id=editform.value._id;
this.oneproject.project_name=editform.value.projectName;
this.oneproject.state=editform.value.state;
this.oneproject.budget=editform.value.budget;
this.oneproject.description=editform.value.description;
console.log(this.oneproject)
this._ProjectService.UpdateProject(id,this.oneproject).subscribe(data => {
  let ref=document.getElementById('cancel')
      ref?.click()
  this.editform.reset()
  this.getAllProjects()
})
  }



  delete(id:number){
    console.log(id)

    this._ProjectService.deleteProject(id).subscribe(res => {
      this.getAllProjects()
    })
  }
}
