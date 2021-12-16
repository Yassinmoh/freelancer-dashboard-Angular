import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  textDir: any = 'ltr'
  constructor(public translate: TranslateService) {
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
  }

  ngOnInit(): void {
  }

}
