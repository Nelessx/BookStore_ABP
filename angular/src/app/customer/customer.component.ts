import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit, inject, ViewChild, TemplateRef } from '@angular/core';
import { CustomerService, CustomerDto } from '../proxy/customers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [ListService],
})
export class CustomerComponent implements OnInit {
  customer = { items: [], totalCount: 0 } as PagedResultDto<CustomerDto>;
  selectedCustomer = {} as CustomerDto;
  form!: FormGroup;

  @ViewChild('createModal') createModalTemplate!: TemplateRef<any>;

  public readonly list = inject(ListService);
  private readonly customerService = inject(CustomerService);
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(NgbModal);
  private readonly confirmation = inject(ConfirmationService);

  ngOnInit(): void {
    const customerStreamCreator = query => this.customerService.getList(query);

    this.list.hookToQuery(customerStreamCreator).subscribe(response => {
      this.customer = response;
    });
  }

  createCustomer(): void {
    this.selectedCustomer = {} as CustomerDto;
    this.buildForm();
    this.modalService.open(this.createModalTemplate, { size: 'lg' });
  }

  editCustomer(id: string): void {
    this.customerService.get(id).subscribe(customer => {
      this.selectedCustomer = customer;
      this.buildForm();
      this.modalService.open(this.createModalTemplate, { size: 'lg' });
    });
  }

  deleteCustomer(id: string): void {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.customerService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: [this.selectedCustomer.name || null, Validators.required],
      number: [
        this.selectedCustomer.number || null,
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ],
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedCustomer.id
      ? this.customerService.update(this.selectedCustomer.id, this.form.value)
      : this.customerService.create(this.form.value);

    request.subscribe(() => {
      this.modalService.dismissAll();
      this.form.reset();
      this.list.get();
    });
  }
}