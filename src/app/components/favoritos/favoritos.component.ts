import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../model/interface/character.model';
import { Router } from '@angular/router';
import { HeaderstateService } from '../../services/headerstate.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent {
  favoriteCharacters: Character[] = [];

  constructor(
    private characterService: CharacterService, 
    private router: Router,
    private headerstateService: HeaderstateService
  ) {}

  ngOnInit(): void {
    // Observa a lista de favoritos e atualiza a exibição
    this.characterService.favorites$.subscribe((favorites) => {
      this.favoriteCharacters = favorites;
    });
  }

  navigateBack(): void {
    this.headerstateService.setToggleState('inicio');
    this.router.navigate(['/']);
  }
}
