import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CustomerComponent } from './customer.component';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomerComponent,
      },
    ]),
    CoreModule,
    ThemeSharedModule,
    NgbModule,
    NgxDatatableModule,
  ],
})
export class CustomerModule {}