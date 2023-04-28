import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownAutocomplete } from './interface/dropdown-autocomplete.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dropdown-autocomplete',
  templateUrl: './dropdown-autocomplete.component.html',
  styleUrls: ['./dropdown-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownAutocompleteComponent,
      multi: true,
    },
  ],
})
export class DropdownAutocompleteComponent implements ControlValueAccessor {
  @Input() id: string = 'teamSelect';
  @Input() listTeams$!: Observable<DropdownAutocomplete[]>;
  @Input() valueInput!: number;

  private onChangefn: (team: number) => void = () => {};
  private onTouchefn: () => void = () => {};

  onChange(teamId: string): void {
    this.valueInput = Number(teamId);
    this.onChangefn(this.valueInput);
    this.onTouchefn();
  }
  writeValue(value: number): void {
    this.valueInput = value;
  }
  registerOnChange(fn: any): void {
    this.onChangefn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchefn = fn;
  }
}
