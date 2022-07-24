import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCommentedKeys',
})
export class filterByCommentedKeysPipe implements PipeTransform {
  transform(
    value: KeyValue<string, string>[] | null,
    recordComments: Record<string, string> | null,
    isFilterByComment: boolean
  ): KeyValue<string, string>[] | null {
    if (!isFilterByComment || value === null || recordComments === null)
      return value;
    return value.filter((el) => !!recordComments[el.key]?.length);
  }
}
