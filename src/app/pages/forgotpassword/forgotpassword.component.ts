import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  private readonly authService = inject(AuthService)
  private readonly roter = inject(Router)

  step:number = 1;

// step 1
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })
  
// step 2
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  })

// step 3
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)]),
  })

 // verify email step 1
  verifyEmailSubmit():void{

    this.authService.setEmailVerified(this.verifyEmail.value).subscribe({

      next: (res) => {
        if(res.statusMsg === 'success'){
          this.step = 2;
        }

      },
      error:(err)=> {
        console.log(err);
      }
    })
}

// verify code step 2
verifyCodeSubmit():void{

  let emailValue = this.verifyEmail.get('email')?.value
  this.resetPassword.get('email')?.patchValue(emailValue);

  this.authService.setCodeVerified(this.verifyCode.value).subscribe({

    next: (res) => {
      if(res.status === 'Success'){
        this.step = 3;
        console.log(res);
      }

    },
    error:(err)=> {
      console.log(err);
    }

  })
}

// reset password step 3
resetPasswordSubmit():void{

  this.authService.setResetPass(this.resetPassword.value).subscribe({

    next: (res) => {
      localStorage.setItem('userToken', res.token);
      this.authService.saveUserData();
      this.roter.navigate(['/home']);
    },
    error:(err)=> {
      console.log(err);
    }

  })
}

}
