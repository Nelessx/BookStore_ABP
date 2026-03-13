import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit, inject, ViewChild, TemplateRef } from '@angular/core';
import { BookService, BookDto, bookTypeOptions, AuthorLookupDto } from '../proxy/books';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  standalone: false,
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [
    ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
  ],
})
export class BookComponent implements OnInit {
  book = { items: [], totalCount: 0 } as PagedResultDto<BookDto>;

  selectedBook = {} as BookDto;

  form: FormGroup;

  authors$: Observable<AuthorLookupDto[]>;

  bookTypes = bookTypeOptions;

  @ViewChild('createModal') createModalTemplate!: TemplateRef<any>;

  public readonly list = inject(ListService);
  private readonly bookService = inject(BookService);
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(NgbModal);
  private readonly confirmation = inject(ConfirmationService);

  constructor() {
    this.authors$ = this.bookService.getAuthorLookup().pipe(map(r => r.items));
  }

  ngOnInit() {
    const bookStreamCreator = (query) => this.bookService.getList(query);

    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.book = response;
    });
  }

  createBook() {
    this.selectedBook = {} as BookDto;
    this.buildForm();
    this.modalService.open(this.createModalTemplate, { size: 'lg' });
  }

  editBook(id: string) {
    this.bookService.get(id).subscribe((book) => {
      this.selectedBook = book;
      this.buildForm();
      this.modalService.open(this.createModalTemplate, { size: 'lg' });
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.bookService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      authorId: [this.selectedBook.authorId || null, Validators.required],
      name: [this.selectedBook.name || null, Validators.required],
      type: [this.selectedBook.type ?? null, Validators.required],
      publishDate: [
        this.selectedBook.publishDate ? new Date(this.selectedBook.publishDate) : null,
        Validators.required,
      ],
      price: [this.selectedBook.price ?? null, Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedBook.id
      ? this.bookService.update(this.selectedBook.id, this.form.value)
      : this.bookService.create(this.form.value);

    request.subscribe(() => {
      this.modalService.dismissAll();
      this.form.reset();
      this.list.get();
    });
  }
}