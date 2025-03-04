// src/app/core/pipes/search.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObject: any[], searchValue: string): any[] {
    // Return the original array if input is not a valid array or searchValue is empty
    if (!Array.isArray(arrayOfObject) || !searchValue) {
      return arrayOfObject;
    }
    
    // Convert the search value to lowercase for case-insensitive search
    const lowerCaseSearchValue = searchValue.toLowerCase();

    // Filter the array based on whether the 'title' property includes the search value
    return arrayOfObject.filter((item) => 
      item?.title?.toLowerCase().includes(lowerCaseSearchValue)
    );
  }

}

