import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss']
})
export class AsideNavComponent implements OnInit {
  textDir:any ='ltr'
  constructor(public translate:TranslateService) {
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
