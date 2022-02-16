import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductNewContainerComponent } from '../containers/product-new-container/product-new-container.component';

@Injectable({
  providedIn: 'root'
})
export class ProductNewGuard implements CanDeactivate<ProductNewContainerComponent> {
  canDeactivate(component: ProductNewContainerComponent, 
    currentRoute: ActivatedRouteSnapshot, 
    currentState: RouterStateSnapshot, 
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
      if(component.productForm.dirty){
        return confirm('¿Desea eliminar los cambios?')
      }
      return true;
  }

  
}
