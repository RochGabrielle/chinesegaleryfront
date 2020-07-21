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

this.translationService.translate('en', this.componentName, 'history').subscribe(
  (response) => {
          this.history = response;
          console.log(this.history);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
          this.history = 'ca ne marche pas!';
        }
      );
 this.translationService.translate('fr', this.componentName, 'contact').subscribe(
  (response) => {
  		this.contact = response;
  },
  (error) => {
          console.log('Erreur ! : ' + error);
        }

  );
  this.translationService.translate('fr', this.componentName, 'admin').subscribe(
  (response) => {
      this.admin = response;
  },
  (error) => {
          console.log('Erreur ! : ' + error);
        }

  );
  }
}
