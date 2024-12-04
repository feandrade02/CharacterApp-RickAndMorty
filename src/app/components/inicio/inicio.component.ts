import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../../services/character.service';
import { Character, CharacterResponse } from '../../model/interface/character.model'
import { CommonModule } from '@angular/common';
import { CharacterCardComponent } from '../character-card/character-card.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule,
    CharacterCardComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  characterService = inject(CharacterService);
  characters: Character[] = [];

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe((response: CharacterResponse) => {
      this.characters = response.results; // Armazena os personagens na propriedade
    });
  }
}
