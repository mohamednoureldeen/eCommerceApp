import { CategoriseService } from './../../core/services/categorise/categorise.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { CardForOrdersComponent } from "../../shared/components/ui/card-for-orders/card-for-orders.component";
import { SearchInputComponent } from "../../shared/components/ui/search-input/search-input.component";


@Component({
  selector: 'app-home',
  imports: [CarouselModule, SearchPipe, FormsModule, TranslatePipe, CommonModule, CardForOrdersComponent, SearchInputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriseService = inject(CategoriseService);
  
  products:WritableSignal<Iproduct[]> = signal([]);
  categories:WritableSignal<Icategory[]> = signal([]);
  searchQuery: string = '';

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  } 
  // customOptions carousel 1
  customMainSlider: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    rtl: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }
// customOptions carousel 2
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    rtl: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  // search Input
  onSearchInputChange(query: string) {
    this.searchQuery = query;
  }

// get all categories
getAllCategories():void{
  this.categoriseService.getAllCategories().subscribe({
    next: (res) => {
      this.categories.set( res.data)
      console.log(res.data);
    },
    error: (err) => {
      console.log(err);
    }
  })
}
  // get all products
  getAllProducts():void{
  this.productsService.getAllProducts().subscribe({
    next: (res) => {
      this.products.set( res.data)
      console.log(res.data);
    },
    error: (err) => {
      console.log(err);
    }
  })
}
}

