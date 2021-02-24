import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ElementService } from './../services/element.service';
import { CsvImportService } from './../services/csvImport.service';
import { ArticleService } from './../services/article.service';
import { Subscription, forkJoin, Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { Article } from '../models/Article.model';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-import-articles',
  templateUrl: './import-articles.component.html',
  styleUrls: ['./import-articles.component.scss']
})
export class ImportArticlesComponent implements OnInit {

  progress : any;
  fileValid: boolean = false;
  errorWarning: string;
  importLog: string;
  entity: string;
  importDynastyForm : FormGroup;
  loadedCsvArray : any;
  pusheditems: { [id: string]: any; } = {};
  
  public csvToArray: any[] = [];  
  @ViewChild('csvReader') csvReader: any;  

  constructor(private router: Router, 
    private location:Location, 
    private articleService: ArticleService,
    private csvImportService: CsvImportService,
    private elementService: ElementService
  ) { }
  
    // set the table in the view and prepare the variable used to send file
  uploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.csvImportService.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvArray = (<string>csvData).split(/\r\n|\n/);  
        let headersRow = this.csvImportService.getHeaderArray(csvArray);
        let headerValidationReport = this.csvImportService.isValidCsvHeader(headersRow, this.entity);
        this.fileValid = headerValidationReport.isValid;
        this.errorWarning = headerValidationReport.errorLog;
        alert(headerValidationReport.errorLog);
        if(this.fileValid) 
        {
          this.loadedCsvArray = csvArray;
          this.csvToArray = this.csvImportService.getDataRecordsArrayFromCSVFile(csvArray, headersRow, this.entity);  
        }
        
      };  
  
      reader.onerror = function () {  
        console.log('error has occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }  
  
  

  sendCsvToServer(artistsCSVArray: any, headersRow: any) {

    let csvArr = [];  
    

    for (let i = 1; i < artistsCSVArray.length-1; i++) 
      {  
      //Send one request by line
      let formValues = new FormData();
      let currentRecord = (<string>artistsCSVArray[i]).split(','); 
      
      this.getAllElementId(formValues,  currentRecord[11], currentRecord[12], currentRecord[13], currentRecord[14], currentRecord[15],currentRecord[16],currentRecord[17],currentRecord[18]  ) 
      ;
      if (currentRecord.length == headersRow.length) 
      {  
       
         
        for (let j = 0; j < (headersRow.length-8); j++) 
        {
         
              formValues.append(headersRow[j].trim(), currentRecord[j].trim());
          }  
        }
      }  

    }  
  

  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.csvToArray = [];  
  }  



  onImportFile() {

        let headersRow = this.csvImportService.getHeaderArray(this.loadedCsvArray);  

        // send one form to back office server for each line in csv file 
  
        this.sendCsvToServer(this.loadedCsvArray, headersRow);  

  }

  ngOnInit(): void {
    this.entity = this.location.path().slice(6);
  }

  getElementId( param: string,formValues: FormData, entity: string ) : Observable<any> 
  {
    const getElemId = this.elementService.checkElement(entity+'/'+param).pipe(shareReplay());
    getElemId.subscribe((response)=> {formValues.append(entity, response); console.log(entity +' : '+param + ' : '+response);  }, (err) => {this.importLog += err;});
    return getElemId;
  }


  getAllElementId(formValues: FormData, museumParam : string, categoryParam : string, materialParam : string, discountParam : string, artistParam : string, dynastyParam : string, productParam : string, formParam ) 
  {

    let artistId = this.getElementId( artistParam,formValues, 'artist' );
    let dynastyId = this.getElementId( dynastyParam,formValues, 'dynasty');
    let categoryId = this.getElementId( categoryParam,formValues, 'category');
    let productId = this.getElementId( productParam,formValues, 'product');
    let discountId = this.getElementId( discountParam,formValues, 'discount');
    let materialId = this.getElementId( materialParam,formValues, 'material');
    let museumId = this.getElementId( museumParam,formValues, 'museum');
    let formId = this.getElementId( museumParam,formValues, 'form');
    forkJoin(artistId, dynastyId,categoryId, productId, discountId, materialId, museumId, formId ).subscribe(_ => {
      // all observables have been completed

      this.articleService.addArticle(formValues).subscribe(
        (response) => { 
          console.log(response)
       this.progress = response;
        });

    });
  }

}
