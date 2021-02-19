import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ElementService } from './../services/element.service';
import { CsvImportService } from './../services/csvImport.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { Artist } from '../models/Artist.model';

@Component({
  selector: 'app-import-artists',
  templateUrl: './import-artists.component.html',
  styleUrls: ['./import-artists.component.scss']
})
export class ImportArtistsComponent implements OnInit {

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
    private elementService: ElementService,
    private csvImportService: CsvImportService
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
      //Send one request by dynasty
      let formValues = new FormData();
      let currentRecord = (<string>artistsCSVArray[i]).split(',');  
      if (currentRecord.length == headersRow.length) 
      {  
       
         
        for (let j = 0; j < (headersRow.length-1); j++) 
        {
          formValues.append(headersRow[j].trim(), currentRecord[j].trim());
        }
      }  
      formValues.append('entity', 'artist');

      // check if dynasty field is valid
      if(currentRecord[12] !== '') 
      {
        console.log(currentRecord[12]);
        this.elementService.checkElement('dynasty/'+currentRecord[12].trim(), ).subscribe(
          (response) => { 
            console.log(response);
           
            if(response !=='none')
            {
              formValues.append(headersRow[12].trim(), response);
              this.elementService.addElement(formValues).subscribe(
                (response) => { 
                  console.log(response)
               this.progress = response;
                });
            } else
            {
              this.importLog += currentRecord[12].trim() + " dynasty doesn't exist ";
            }
          });
      } 
    }  
    alert( this.importLog);
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

}