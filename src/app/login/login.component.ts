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
  // usado para validações, no caso o focus que foi usado para focar em um elemento 
  // (email ou senha) que esteja invalido

  email!: string;
  password!: string;

  isLoading!: boolean;

  loginError = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit(form: any) {

    if (!form.valid) {
      form.controls.email.markAsTouched();
      // função para esperar o usuario inserir e enviar o email de login, caso for invalido, retornar a mensagem de erro

      form.controls.password.markAsTouched();
      //mesma coisa só que para a senha

      if(form.controls.email.invalid) {
        this.emailInput.nativeElement.focus();
        // obs no viewchild
        return;
      }

      if(form.controls.password.invalid) {
        this.passwordInput.nativeElement.focus();
        return;
      }

      return;
    }

    console.log(form.value);
    console.log(this.login);

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

  // função para validação de email senha (retorna msg de erro)
  showError(nomeControle: string, form: NgForm) {
    if (!form.controls[nomeControle]) {

      return false;
    }
    return form.controls[nomeControle].invalid && form.controls[nomeControle].touched;
  }
}
