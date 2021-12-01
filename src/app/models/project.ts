export class Project {

  ID: number;
  project_name: string;
  budget: number;
  description: string;
  state: string;
  constructor(ID:number, project_name:string,budget:number,description:string,state:string,Price:number)
  {
    this.ID = ID;
    this.project_name = project_name;
    this.budget = budget;
    this.description = description;
    this.state = state;
  }

}
