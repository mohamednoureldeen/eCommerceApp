import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',         // Component selector for using it in templates
  imports: [CommonModule, FormsModule], // Import necessary Angular modules
  templateUrl: './search-input.component.html', // Template file for the search input
  styleUrl: './search-input.component.scss'     // Stylesheet for the component
})
export class SearchInputComponent {

  searchValue: string = ''; // Two-way bound search value

  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
  // Output event emitter to notify parent components of search changes

  onSearchChange() {
    this.searchChange.emit(this.searchValue);
    // Emit the search value whenever the input changes
  }
}
