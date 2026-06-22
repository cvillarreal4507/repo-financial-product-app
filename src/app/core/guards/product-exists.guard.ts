import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductService } from '../../features/products/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductExistsGuard implements CanActivate {
  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const id = route.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/products']);
      return of(false);
    }

    return this.productService.verifyProductExists(id).pipe(
      map((exists) => {
        if (exists) {
          return true;
        } else {
          this.router.navigate(['/products']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/products']);
        return of(false);
      })
    );
  }
}
