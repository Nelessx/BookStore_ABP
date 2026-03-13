import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderItemComponent } from './order-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [OrderItemComponent],
  imports: [
    CommonModule,
    CoreModule,
    ThemeSharedModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDatatableModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrderItemComponent,
      },
    ]),
  ],
})
export class OrderItemModule {}