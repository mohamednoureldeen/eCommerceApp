import { CartService } from './../../core/services/cart/cart.service';
import { OrdersService } from './../../core/services/orders/orders.service';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);
  private readonly cartService= inject(CartService);

  checkOutForm!:FormGroup;
  cartId:string = '';
  userId:string = '';
// form
  initForm():void{
    this.checkOutForm = this.formBuilder.group({
      details:  [null, [Validators.required]],
      city: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  })
  }

ngOnInit(): void {
      this.initForm();
      this.getCartId();
  }
// get cart id
getCartId():void{
  this.activatedRoute.paramMap.subscribe({
    next:(param)=>{
      this.cartId = param.get('id') !;
    }
  })
}

 
// submit form for visa payment
  submitForm():void{
    this.cartId
    this.ordersService.cheakOutPayment(this.cartId, this.checkOutForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          open(res.session.url, '_self');
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  // submit form for cash payment and go to all orders
  payLater():void{
    this.ordersService.getOrdersCash(this.cartId, this.checkOutForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
         this.userId = res.data.user;
         this.cartService.cartNumber.set(0);
          this.router.navigate(['/allorders', this.userId]);
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }





}
