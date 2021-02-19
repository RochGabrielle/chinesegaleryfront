import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { TranslationService } from './../services/translation.service';
import { CsvImportService } from './../services/csvImport.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { Simpletranslation } from '../models/Simpletranslation.model';

@Component({
  selector: 'app-import-simple-translations',
  templateUrl: './import-simple-translations.component.html',
  styleUrls: ['./import-simple-translations.component.scss']
})
export class ImportSimpleTranslationsComponent implements OnInit {

  loadedCsvArtistsArray : any;
  progress : any;
  fileValid: boolean = false;
  errorWarning: string;
  importLog: string;
  entity: string;
  importDynastyForm : FormGroup;
  loadedCsvArray : any;
  
  public csvToArray: any[] = [];  
  @ViewChild('csvReader') csvReader: any;  

  constructor(private router: Router, 
    private location:Location, 
    private csvImportService: CsvImportService,
    private translationService: TranslationService
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
  

sendCsvToServer(dynastyCSVArray: any, headersRow: any) {  
  let csvArr = [];  

  for (let i = 1; i < dynastyCSVArray.length; i++) 
  {  
    //Send one request by dynasty
    let formValues = new FormData();
    let currentRecord = (<string>dynastyCSVArray[i]).split(',');
    const newTranslation = new Simpletranslation();
      newTranslation.id = currentRecord[0];
      newTranslation.placeholder = currentRecord[1];
      newTranslation.name_en_gb = currentRecord[2];
      newTranslation.name_fr_fr = currentRecord[3];
      newTranslation.entity = this.entity;
      
    this.translationService.addTranslation(newTranslation).subscribe(
      (response) => { 
        console.log(response)
     this.progress = response;
      });   
  }   
}  


fileReset() {  
  this.csvReader.nativeElement.value = "";  
  this.csvToArray = [];  
}  



ngOnInit(): void {
  this.entity = this.location.path().slice(6);
}


onImportFile() {
      let headersRow = this.csvImportService.getHeaderArray(this.loadedCsvArray);  

      // send one form to back office server for each line in csv file 

      this.sendCsvToServer(this.loadedCsvArray, headersRow);  
}
}
