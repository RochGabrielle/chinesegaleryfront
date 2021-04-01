import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
name:"filter"
})
export class FilterPipe implements PipeTransform{

    /*
    * search by artist and piece title
    */
    transform(items, searchTerm, filterTerms){
        console.log(filterTerms);
        let filterFields: string[] = ['dynasty', 'theme'];
        let searchFields: string[] = ['artist', 'title'];
        let filteredList=[];
        console.log(items);
        if(searchTerm)
        {
            let newSearchTerm=!isNaN(searchTerm)? searchTerm.toString(): searchTerm.toString().toUpperCase();
            let prop;
            return items.filter(item=>{
                for(let key of searchFields)
                {
                    console.log(key);
                    if( Array.isArray(item[key]) ) // for artist, dynasty
                    {
                        console.log('array'+item[key]);
                        prop=isNaN(item[key][0]['name']) ? item[key][0]['name'].toString().toUpperCase() : item[key][0]['name'].toString();
                    } else if ( typeof item[key] == 'string')
                    {
                        console.log('string '+item[key]);
                        prop=isNaN(item[key]) ? item[key].toString().toUpperCase() : item[key].toString();
                    } else 
                    {
                        prop = 'none';
                    }
                    
                    if(prop.indexOf(newSearchTerm) > -1){
                    filteredList.push(item);
                    return filteredList;}
                }
            })
        } else if (filterTerms.length > 0)
        {
            
            let newFilterTerm=!isNaN(filterTerms)? filterTerms.toString(): filterTerms.toString().toUpperCase();
            let prop;
            //console.log(filterTerms.toString());
            return items.filter(item=>{
                for(let key of filterFields)
                {
                    console.log(key);
                    if( Array.isArray(item[key]) ) // for artist, dynasty
                    {
                        if( typeof item[key][0]['name'] !== 'undefined' )
                        {
                            console.log('array : '+item[key]);
                            prop=isNaN(item[key][0]['name']) ? item[key][0]['name'].toString().toUpperCase() : item[key][0]['name'].toString();
                        }
                        
                    } else if ( typeof item[key] == 'string')
                    {
                       // console.log('string '+item[key]);
                        prop=isNaN(item[key]) ? item[key].toString().toUpperCase() : item[key].toString();
                    } else 
                    {
                        prop = 'none';
                    }
                    console.log(prop);
                    console.log(newFilterTerm);
                    console.log(prop.indexOf(newFilterTerm));
                    if(prop.indexOf(newFilterTerm) > -1){
                    filteredList.push(item);
                    return filteredList;}
                }
            })
        }
        else{
        return items;
    }}



    /*
    * search accross all element of an array
    
    transform(items,searchTerm){
        let filteredList=[];
        if(searchTerm)
        {
            let newSearchTerm=!isNaN(searchTerm)? searchTerm.toString(): searchTerm.toString().toUpperCase();
            let prop;
            return items.filter(item=>{
                for(let key in item)
                {
                    prop=isNaN(item[key]) ? item[key].toString().toUpperCase() : item[key].toString();
                    if(prop.indexOf(newSearchTerm) > -1){
                    filteredList.push(item);
                    return filteredList;}
                }
            })
        }
        else{
        return items;
    }}
    */
}