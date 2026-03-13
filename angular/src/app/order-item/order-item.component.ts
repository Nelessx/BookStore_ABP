import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit, inject, ViewChild, TemplateRef } from '@angular/core';
import { OrderItemService, OrderItemDto } from '../proxy/order-items';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  standalone: false,
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
  providers: [ListService],
})
export class OrderItemComponent implements OnInit {
  orderItem = { items: [], totalCount: 0 } as PagedResultDto<OrderItemDto>;

  selectedOrderItem = {} as OrderItemDto;

  form: FormGroup;

  @ViewChild('createModal') createModalTemplate!: TemplateRef<any>;

  public readonly list = inject(ListService);
  private readonly orderItemService = inject(OrderItemService);
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(NgbModal);
  private readonly confirmation = inject(ConfirmationService);

  ngOnInit() {
    const orderItemStreamCreator = query => this.orderItemService.getList(query);

    this.list.hookToQuery(orderItemStreamCreator).subscribe(response => {
      this.orderItem = response;
    });
  }

  createOrderItem() {
    this.selectedOrderItem = {} as OrderItemDto;
    this.buildForm();
    this.modalService.open(this.createModalTemplate, { size: 'lg' });
  }

  editOrderItem(id: string) {
    this.orderItemService.get(id).subscribe(orderItem => {
      this.selectedOrderItem = orderItem;
      this.buildForm();
      this.modalService.open(this.createModalTemplate, { size: 'lg' });
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.orderItemService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      orderId: [this.selectedOrderItem.orderId || null, Validators.required],
      bookId: [this.selectedOrderItem.bookId || null, Validators.required],
      quantity: [this.selectedOrderItem.quantity || null, Validators.required],
      price: [this.selectedOrderItem.price || null, Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedOrderItem.id
      ? this.orderItemService.update(this.selectedOrderItem.id, this.form.value)
      : this.orderItemService.create(this.form.value);

    request.subscribe(() => {
      this.modalService.dismissAll();
      this.form.reset();
      this.list.get();
    });
  }
}