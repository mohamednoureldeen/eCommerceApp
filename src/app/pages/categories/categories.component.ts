import { Icategory } from '../../shared/interfaces/icategory';
import { CategoriseService } from './../../core/services/categorise/categorise.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [DatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  
  private readonly categoriseService = inject(CategoriseService);

  categories:WritableSignal<Icategory[]> = signal([]);
  
  
  ngOnInit(): void {
    this.getAllCategories();
  }
  // all categories
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
// specific categories
  getSpecificCategories(id:string):void{
    this.categoriseService.getSpecificCategories(id).subscribe({
      next: (res) => {
        this.categories.set( res.data)
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
