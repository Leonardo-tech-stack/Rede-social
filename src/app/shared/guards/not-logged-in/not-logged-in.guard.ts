import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class NotLoggedInGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    const isLogged = this.authService.isLogged();

    if (!isLogged) {
      return true;
    }
    
    this.router.navigate(['home']);
    return false;
  }

};
