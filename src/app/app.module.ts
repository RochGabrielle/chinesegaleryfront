import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
import { DiscountService } from './services/discount.service';
import { SizecategoryService } from './services/sizecategory.service';
import { ElementService } from './services/element.service';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { SimpletranslationlistComponent } from './simpletranslationlist/simpletranslationlist.component';
import { EditsimpletranslationComponent } from './editsimpletranslation/editsimpletranslation.component';
import { EditArtistComponent } from './edit-artist/edit-artist.component';
import { EditDiscountComponent } from './edit-discount/edit-discount.component';
import { EditSizeCategoryComponent } from './edit-size-category/edit-size-category.component';
import { DynastyComponent } from './dynasty/dynasty.component';
import { EditDynastyComponent } from './edit-dynasty/edit-dynasty.component';
import { HomeComponent } from './home/home.component';
import { DisplayarticleComponent } from './displayarticle/displayarticle.component';

const appRoutes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'new-article', component: NewArticleComponent },
  { path: 'edit_material', component: SimpletranslationlistComponent},
  { path: 'edit_category', component: SimpletranslationlistComponent},
  { path: 'edit_theme', component: SimpletranslationlistComponent},
  { path: 'edit_navigation', component: SimpletranslationlistComponent},
  { path: 'edit_sizecategory', component: SimpletranslationlistComponent},
  { path: 'edit_discount', component: EditDiscountComponent},
  { path: 'edit_artist', component: EditArtistComponent},  
  { path: 'edit_dynasty', component: EditDynastyComponent},
  { path: 'edit_article', component: EditArticleComponent},
  { path: 'displayArticle', component: DisplayarticleComponent},   
  { path: 'home', component: HomeComponent },
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
    NewArticleComponent,
    SimpletranslationlistComponent,
    EditsimpletranslationComponent,
    EditArtistComponent,
    EditDiscountComponent,
    EditSizeCategoryComponent,
    DynastyComponent,
    EditDynastyComponent,
    HomeComponent,
    DisplayarticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule, 
    NgbModule,
  ],
  providers: [
      TranslationService,
      ArticleService,
      DiscountService,
      ElementService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
