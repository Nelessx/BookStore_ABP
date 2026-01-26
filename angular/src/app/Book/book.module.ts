import { NgModule } from '@angular/core';
import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import {SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [BookComponent],
  imports: [
    BookRoutingModule,
    SharedModule
  ]
})
export class BookModule { }

