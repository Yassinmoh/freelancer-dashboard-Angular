export class Project {
  _id: number;
  project_name: string;
  budget: number;
  description: string;
  state: string;
  constructor(_id:number, project_name:string,budget:number,description:string,state:string,Price:number)
  {
    this._id = _id;
    this.project_name = project_name;
    this.budget = budget;
    this.description = description;
    this.state = state;
  }

}
