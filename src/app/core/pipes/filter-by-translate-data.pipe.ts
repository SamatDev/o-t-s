import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTranslateData',
})
export class FilterByTranslateDataPipe implements PipeTransform {
  transform(
    value: Array<KeyValue<string, string>> | null,
    translateData: Record<string, string> | null,
    isFilter: boolean
  ): KeyValue<string, string>[] | null {
    if (!isFilter || value === null || translateData === null) return value;
    return value.filter((el) => {
      if (typeof translateData[el.key] === 'string') {
        return !!!translateData[el.key].trim();
      } else return !!!translateData[el.key];
    });
  }
}
