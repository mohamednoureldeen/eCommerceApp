import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Component, inject, Renderer2 } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [SweetAlert2Module, ReactiveFormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  constructor(private renderer: Renderer2, private toastrService: ToastrService) { }
  
  // Injecting FormBuilder for form creation
  private readonly formBuilder = inject(FormBuilder);
  
  // Indicates if a loading state is active
  isLoading: boolean = false;
  
  // Reactive form setup with validation rules
  chatForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    message: [null, [Validators.required]],
  });

  // Controls the chat window's visibility
  isChatOpen = false;

  // Toggles the chat window open/close state
  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  // Handles form submission when sending a message
  sendMessage(): void {
    if (this.chatForm.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Will contact you soon',
        showConfirmButton: false,
        timer: 2500,
        theme: 'auto'
      }).then(() => {
        this.isChatOpen = false; // Closes chat window after confirmation
        this.chatForm.reset(); // Resets form fields
      });
    }
  }

  // Closes the chat window without sending a message
  closeChat(): void {
    this.isChatOpen = false;
  }
}



