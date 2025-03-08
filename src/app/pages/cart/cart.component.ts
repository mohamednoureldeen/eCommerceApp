import { CartService } from './../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit } from '@angular/core';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, SweetAlert2Module],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService= inject(ToastrService);
  private readonly activateRoute = inject(ActivatedRoute);
  
  cartDetails:ICart = {} as ICart




  ngOnInit(): void {
    this.getCartData();
  }
// get cart data
  getCartData():void{
    this.activateRoute.data.subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res['cart'].data;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

// remove item
  removeItem(id:string):void{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      theme:'auto',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeSpecificCartItem(id).subscribe({
          next: (res) => {
            console.log(res);
            this.cartDetails = res.data;
            if (res.status === 'success') {
              this.toastrService.success("Product removed successfully", 'Success', {
                timeOut: 3000,
                closeButton: true,
                progressBar: true
              });
            }
            this.cartService.cartNumber.set(res.numOfCartItems);
          },
          error: (err) => {
            console.log(err);
          }
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your order has been removed.",
          icon: "success",
          theme:'auto',
        });
      }
    });

  }

// clear cart
  clearItems():void{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      theme:'auto',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
    this.cartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message === 'success'){
          this.toastrService.success('Cart cleared successfully', 'Success', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true
          });
          this.cartDetails = {} as ICart;
          this.cartService.cartNumber.set(0);
        }
      },
      error:(err)=>{
        console.log(err);
      }
    });

    Swal.fire({
      title: "Deleted!",
      text: "Your cart has been cleared.",
      icon: "success",
      theme:'auto',
    });
      }
    });
  }

// update count
  updateCount(id:string, count:number):void{
    this.cartService.updateProductQuantity(id, count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
