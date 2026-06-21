import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, catchError, of, Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  productId = '';
  isSaving = false;
  isLoadingProduct = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = id;
    }

    this.initForm();

    if (this.isEditMode) {
      this.loadProductDetails();
    }

    this.setupDateCalculation();
  }

  private initForm(): void {
    const todayStr = this.getTodayString();

    this.form = this.fb.group({
      id: [
        { value: '', disabled: this.isEditMode },
        [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        this.isEditMode ? null : [this.idDuplicateValidator.bind(this)]
      ],
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: [todayStr, [Validators.required, this.dateReleaseValidator.bind(this)]],
      date_revision: [{ value: '', disabled: true }, [Validators.required]]
    });
  }

  private loadProductDetails(): void {
    this.isLoadingProduct = true;
    this.productService.getProduct(this.productId).subscribe({
      next: (product) => {
        if (product) {
          const formattedRelease = this.formatDateForInput(product.date_release);
          const formattedRevision = this.formatDateForInput(product.date_revision);

          this.form.patchValue({
            id: product.id,
            name: product.name,
            description: product.description,
            logo: product.logo,
            date_release: formattedRelease,
            date_revision: formattedRevision
          });
        }
        this.isLoadingProduct = false;
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
        this.isLoadingProduct = false;
        this.router.navigate(['/products']);
      }
    });
  }

  private setupDateCalculation(): void {
    this.form.get('date_release')?.valueChanges.subscribe((releaseVal) => {
      if (releaseVal) {
        const releaseDate = new Date(releaseVal);
        if (!isNaN(releaseDate.getTime())) {
          const revisionDate = new Date(releaseDate);
          revisionDate.setFullYear(releaseDate.getFullYear() + 1);
          const formattedDate = revisionDate.toISOString().split('T')[0];
          this.form.get('date_revision')?.setValue(formattedDate);
        }
      }
    });

    const initialRelease = this.form.get('date_release')?.value;
    if (initialRelease) {
      const releaseDate = new Date(initialRelease);
      if (!isNaN(releaseDate.getTime())) {
        const revisionDate = new Date(releaseDate);
        revisionDate.setFullYear(releaseDate.getFullYear() + 1);
        const formattedDate = revisionDate.toISOString().split('T')[0];
        this.form.get('date_revision')?.setValue(formattedDate);
      }
    }
  }

  private idDuplicateValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) {
      return of(null);
    }
    return this.productService.verifyProductExists(control.value).pipe(
      map((exists) => (exists ? { idExists: true } : null)),
      catchError(() => of(null))
    );
  }

  private dateReleaseValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const inputDate = new Date(control.value + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return inputDate >= today ? null : { invalidReleaseDate: true };
  }

  private getTodayString(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  private formatDateForInput(dateStr: string | Date): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(date.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    const rawValues = this.form.getRawValue();
    const productData: Product = {
      id: rawValues.id,
      name: rawValues.name,
      description: rawValues.description,
      logo: rawValues.logo,
      date_release: new Date(rawValues.date_release).toISOString(),
      date_revision: new Date(rawValues.date_revision).toISOString()
    };

    if (this.isEditMode) {
      this.productService.updateProduct(this.productId, productData).subscribe({
        next: () => {
          this.isSaving = false;
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error updating product:', err);
          this.isSaving = false;
        }
      });
    } else {
      this.productService.createProduct(productData).subscribe({
        next: () => {
          this.isSaving = false;
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error creating product:', err);
          this.isSaving = false;
        }
      });
    }
  }

  onReset(): void {
    if (this.isEditMode) {
      this.loadProductDetails();
    } else {
      this.form.reset();
      const todayStr = this.getTodayString();
      this.form.patchValue({
        date_release: todayStr
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  getIdErrorMessage(): string {
    const control = this.form.get('id');
    if (control?.hasError('required')) return 'This field is required.';
    if (control?.hasError('minlength')) return 'Minimum 3 characters.';
    if (control?.hasError('maxlength')) return 'Maximum 10 characters.';
    if (control?.hasError('idExists')) return 'This ID is already registered.';
    return '';
  }

  getNameErrorMessage(): string {
    const control = this.form.get('name');
    if (control?.hasError('required')) return 'This field is required.';
    if (control?.hasError('minlength')) return 'Minimum 6 characters.';
    if (control?.hasError('maxlength')) return 'Maximum 100 characters.';
    return '';
  }

  getDescriptionErrorMessage(): string {
    const control = this.form.get('description');
    if (control?.hasError('required')) return 'This field is required.';
    if (control?.hasError('minlength')) return 'Minimum 10 characters.';
    if (control?.hasError('maxlength')) return 'Maximum 200 characters.';
    return '';
  }

  getLogoErrorMessage(): string {
    const control = this.form.get('logo');
    if (control?.hasError('required')) return 'This field is required.';
    return '';
  }

  getReleaseDateErrorMessage(): string {
    const control = this.form.get('date_release');
    if (control?.hasError('required')) return 'This field is required.';
    if (control?.hasError('invalidReleaseDate')) return 'The date must be today or later.';
    return '';
  }
}
