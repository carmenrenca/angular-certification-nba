import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ConferencePipe } from './pipe/conference.pipe';

@NgModule({
  declarations: [ButtonComponent, ConferencePipe],
  imports: [CommonModule],
  exports: [ButtonComponent, ConferencePipe],
})
export class SharedModule {}
