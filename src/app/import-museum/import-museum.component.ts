import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { MuseumService } from './../services/museum.service';
import { CsvImportService } from './../services/csvImport.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { Museum } from '../models/Museum.model';

@Component({
  selector: 'app-import-museum',
  templateUrl: './import-museum.component.html',
  styleUrls: ['./import-museum.component.scss']
})
export class ImportMuseumComponent implements OnInit {

  progress : any;
  fileValid: boolean = false;
  errorWarning: string;
  importLog: string;
  entity: string;
  loadedCsvArray : any;
  
  public csvToArray: any[] = [];  
  @ViewChild('csvReader') csvReader: any;  

  constructor(private router: Router, 
    private location:Location, 
    private csvImportService: CsvImportService,
    private museumService: MuseumService
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
    const newTranslation = new Museum();
      newTranslation.id = currentRecord[0];
      newTranslation.placeholder = currentRecord[1];
      newTranslation.name_en_gb = currentRecord[2];
      newTranslation.name_fr_fr = currentRecord[3];
      newTranslation.name_cn_cn = currentRecord[4];
      newTranslation.link = currentRecord[5];
      newTranslation.linkname = currentRecord[6];
      
    this.museumService.addMuseum(newTranslation).subscribe(
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
