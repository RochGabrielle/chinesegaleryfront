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
history: string ;
contact: string ;
admin: string;

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {

this.translationService.translateAllEntity('en', this.componentName).subscribe(
  (response) => {
          this.history = response.history;
          this.contact = response.contact;
          this.admin   = response.admin;
        }
        //,
        //(error) => {
         // console.log('Erreur ! : ');
         // this.history = 'ca ne marche pas!';
       // }
      );
  }
}
