import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { NgxImageZoomModule } from 'ngx-image-zoom';

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
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { MuseumService } from './services/museum.service';
import { BlogService } from './services/blog.service';
import { SlideService } from './services/slide.service';
import { TokenStorageService } from './services/token-storage.service';
import { FirewallService } from './services/firewall.service';
import { StatusService } from './services/status.service';
import { CsvImportService } from './services/csvImport.service';
import { ContactService } from './services/contact.service';
import { FilterPipe } from './pipes/filter';
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
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { MuseumComponent } from './museum/museum.component';
import { EditSlideshowComponent } from './edit-slideshow/edit-slideshow.component';
import { EditThemeComponent } from './edit-theme/edit-theme.component';
import { GreatmastersComponent } from './greatmasters/greatmasters.component';
import { ArtistprofileComponent } from './artistprofile/artistprofile.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { BlogComponent } from './blog/blog.component';
import { ImportDynastiesComponent } from './import-dynasties/import-dynasties.component';
import { ImportArtistsComponent } from './import-artists/import-artists.component';
import { ImportArticlesComponent } from './import-articles/import-articles.component';
import { ImportSimpleTranslationsComponent } from './import-simple-translations/import-simple-translations.component';
import { ImportMuseumComponent } from './import-museum/import-museum.component';
import { GalleryhighlightsComponent } from './galleryhighlights/galleryhighlights.component';
import { AboutComponent } from './about/about.component';
import { DisplayArtistGalleryComponent } from './display-artist-gallery/display-artist-gallery.component';


const appRoutes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'aboutCFAG', component: AboutComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'new-article', component: NewArticleComponent },
  { path: 'edit_material', component: SimpletranslationlistComponent},
  { path: 'edit_form', component: SimpletranslationlistComponent},
  { path: 'edit_product', component: SimpletranslationlistComponent},
  { path: 'edit_theme', component: EditThemeComponent},
  { path: 'edit_navigation', component: SimpletranslationlistComponent},
  { path: 'edit_sizecategory', component: SimpletranslationlistComponent},
  { path: 'edit_discount', component: EditDiscountComponent},
  { path: 'edit_artist', component: EditArtistComponent},  
  { path: 'edit_dynasty', component: EditDynastyComponent},
  { path: 'edit_article', component: EditArticleComponent},
  { path: 'edit_museum', component: MuseumComponent},
  { path: 'edit_slideshow', component: EditSlideshowComponent},
  { path: 'edit_category', component: SimpletranslationlistComponent},
  { path: 'edit_blog', component: EditBlogComponent},
  { path: 'displayArticle', component: DisplayarticleComponent}, 
  { path: 'page_highlights', component: GalleryhighlightsComponent}, 
  { path: 'page_gallery', component: GalleryComponent}, 
  { path: 'great_masters', component: GreatmastersComponent}, 
  { path: 'artist_profile', component: ArtistprofileComponent},
  { path: 'latest_story', component: BlogComponent}, 
  { path: 'chinese_painting_history', component: HistoryComponent}, 
  { path: 'learn', component: BlogComponent},
  { path: 'support_us', component: BlogComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
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
    LoginComponent,
    UserComponent,
    RegisterComponent,
    MuseumComponent,
    EditSlideshowComponent,
    EditThemeComponent,
    GreatmastersComponent,
    ArtistprofileComponent,
    EditBlogComponent,
    BlogComponent,
    ImportDynastiesComponent,
    ImportArtistsComponent,
    ImportArticlesComponent,
    ImportSimpleTranslationsComponent,
    ImportMuseumComponent,
    FilterPipe,
    GalleryhighlightsComponent,
    AboutComponent,
    DisplayArtistGalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' }),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule, 
    NgbModule,
    NgxImageZoomModule,
  ],
  providers: [
      TranslationService,
      ArticleService,
      DiscountService,
      ElementService,
      UserService,
      AuthService,
      TokenStorageService,
      authInterceptorProviders,
      FirewallService,
      MuseumService,
      SlideService,
      StatusService,
      BlogService,
      CsvImportService,
      ContactService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
