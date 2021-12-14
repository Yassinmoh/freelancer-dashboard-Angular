import { MatListSubheaderCssMatStyler } from "@angular/material/list";
//firstName lastName userName Email Rating Country
export class Admin {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    Status: string;
    Email:string;
    Password:string;
    Phone:number;
    typeUser:string;
    Rating:string;
    whatDo:string;
     Description:string;
     Language:string
    dateOfBirth:Date;
    linkAcount:string;
    Address:string;
    City:string;
    State:string;
    zipCode:string;
    Country:string;

    constructor(_id: string,
      firstName: string,
      lastName: string,
      userName: string,
      Status: string,
      Email:string,
      Password:string,
      Phone:number,
      typeUser:string,
      Rating:string,
      whatDo:string,
       Description:string,
       Language:string,
      dateOfBirth:Date,
      linkAcount:string,
      Address:string,
      City:string,
      State:string,
      zipCode:string,
      Country:string)
    {
      this._id = _id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.userName = userName;
      this.Password=Password;
      this.Language=Language;
      this.Status = Status;
      this.Email=Email;
      this.Phone=Phone;
      this.typeUser=typeUser;
      this.Rating=Rating;
      this.whatDo=Password;
      this.Description=Description;
      this.dateOfBirth=dateOfBirth;
      this.linkAcount=linkAcount;
      this.Address=Address;
      this.City=City;
      this.State=State;
     this.zipCode=zipCode
      this.Country=Country

    }
}
