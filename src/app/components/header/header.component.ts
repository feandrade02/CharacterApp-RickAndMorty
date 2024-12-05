import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  buttonToggleValue: string = 'inicio';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Recupera o valor salvo no LocalStorage ao carregar o componente
    const savedValue = localStorage.getItem('buttonToggleValue');
    if (savedValue) {
      this.buttonToggleValue = savedValue;
      if (this.buttonToggleValue === 'inicio') {
        this.router.navigate(['/']);
      }
      else {
        this.router.navigate([`/${savedValue}`]);
      }
    }
  }

  onSelectionChange(value: string): void {
    this.buttonToggleValue = value;
    localStorage.setItem('buttonToggleValue', value); // Salva o valor no LocalStorage
    if (this.buttonToggleValue === 'inicio') {
      this.router.navigate(['/']);
    }
    else {
      this.router.navigate([`/${value}`]);
    }
  }
}
