import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('textinput') inputTformmaster! :ElementRef;

  typesOfShoes: string[]=[]
  constructor() { 
    this.typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  }

  ngOnInit(): void {
  }

  changecolor(){
    // this.inputTformmaster.nativeElement.style.Color ="blue";
  //  console.log("ddd")
  }

}
