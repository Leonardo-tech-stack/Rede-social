import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() searchTextChanged = new EventEmitter<string>(); 

  searchText: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  scrollToTop() {
    window.scroll(0, 0);
  }

  redirectToHome() {
    if (this.router.url === '/') {
      this.router.navigate(['/'], { skipLocationChange: true }).then(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.authService.logout();
  }

  onSearchTextChange() {
    this.searchTextChanged.emit(this.searchText); 
  }
}
