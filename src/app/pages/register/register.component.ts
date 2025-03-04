import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TranslatePipe , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
private readonly authService = inject(AuthService);
private readonly formBuilder = inject(FormBuilder);
private readonly rotter = inject(Router);

  isLoading : boolean = false;
  msgError : string = "";
  success : string = "";

// register form
  registerForm:FormGroup = this.formBuilder.group({
    name:  [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)]],
    rePassword: [null,[Validators.required]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  }, {validators: this.cofirmPassword}
  );

//  confirm password
  cofirmPassword(group: AbstractControl){
    let password = group.get('password')?.value;
    let rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : {mismatch:true}
  }

  // submit form
  submitForm():void{

    if(this.registerForm.valid){
      this.isLoading = true
      this.authService.sendRegesterForm(this.registerForm.value).subscribe({
        next: (res) =>{
          console.log(res);
          if(res.message === 'success'){
            setTimeout(( ) => {
              this.rotter.navigate(['/login']);
            },  500);
           
            this.success = res.message;
          }
          this.isLoading = false
        },
        error: (err:HttpErrorResponse) =>{
          console.log(err)
          this.msgError = err.error.message
          this.isLoading = false;
        }
      })
    }else{
      this.registerForm.markAllAsTouched();
    }
  }
}
