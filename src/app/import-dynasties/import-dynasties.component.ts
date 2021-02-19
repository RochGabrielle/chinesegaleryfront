import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ElementService } from './../services/element.service';
import { CsvImportService } from './../services/csvImport.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { Dynasty } from '../models/Dynasty.model';

@Component({
  selector: 'app-import-dynasties',
  templateUrl: './import-dynasties.component.html',
  styleUrls: ['./import-dynasties.component.scss']
})
export class ImportDynastiesComponent implements OnInit {

 
  loadedCsvArray : any;
  progress : any;
  fileValid: boolean = false;
  errorWarning: string;
  entity: string;

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

  sendCsvToServer(dynastyCSVArray: any, headersRow: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < dynastyCSVArray.length; i++) 
    {  
      //Send one request by dynasty
      let formValues = new FormData();
      let curruntRecord = (<string>dynastyCSVArray[i]).split(',');  
      if (curruntRecord.length == headersRow.length) 
      {  
       
         
        for (let j = 0; j < headersRow.length; j++) 
        {
          formValues.append(headersRow[j].trim(), curruntRecord[j].trim());
          console.log(curruntRecord[j].trim());
        }
      }  
      formValues.append('entity', this.entity);
      this.elementService.addElement(formValues).subscribe(
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
