import { CartService } from './../../core/services/cart/cart.service';
import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CommonModule } from '@angular/common';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, RouterModule, SweetAlert2Module],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  wishlistItems: Iwishlist[] = [];

  ngOnInit(): void {
    this.getWishlist();
  }
// get user wishlist
  getWishlist(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistItems = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // add to cart
  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(
          'Product added to cart successfully',
          'Success',
          {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          }
        );
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

// remove from wishlist
  removeFromWishlist(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      theme:'auto',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',

    }).then((result) => {
      if (result.isConfirmed) {
        this.wishlistService.removeProductFromWishlist(id).subscribe({
          next: (res) => {
            console.log(res);
            this.getWishlist();
          },
          error: (err) => {
            console.log(err);
          },
        });
        Swal.fire({
          title: 'Removed!',
          text: 'Your file has been Removed.',
          icon: 'success',
          theme:'auto',
        });
      }
    });
  }
}
