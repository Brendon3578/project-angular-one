import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars',
})
export class StarsPipe implements PipeTransform {
  transform(stars: number, reviews: number): string {
    let starString = '★';
    let emptyStarString = '☆';

    let maxStarsValue = reviews * 5;
    let starsStruck = (stars / maxStarsValue / 2) * 10;

    starsStruck = Math.ceil(starsStruck);

    return `${starString.repeat(starsStruck)}${emptyStarString.repeat(
      5 - starsStruck
    )}`;
  }
}
