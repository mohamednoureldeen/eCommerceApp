import { Component, inject } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { ActivatedRoute } from '@angular/router';
import { IallOrders } from '../../shared/interfaces/iallorders';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-allorders',
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent {

  private readonly ordersService = inject(OrdersService);
  private readonly activatedRoute = inject(ActivatedRoute);

  userId:string = '';
  allOrders:IallOrders[] = [];


  ngOnInit(): void {
    this.getUserId();
    this.getAllUserOrders();
  }

  // get user id from url
  getUserId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.userId = param.get('id') !;
      }
    })
  }
// get all user orders
  getAllUserOrders():void{
    this.ordersService.getAllUserOrders(this.userId).subscribe({
      next:(res)=>{
        this.allOrders = res;
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
