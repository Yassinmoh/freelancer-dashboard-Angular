export class Project {
  _id: number;
  projectName: string;
  budget: number;
  description: string;
  state: string;
  constructor(_id:number, projectName:string,budget:number,description:string,state:string,Price:number)
  {
    this._id = _id;
    this.projectName = projectName;
    this.budget = budget;
    this.description = description;
    this.state = state;
  }

}

