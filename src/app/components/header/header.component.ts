import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  selectedButton: string = 'inicio'; // Valor inicial selecionado

  onSelectionChange(value: string) {
    this.selectedButton = value;
    console.log(this.selectedButton);
  }
}
