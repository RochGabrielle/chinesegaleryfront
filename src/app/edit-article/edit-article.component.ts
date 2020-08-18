import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ArticleService } from './../services/article.service';
import { ElementService } from './../services/element.service';
import { TranslationService } from './../services/translation.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { Article } from '../models/Article.model';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
entity: string;
article: {id: number, title: string,title_en_gb: string, title_fr_fr: string, title_cn_cn: string, birth: number, artist: any[], dynasty: any[], price: number, discount: any[], en_gb: string, fr_fr: string, material: any[], length: number, width: number, category?: string[], theme?: string[]};
articles: Array<{id: number, title: string, birth: number, category: any[], material: any[]}>;
articleForm : FormGroup;
edition: boolean = false;
dynastyList: Array<{id: number, name: string}>;
materialList: Array<{id: number, name: string}>;
artistList: Array<{id: number, name: string}>;
museumList: Array<{id: number, name: string}>;
categoryList: Array<{id: number, name: string}>;
discountList: Array<{id: number, name: string}>;
themeList: Array<{id: number, name: string}>;
sizeCategoryList: Array<{id: number, name: string}>;
sizes: FormArray;
imageSrc: string| ArrayBuffer=null;
smallImage: string| Blob;
bigImage: string| Blob;

headers = ["title", "date of creation", "price", "category", "material", "discount"];

