import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
private readonly authService = inject(AuthService);
private readonly rotter = inject(Router)


 loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)]),
  },
  );

  isLoading : boolean = false;
  msgError : string = "";
  success : string = "";
  submitForm():void{

    if(this.loginForm.valid){
      this.isLoading = true
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) =>{
          console.log(res);
          if(res.message === 'success'){
            this.msgError = "";
            setTimeout(( ) => {

              localStorage.setItem('userToken', res.token);

              this.authService.saveUserData();
              this.rotter.navigate(['/home']);
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
      this.loginForm.markAsTouched();
    }
  }
}
