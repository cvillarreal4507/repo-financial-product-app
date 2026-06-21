import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = true;
  searchTerm = '';
  pageSize = 5;
  pageSizeOptions = [5, 10, 20];
  
  // Pagination state
  currentPage = 1;

  // Sorting state
  sortBy: keyof Product = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Deletion state
  isModalOpen = false;
  productToDelete: Product | null = null;
  isDeleting = false;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data || response;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.products = [];
        this.filteredProducts = [];
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    let tempProducts = [...this.products];
    
    if (term) {
      tempProducts = this.products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.id.toLowerCase().includes(term)
      );
    }

    // Sort products
    tempProducts.sort((a, b) => {
      const valA = a[this.sortBy];
      const valB = b[this.sortBy];

      if (this.sortBy === 'date_release' || this.sortBy === 'date_revision') {
        const timeA = new Date(valA).getTime();
        const timeB = new Date(valB).getTime();
        return this.sortDirection === 'asc' ? timeA - timeB : timeB - timeA;
      }

      const strA = (valA || '').toString().toLowerCase();
      const strB = (valB || '').toString().toLowerCase();
      
      if (strA < strB) return this.sortDirection === 'asc' ? -1 : 1;
      if (strA > strB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.currentPage = 1;
    this.filteredProducts = tempProducts;
  }

  toggleSort(key: keyof Product): void {
    if (this.sortBy === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = key;
      this.sortDirection = 'asc';
    }
    this.applyFilter();
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilter();
  }

  onPageSizeChange(event: Event): void {
    const size = (event.target as HTMLSelectElement).value;
    this.pageSize = parseInt(size, 10);
    this.currentPage = 1;
  }

  onAddProduct(): void {
    this.router.navigate(['/products/add']);
  }

  onEditProduct(product: Product): void {
    this.router.navigate(['/products/edit', product.id]);
  }

  openDeleteModal(product: Product): void {
    this.productToDelete = product;
    this.isModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isModalOpen = false;
    this.productToDelete = null;
  }

  confirmDelete(): void {
    if (!this.productToDelete) return;
    
    this.isDeleting = true;
    this.productService.deleteProduct(this.productToDelete.id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.closeDeleteModal();
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.isDeleting = false;
        this.closeDeleteModal();
      }
    });
  }

  trackByProductId(index: number, product: Product): string {
    return product.id;
  }

  // Pagination Getters & Methods
  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  get startIndex(): number {
    return this.filteredProducts.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.filteredProducts.length ? this.filteredProducts.length : end;
  }

  get pagesArray(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
