import { Component, OnInit } from '@angular/core';
import { TranslationService } from './../services/translation.service';
import { Subscription } from 'rxjs';
import { TokenStorageService } from './../services/token-storage.service';


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
private roles: string[];
isLoggedIn = false;
showAdminBoard = false;
showModeratorBoard = false;
username: string;

  constructor(private translationService: TranslationService,
              private tokenStorageService: TokenStorageService) 
  { }

  ngOnInit(): void {

this.translationService.translateAllEntity('en_gb', this.componentName).subscribe(
  (response) => {
          this.home = response.home;
          this.history = response.history;
          this.contact = response.contact;
          this.admin   = response.admin;
        }
      );

this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
