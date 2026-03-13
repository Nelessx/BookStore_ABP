import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit, inject, ViewChild, TemplateRef } from '@angular/core';
import { OrderService, OrderDto } from '../proxy/orders';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
    standalone: false,
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [
    ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ],
})
export class OrderComponent implements OnInit {
  order = { items: [], totalCount: 0 } as PagedResultDto<OrderDto>;

  selectedOrder = {} as OrderDto;

  form: FormGroup;

  @ViewChild('createModal') createModalTemplate!: TemplateRef<any>;

  public readonly list = inject(ListService);
  private readonly orderService = inject(OrderService);
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(NgbModal);
  private readonly confirmation = inject(ConfirmationService);

  ngOnInit() {
    const orderStreamCreator = (query) => this.orderService.getList(query);

    this.list.hookToQuery(orderStreamCreator).subscribe((response) => {
      this.order = response;
    });
  }

  createOrder() {
    this.selectedOrder = {} as OrderDto;
    this.buildForm();
    this.modalService.open(this.createModalTemplate, { size: 'lg' });
  }

  editOrder(id: string) {
    this.orderService.get(id).subscribe((order) => {
      this.selectedOrder = order;
      this.buildForm();
      this.modalService.open(this.createModalTemplate, { size: 'lg' });
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.orderService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      customerId: [this.selectedOrder.customerId || null, Validators.required],
      orderDate: [
        this.selectedOrder.orderDate ? new Date(this.selectedOrder.orderDate) : null,
        Validators.required
      ],
      totalAmount: [this.selectedOrder.totalAmount || null, Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedOrder.id
      ? this.orderService.update(this.selectedOrder.id, this.form.value)
      : this.orderService.create(this.form.value);

    request.subscribe(() => {
      this.modalService.dismissAll();
      this.form.reset();
      this.list.get();
    });
  }
}