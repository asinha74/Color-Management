import { Pipe, PipeTransform } from '@angular/core';

import { Colormg } from '../colormg';

@Pipe({
    name: 'colormgfilter',
    pure: false
})
export class ColormgFilterPipe implements PipeTransform {
  transform(items: Colormg[], filter: Colormg): Colormg[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Colormg) => this.applyFilter(item, filter));
  }

  /**
   * Perform the filtering.
   *
   * @param {Colormg} colormg The colormg to compare to the filter.
   * @param {Colormg} filter The filter to apply.
   * @return {boolean} True if colormg satisfies filters, false if not.
   */
  applyFilter(colormg: Colormg, filter: Colormg): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (colormg[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (colormg[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
