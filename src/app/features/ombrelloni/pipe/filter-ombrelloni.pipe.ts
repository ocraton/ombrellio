import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOmbrelloni'
})
export class FilterOmbrelloniPipe implements PipeTransform {

  transform(items, searchTerm) {
    let filteredList = [];
    if (searchTerm) {
      let newSearchTerm = !isNaN(searchTerm) ? searchTerm.toString() : searchTerm.toString().toUpperCase();
      let prop;
      return items.filter(item => {
        for (let key in item) {
          prop = isNaN(item['numero']) ? item['numero'].toString().toUpperCase() : item['numero'].toString();
          if (prop.indexOf(newSearchTerm) > -1) {
            filteredList.push(item);
            return filteredList;
          }
        }
      })
    }
    else {
      return items;
    }
  }
}
