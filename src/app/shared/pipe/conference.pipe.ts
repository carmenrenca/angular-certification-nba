import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe
 * change the name of the conference
 */
@Pipe({
  name: 'conference',
})
export class ConferencePipe implements PipeTransform {
  transform(titleConference: 'East' | 'West'): string {
    return `${titleConference}en conference`;
  }
}
