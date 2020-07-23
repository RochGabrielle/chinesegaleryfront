import { Component, OnInit } from '@angular/core';
import { TranslationService } from './../services/translation.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

componentName: string = "navigation";
home: string;
history: string ;
contact: string ;
admin: string;

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {

this.translationService.translateAllEntity('en_gb', this.componentName).subscribe(
  (response) => {
          this.home = response.home;
          this.history = response.history;
          this.contact = response.contact;
          this.admin   = response.admin;
        }
      );
  }
}
