import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HeaderstateService } from '../../services/headerstate.service';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  buttonToggleValue: string = 'inicio';
  favoriteCount: number = 0;

  constructor(
    private router: Router,
    private headerstateService: HeaderstateService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    // Observa mudanças no estado do serviço
    this.headerstateService.toggleState$.subscribe((state) => {
      this.buttonToggleValue = state;
    });

    // Observa a contagem de favoritos
    this.characterService.favoriteCount$.subscribe((count) => {
      this.favoriteCount = count;
    });
  }

  onSelectionChange(value: string): void {
    this.headerstateService.setToggleState(value); // Atualiza o estado no serviço
    if (value === 'inicio') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate([`/${value}`]);
    }
  }
}
