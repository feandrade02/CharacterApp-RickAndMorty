import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  onSelectionChange(value: string): void {
    console.log('Selecionado:', value);
  }
}
