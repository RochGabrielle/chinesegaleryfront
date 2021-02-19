import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ GlobalConstants } from './../common/global-constants';
import { Observable } from 'rxjs';
import { Artist } from '../models/Artist.model';
import { Dynasty } from '../models/Dynasty.model';
import { Article } from '../models/Article.model';
import { Simpletranslation } from '../models/Simpletranslation.model';
import { Museum } from '../models/Museum.model';

@Injectable()
export class CsvImportService {
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //'Authorization': 'my-auth-token'
  })
};



constructor(private httpClient: HttpClient
        ) { }

isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  


  getHeaderArray(CSVArray: any) {  
    let headers = (<string>CSVArray[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  

  isValidCsvHeader(headerArray: any, entity : string)
  {
    let validityReport = {isValid : true, errorLog: '' };
    let model : any;
    switch(entity) 
    {
      case 'artist':
        model = new Artist();
        break;
      case 'dynasty':
        model = new Dynasty();
        break;
      case 'article':
        model = new Article();
        break;
        case 'museum':
        model = new Museum();
        break;
      case 'category':
      case 'material':
      case 'theme':
      case 'product':
      case 'navigation':
        model = new Simpletranslation();
        break;
      default:
        validityReport.errorLog += 'wrong type of entity';
        break;
    }

    
      validityReport.isValid = true;
    if ((headerArray.length == (Object.keys(model).length-1)&& entity !== 'article') || (headerArray.length == (Object.keys(model).length-3)&& entity == 'article'))
    {
      for (let i = 0; i < headerArray.length; i++) 
      {
        if(model[headerArray[i].trim()] === undefined) 
        {
          validityReport.isValid = false;
          validityReport.errorLog += headerArray[i]+" is not a valid parameter";
        }
      } 
      
    } else {
      validityReport.errorLog = "wrong number of parameters in the csv file";
      validityReport.isValid = false;
    }

    return  validityReport;
  }

  getDataRecordsArrayFromCSVFile(dynastyCSVArray: any, headerRow :any, entity: string) {  
    let csvArr = []; 
    let simpleTranslationList = ['material','category','discount', 'navigation', 'product'] 
  
    for (let i = 1; i < dynastyCSVArray.length; i++) {  
      let currentRecord = (<string>dynastyCSVArray[i]).split(',');  
      if (currentRecord.length == headerRow.length) {
          if( entity == 'artist') 
          {
            let csv: Artist = new Artist();
            for (let j= 0; j<headerRow.length; j++)
            {
              csv[headerRow[j]] = currentRecord[j];
            }  
    
            csvArr.push(csv);  
          }  else if ( entity == 'dynasty')
          {
            let csv: Dynasty = new Dynasty();
            for (let j= 0; j<headerRow.length; j++)
            {
              csv[headerRow[j]] = currentRecord[j];
            }  
    
            csvArr.push(csv);  
          } else if (entity == 'article')
          {
            let csv: Article = new Article();
            for (let j= 0; j<headerRow.length; j++)
            {
              csv[headerRow[j]] = currentRecord[j];
            }  
    
            csvArr.push(csv);  
          } else if (simpleTranslationList.includes(entity))
          {
            let csv: Simpletranslation = new Simpletranslation();
            for (let j= 0; j<headerRow.length; j++)
            {
              csv[headerRow[j]] = currentRecord[j];
            }  
    
            csvArr.push(csv);  
          } else if (entity == 'museum')
          {
            let csv: Museum = new Museum();
            for (let j= 0; j<headerRow.length; j++)
            {
              csv[headerRow[j]] = currentRecord[j];
            }  
    
            csvArr.push(csv);  
          } 
      }  
    }  
    return csvArr;  
  }  

  
}