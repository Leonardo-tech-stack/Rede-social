import { Injectable } from '@angular/core';
import { Observable, delay, mergeMap, of, tap, throwError, timer } from 'rxjs';
import { LoginResponse } from './login.interface';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authService: AuthService
  ) { }

  logInto(email: string, password: string): Observable<LoginResponse> {

    if(email === 'sincere@april.biz' && password === 'asdf1234') {
      return of({
        user: {
          name: 'Leanne',
          surname: 'Graham',
          email: 'sincere@april.biz',
        },
        token: 'asDS45%äsjbadfd&5gJK',
      })
      .pipe(
        delay(2000),
        tap(response => {
          this.authService.setUser(response.user);
          this.authService.setToken(response.token);
        })  
      );
    }

    return timer(3000).pipe(
      mergeMap(() => throwError('Usuario ou senha incorretos'))
    )  
  }


}