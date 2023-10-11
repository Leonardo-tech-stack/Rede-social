import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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
  ) { }

  logout() {
    this.authService.logout();
  }

  onSearchTextChange() {
    this.searchTextChanged.emit(this.searchText); 
  }
}
