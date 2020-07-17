import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BandeauComponent } from './bandeau/bandeau.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FooterComponent } from './footer/footer.component';
import { HistoryComponent } from './history/history.component';
import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { TranslationService } from './services/translation.service';

const appRoutes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'history', component: HistoryComponent },
  { path: '', component: ContactComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    BandeauComponent,
    GalleryComponent,
    FooterComponent,
    HistoryComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
      TranslationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
