import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
import { ArticleService } from './services/article.service';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { NewArticleComponent } from './new-article/new-article.component';

const appRoutes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'new-article', component: NewArticleComponent },
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
    ContactComponent,
    EditArticleComponent,
    ArticleListComponent,
    NewArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
      TranslationService,
      ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
