import { catchError } from 'rxjs';
import { IBrand } from '../../shared/interfaces/ibrands';
import { BrandsService } from './../../core/services/brands/brands.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  private readonly brandsService = inject(BrandsService);

  brands:WritableSignal<IBrand[]> = signal([]);

  constructor() {}

  ngOnInit(): void {
    this.getAllBrands();
  }
  // get all brands
  getAllBrands():void{
    this.brandsService.getAllBrands().pipe(
      catchError((err) =>{
        console.log(err);
        throw err;
      })
    ).subscribe( (res) => {
        this.brands.set( res.data)
        console.log(res.data);
      },
    )
  }

  

}