constructor(private router: Router, 
   				private location:Location, 
   				private articleService: ArticleService,
   				private elementService: ElementService,
   				private translationService: TranslationService,
   				private formBuilder: FormBuilder) 
   				{ }

	edit( id: number = 0,
        title: string = '', 
        title_en_gb: string = '',
        title_fr_fr: string = '',
        title_cn_cn: string = '',
        birth: number = 0, 
        price: number = 0, 
        category:  number = 0, 
        material:  number = 0,
        discount:  number = 0, 
        artist:  number = 0, 
        dynasty:  number = 0, 
        museum:  number = 0, 
        en_gb: string = '',
        fr_fr: string = '',
        cn_cn: string = '',
        sizes:  any[] = []
        ) {
	this.initForm(id, title,title_en_gb, title_fr_fr, title_cn_cn, birth, price,category, material,discount, artist,dynasty,museum, en_gb, fr_fr, cn_cn, sizes );
	}

	add() {
  this.initForm( 0, '', '', '', '',
         0, 
         0, 
         0, 
         0,
         0, 
         0, 
         0,
         0, 
        '',
        '',
        '',
        []);
  }


  status(e) {
    var data: {[key: string]: string} = 
    {
      id: e.target.name,
      status: e.target.value,
      entity: 'article'
    };
this.articleService.updateStatus(JSON.stringify(data)).subscribe(
  (response) => {

  }
  );
}

  getSizes() : FormArray {
   return this.articleForm.get('sizes') as FormArray;

  }

  createSizeForm(width: number= 0, length: number = 0, sizeId: number = 0, sizecategoryId: number = 0): FormGroup {
  return this.formBuilder.group({
    width: width,
    length: length,
    sizeId: sizeId,
    sizecategoryId: sizecategoryId
  });
}

  addSize() {
  this.sizes = this.articleForm.get('sizes') as FormArray;
  this.sizes.push(this.createSizeForm());
  }

  getSimpleList(entity: string = '') {
   this.translationService.simpletranslationlist(entity,'false').subscribe(
  (response) => {

  this[entity+'List'] =response;         
        }
      );
  }

  getElementList(entity: string = '') {
    this.elementService.simpleelementlist(entity).subscribe(
    (response) => {
    
    this[entity+'List'] =response;         
        }
      );
  }

  get f(){
    return this.articleForm.controls;
  }

  smallImageChange(event) {
  let me = this;
  

    me.smallImage = event.target.files[0];

    const fd = new FormData();    
  }
  
  bigImageChange(event) {
  let me = this;
  

    me.bigImage = event.target.files[0];

    const fd = new FormData();
    console.log('send file');
    
  }   


	initForm( 
        id: number = 0,
        title: string = '', 
        title_en_gb: string = '', 
        title_fr_fr: string = '', 
        title_cn_cn: string = '', 
        birth: number = 0, 
        price: number = 0, 
        category:  number = 0, 
        material:  number = 0,
        discount:  number = 0, 
        artist:  number = 0, 
        dynasty:  number = 0, 
        museum: number = 0, 
        en_gb: string = '',
        fr_fr: string = '',
        cn_cn: string = '',
        sizes: any[] 
        ) {
	

	this.getSimpleList('category');
  this.getSimpleList('discount');
  this.getSimpleList('sizecategory');
  this.getSimpleList('theme');
  this.getSimpleList('museum');
  this.getSimpleList('artist');
  this.getSimpleList('dynasty');

      this.translationService.simpletranslationlist('material', 'false').subscribe(
  (response) => {
  console.log(response);
  this.materialList =response;


    this.edition = true;   

      this.articleForm = new FormGroup({
      id: new FormControl(id),
      title: new FormControl(title),
      title_en_gb: new FormControl(title),
      title_fr_fr: new FormControl(title),
      title_cn_cn: new FormControl(title),
      birth: new FormControl(birth),
      price: new FormControl(price),
      category: new FormControl(category),
      material: new FormControl(material),
      discount: new FormControl(material),
      artist: new FormControl(artist),
      dynasty: new FormControl(dynasty),
      museum: new FormControl(museum),
      en_gb: new FormControl(en_gb),
      fr_fr: new FormControl(fr_fr),
      cn_cn: new FormControl(cn_cn),
      sizes: this.formBuilder.array([
      this.createSizeForm()
            ]),
      smallImage: new FormControl(),
      bigImage: new FormControl(),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
      });
    }
  );     
	}

	onSubmitForm(){
	console.log('helloesss');

	const formValue = this.articleForm.value;
    const newArticle = new Article(
      formValue['id'],
      formValue['title'],
      formValue['title_en_gb'],
      formValue['title_fr_fr'],
      formValue['title_cn_cn'],
      formValue['birth'],
      formValue['price'],
      formValue['category'],
      formValue['material'],
      formValue['discount'],
      formValue['artist'],
      formValue['dynasty'],
      formValue['museum'],
      formValue['en_gb'],
      formValue['fr_fr'],
      formValue['cn_cn'],
      formValue['sizes'],
      formValue['smallImage'],
      formValue['bigImage'],
    );
    console.log( 'string sizes:');
    console.log(formValue['sizes'],);
    const formValues = new FormData();
    formValues.append('id', formValue['id']);
    formValues.append('title', formValue['title']);
    formValues.append('title_en_gb', formValue['title']);
    formValues.append('title_fr_fr', formValue['title']);
    formValues.append('title_cn_cn', formValue['title']);
    formValues.append('birth', formValue['birth']);
    formValues.append('price', formValue['price']);
    formValues.append('category', formValue['category']);
    formValues.append('material', formValue['material']);
    formValues.append('discount', formValue['discount']);
    formValues.append('artist', formValue['artist']);
    formValues.append('dynasty', formValue['dynasty']);
    formValues.append('museum', formValue['museum']);
    formValues.append('en_gb', formValue['en_gb']);
    formValues.append('fr_fr', formValue['fr_fr']);
    formValues.append('cn_cn', formValue['cn_cn']);
    formValues.append('sizes', JSON.stringify(formValue['sizes']));
    formValues.append('fr_fr', formValue['fr_fr']);
    formValues.append('smallImage', this.smallImage);
    formValues.append('bigImage', this.bigImage);
    console.log( 'form dataaaaaaa:');
   
    console.log( formValues.get('sizes'));

    this.articleService.addArticle(formValues).subscribe(
  (response) => { 

  this.router.navigate([this.location.path()]);
  console.log(this.location.path());
  console.log(response);
  this.router.navigate(['edit_article']);
  this.edition = false; 
  }
  );

  const formData = new FormData();
    formData.append('file', this.articleForm.get('fileSource').value);
   console.log(formData);
    
	}

  ngOnInit(): void {
  this.entity = this.location.path().slice(6);
  this.articleService.articlelist().subscribe(
  (response) => {
  console.log(Object.values(response));
  this.articles = Object.values(response);

        }
      );
  console.log(this.entity);
  console.log(this.router.url);
}

}
