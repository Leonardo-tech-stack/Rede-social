import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import User from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | null = null;
  token: string | null = null;

  constructor(private router: Router,) { }

  // salvando user no localstorage
  setUser(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user))
  }

  // buscando
  getUser() {
    if (this.user) {
      return this.user;
    }

    const savedUser = localStorage.getItem('user');

    if(savedUser) {
      this.user = JSON.parse(savedUser);
      return this.user;
    }

    return null;
  }
    
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    if (this.token) {
      return this.token;
    }

    const tokenGuardado = localStorage.getItem('token');

    if(tokenGuardado) {
      this.token = tokenGuardado;
      return this.token;
    }

    return null;
  }

  isLogged(): boolean {
    return this.getUser() && this.getToken() ? true : false;
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
