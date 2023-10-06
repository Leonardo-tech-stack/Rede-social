import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class IsLoggedInGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    const isLogged = this.authService.isLogged();

    if (isLogged) {
      return true;
    }
    this.router.navigate(['login']);
    return true;
  }

};
