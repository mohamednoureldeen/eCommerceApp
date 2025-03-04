import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { Renderer2 } from '@angular/core';



@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent  implements OnInit{
private readonly activateRoute = inject(ActivatedRoute);
private readonly cartService = inject(CartService);
private readonly toastrService = inject(ToastrService);
private readonly wishlistService = inject(WishlistService);


detailsProduct = signal<Iproduct | null>(null);
productImages = signal<string[]>([]);

constructor(private renderer: Renderer2) {}

ngOnInit(): void {
  this.getProductDetails();
}



// get product details
  getProductDetails(): void {
    this.activateRoute.data.subscribe({
      next: (res) => {
        console.log(res);
          this.detailsProduct.set(res['product'].data); // البيانات من الـ Resolver
          this.productImages.set(res['product'].data.images);
      },
      error: (err) => {
        console.log(err);
      }
  });
  }

// set main image
setMainImage(img: string): void {
  const mainImage = this.renderer.selectRootElement('#mainImage', true);
  this.renderer.setAttribute(mainImage, 'src', img);
}

// add to cart
  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success('Product added to cart successfully', 'Success', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true
        });
        this.cartService.cartNumber.set(res.numOfCartItems);
      }, 
      error: (err) => {
        console.log(err);
      }
    })
  }

  // add to wishlist
  addToWishlist(id:string):void{
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success('Product added to wishlist successfully', 'Success', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true
        });
      }, 
      error: (err) => {
        console.log(err);
      }
    })
  }
}


