import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';

import { NgbDatepickerModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { OrderComponent } from './order.component';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    CoreModule,
    ThemeSharedModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgxDatatableModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrderComponent,
      },
    ]),
  ],
})
export class OrderModule {}