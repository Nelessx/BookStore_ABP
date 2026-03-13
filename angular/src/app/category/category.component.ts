import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit, inject, ViewChild, TemplateRef } from '@angular/core';
import { CategoryService, CategoryDto } from '../proxy/categories';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
    standalone: false,
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [ListService],
})
export class CategoryComponent implements OnInit {

  category = { items: [], totalCount: 0 } as PagedResultDto<CategoryDto>;

  selectedCategory = {} as CategoryDto;

  form: FormGroup;

  @ViewChild('createModal') createModalTemplate!: TemplateRef<any>;

  public readonly list = inject(ListService);
  private readonly categoryService = inject(CategoryService);
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(NgbModal);
  private readonly confirmation = inject(ConfirmationService);

  ngOnInit() {
    const categoryStreamCreator = query => this.categoryService.getList(query);

    this.list.hookToQuery(categoryStreamCreator).subscribe(response => {
      this.category = response;
    });
  }

  createCategory() {
    this.selectedCategory = {} as CategoryDto;
    this.buildForm();
    this.modalService.open(this.createModalTemplate, { size: 'lg' });
  }

  editCategory(id: string) {
    this.categoryService.get(id).subscribe(category => {
      this.selectedCategory = category;
      this.buildForm();
      this.modalService.open(this.createModalTemplate, { size: 'lg' });
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure')
      .subscribe(status => {
        if (status === Confirmation.Status.confirm) {
          this.categoryService.delete(id).subscribe(() => this.list.get());
        }
      });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedCategory.name || null, Validators.required],
      description: [this.selectedCategory.description || null],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedCategory.id
      ? this.categoryService.update(this.selectedCategory.id, this.form.value)
      : this.categoryService.create(this.form.value);

    request.subscribe(() => {
      this.modalService.dismissAll();
      this.form.reset();
      this.list.get();
    });
  }
}