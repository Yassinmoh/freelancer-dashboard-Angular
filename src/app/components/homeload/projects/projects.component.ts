import { Component, OnInit } from '@angular/core';
import {Project} from './../../../models/project'
import {ProjectService} from '../../../services/project.service'
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
   projects:Project[]=[]
   _project:any|Project;
   oneproject:Project={} as Project;
   editform!:FormGroup;
   totalProjectsLength:any
   page:number=1



  constructor(private _ProjectService:ProjectService,private router: Router,private _formBuilder:FormBuilder) {

  }
  ngOnInit(): void {
    this.getAllProjects()
    this.editform=this._formBuilder.group({
      id:[""],
      name:["",[Validators.required,Validators.minLength(4)]],
      state:["",[Validators.required,Validators.minLength(4)]],
      budget:["",[Validators.required]],
      description:["",[Validators.required,Validators.minLength(10)]],

     })
  };
  getAllProjects(){
    this._ProjectService.getAllProjects().subscribe(projectlist=>{
    this.projects=projectlist;
    console.log(this.projects)
      this.totalProjectsLength=projectlist.length;
      // console.log("this.totalProjectsLength",this.totalProjectsLength)
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
      console.log("Edite error")
    })

  }
  update() {
    console.log(this.editform.controls['id'].value)
    this._ProjectService.getProjectByID(this.editform.controls['id'].value).subscribe(res => {
      this.oneproject=res
      this.oneproject._id=this.editform.controls['id'].value;
      this.oneproject.projectName=this.editform.controls['name'].value;
      this.oneproject.state=this.editform.controls['state'].value;
      this.oneproject.budget=this.editform.controls['budget'].value;
      this.oneproject.description=this.editform.controls['description'].value;
      console.log(this.oneproject)
      console.log(this.editform.controls['id'].value)
      // --------------------------------------------------fun UpdateProject----------------------------------//
      this._ProjectService.UpdateProject(this.editform.controls['id'].value,this.oneproject).subscribe(data => {
        Swal.fire({
          title: 'success!',
          text: 'Update Successfully',
          icon: 'success',
          confirmButtonText: 'ok'
        })
        let ref=document.getElementById('cancel')
            ref?.click()
        this.editform.reset()
        this.getAllProjects()
},(error)=>{
  console.log("error Update")
})
    },(error)=>{
      console.log("error")
    })

  }



  delete(id:number){
    console.log(id)
    this._ProjectService.deleteProject(id).subscribe(res => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,

        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
      this.getAllProjects()
    },(error)=>{
      console.log("error delete")
    })
  }
}
