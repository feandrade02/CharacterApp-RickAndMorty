import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../model/interface/character.model';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  @Input() character!: Character;
  
  isFavorited: boolean = false;

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    // Verifica se o personagem está nos favoritos ao inicializar
    const favorites = this.characterService.getFavorites();
    this.isFavorited = favorites.some((fav) => fav.id === this.character?.id);
  }

  toggleFavorite(): void {
    this.characterService.toggleFavorite(this.character);
    this.isFavorited = !this.isFavorited;
  }
}
