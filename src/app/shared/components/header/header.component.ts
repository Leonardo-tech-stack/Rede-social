import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() searchTextChanged = new EventEmitter<string>();
  @ViewChild('modalContent') modalContent: any;

  searchText: string = '';

  modalRef: BsModalRef = {} as BsModalRef;
  modalOpen: boolean = false;

  userName: string = 'Leanne Graham';

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: BsModalService,
  private el: ElementRef
  ) { }

  ngOnInit() {
    document.addEventListener('click', this.handleDocumentClick.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

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

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  handleDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target) && this.modalOpen) {
        this.closeModal();
    }
  }

}
