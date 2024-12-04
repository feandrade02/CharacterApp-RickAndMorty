import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  @Input() imageUrl!: string;
  @Input() name!: string;
  @Input() species!: string;
  @Input() type?: string;

  
  isFavorited = false;

  ngOnInit() {
    console.log('Dados do personagem:', {
      imageUrl: this.imageUrl,
      name: this.name,
      species: this.species,
      type: this.type
    });
  }

  toggleFavorite(): void {
    this.isFavorited = !this.isFavorited;
  }
}
