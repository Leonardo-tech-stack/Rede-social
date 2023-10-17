import { Component } from '@angular/core';

@Component({
  selector: 'app-mode-modal',
  templateUrl: './mode-modal.component.html',
  styleUrls: ['./mode-modal.component.css']
})
export class ModeModalComponent {

  darkMode: boolean = false; 
  
  setLightMode() {
    this.darkMode = false; // Desativa o modo escuro
  }

  setDarkMode() {
    this.darkMode = true; // Ativa o modo escuro
  }
}
