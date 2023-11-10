import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('emailInput', { static: true }) emailInput!: ElementRef;
  @ViewChild('passwordInput', { static: true }) passwordInput!: ElementRef;
  
  email!: string;
  password!: string;

  isLoading: boolean = false;

  loginError = false;

  linkedin: string = "../../assets/images/linkedin.png";
  github: string = "../../assets/images/github.png";

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit(form: any) {

    if (!form.valid) {
      form.controls.email.markAsTouched();

      form.controls.password.markAsTouched();

      if(form.controls.email.invalid) {
        this.emailInput.nativeElement.focus();
        return;
      }

      if(form.controls.password.invalid) {
        this.passwordInput.nativeElement.focus();
        return;
      }

      return;
    }

    this.login();
  }

  login() {
    this.isLoading = true;

    this.loginService.logInto(this.email, this.password)
    .pipe(
      finalize(() => this.isLoading = false)
    )
    .subscribe(
      response => this.onSucessLogin(),
      error => this.onErrorLogin(),
    );
  }

  onSucessLogin() {
    this.router.navigate(['home']);
  }

  onErrorLogin() {
    this.loginError = true;
  }

  showError(nomeControle: string, form: NgForm) {
    if (!form.controls[nomeControle]) {

      return false;
    }
    return form.controls[nomeControle].invalid && form.controls[nomeControle].touched;
  }
}
