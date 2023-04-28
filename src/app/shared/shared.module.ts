import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { DropdownAutocompleteComponent } from './components/dropdown-autocomplete/dropdown-autocomplete.component';
import { ConferencePipe } from './pipe/conference.pipe';

@NgModule({
  declarations: [
    ButtonComponent,
    DropdownAutocompleteComponent,
    ConferencePipe,
  ],
  imports: [CommonModule],
  exports: [ButtonComponent, DropdownAutocompleteComponent, ConferencePipe],
})
export class SharedModule {}
