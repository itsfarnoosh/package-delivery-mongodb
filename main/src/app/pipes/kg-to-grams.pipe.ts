import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kgToGrams',
  standalone: true,
})
export class KgToGramsPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '0g'; // Handle empty or null values
    return `${value * 1000}g`; // Convert kilograms to grams
  }
}
