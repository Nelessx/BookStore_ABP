import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { AuthorService, AuthorDto } from '../proxy/authors';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { SharedModule } from '../../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [SharedModule, NgbDatepickerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class AuthorComponent implements OnInit {
  author = { items: [], totalCount: 0 } as PagedResultDto<AuthorDto>;

  isModalOpen = false;

  form: FormGroup = new FormGroup({});

  selectedAuthor = {} as AuthorDto;

  @ViewChild('createModal') createModalTemplate!: TemplateRef<any>;

  public readonly list = inject(ListService);
  private readonly authorService = inject(AuthorService);
  private readonly fb = inject(FormBuilder);
  private readonly confirmation = inject(ConfirmationService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly modalService = inject(NgbModal);

  ngOnInit(): void {
    const authorStreamCreator = (query) => this.authorService.getList(query);

    this.list.hookToQuery(authorStreamCreator).subscribe((response) => {
      this.author = response;
    });
    
    // Initialize form
    this.buildForm();
  }

  createAuthor() {
    this.selectedAuthor = {} as AuthorDto;
    this.buildForm();
    this.modalService.open(this.createModalTemplate, { size: 'lg' });
    console.log('Create author modal opened');
  }

  editAuthor(id: string) {
    this.authorService.get(id).subscribe({
      next: (author) => {
        this.selectedAuthor = author;
        this.buildForm();
        this.modalService.open(this.createModalTemplate, { size: 'lg' });
        console.log('Edit author modal opened');
      },
      error: (err) => {
        console.error('Error loading author:', err);
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedAuthor.name || '', [Validators.required]],
      birthDate: [
        this.selectedAuthor.birthDate ? new Date(this.selectedAuthor.birthDate) : null,
        [Validators.required],
      ],
      shortBio: [
        this.selectedAuthor.shortBio ? this.selectedAuthor.shortBio : '',
        [Validators.required],
      ],
    });
    
    console.log('Form built. IsValid?', this.form.valid, 'Form value:', this.form.value);
  }

  save() {
    if (this.form.invalid) {
      console.warn('Form is invalid');
      return;
    }

    if (this.selectedAuthor.id) {
      this.authorService
        .update(this.selectedAuthor.id, this.form.value)
        .subscribe({
          next: () => {
            this.form.reset();
            this.list.get();
            console.log('Author updated successfully');
          },
          error: (err) => {
            console.error('Error updating author:', err);
          }
        });
    } else {
      this.authorService.create(this.form.value).subscribe({
        next: () => {
          this.form.reset();
          this.list.get();
          console.log('Author created successfully');
        },
        error: (err) => {
          console.error('Error creating author:', err);
        }
      });
    }
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure')
        .subscribe((status) => {
          if (status === Confirmation.Status.confirm) {
            this.authorService.delete(id).subscribe({
              next: () => {
                this.list.get();
              },
              error: (err) => {
                console.error('Error deleting author:', err);
              }
            });
          }
	    });
  }
}
