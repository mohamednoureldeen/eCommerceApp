import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { CardForOrdersComponent } from "../../shared/components/ui/card-for-orders/card-for-orders.component";
import { SearchInputComponent } from "../../shared/components/ui/search-input/search-input.component";
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-products',
  imports: [SearchPipe, FormsModule, TranslatePipe, CommonModule,
     CardForOrdersComponent, SearchInputComponent, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  private readonly productsService = inject(ProductsService);

  products:WritableSignal<Iproduct[]> = signal([]);
  currentPage = signal<number>(1); 
  itemsPerPage = 16; 
  searchQuery: string = '';
  sortKey = 'title'; 
  reverse = false;

  ngOnInit(): void {
    this.getAllProducts();
  }

  // search Input
  onSearchInputChange(query: string) {
    this.searchQuery = query;
  }
  // sort
  get sortedProducts() {
    let sorted = [...this.products()];
    
    sorted.sort((a, b) => {
      const key = this.sortKey as keyof Iproduct;
      if (a[key] < b[key]) return this.reverse ? 1 : -1;
      if (a[key] > b[key]) return this.reverse ? -1 : 1;
      return 0;
    });
    return sorted;
  }
  
  // get all products
  getAllProducts():void{
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set( res.data)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
}
