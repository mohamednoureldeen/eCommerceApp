import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { Component, inject, OnInit } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerComponent } from 'ngx-spinner';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'eCommerceApp';
  flowbiteService = inject(FlowbiteService);
  constructor(){}
  ngOnInit():void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

  }

}
 