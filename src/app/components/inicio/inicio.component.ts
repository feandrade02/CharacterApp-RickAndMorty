import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CharacterService } from '../../services/character.service';
import { Character, CharacterResponse } from '../../model/interface/character.model'
import { CommonModule } from '@angular/common';
import { CharacterCardComponent } from '../character-card/character-card.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule, 
    CharacterCardComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  characterService = inject(CharacterService);
  
  characters: Character[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  baseUrl: string = 'https://rickandmortyapi.com/api/character';
  isLoading: boolean = false; // Estado de carregamento

  ngOnInit(): void {
    // Tenta carregar a página atual do localStorage ou inicia na página 1
    const savedPage = localStorage.getItem('currentPage');
    this.currentPage = savedPage ? parseInt(savedPage, 10) : 1;
    this.fetchCharacters(`${this.baseUrl}/?page=${this.currentPage}`);
  }

  fetchCharacters(url: string): void {
    if (this.isLoading) return; // Evita chamadas simultâneas
    this.isLoading = true; // Ativa o estado de carregamento

    setTimeout(() => {
      this.characterService.getCharacters(url).subscribe((response: CharacterResponse) => {
        this.characters = response.results; // Atualiza os personagens
        this.totalPages = response.info.pages; // Total de páginas na API
        this.currentPage = this.extractPageNumber(response.info.next, response.info.prev); // Atualiza a página atual
        localStorage.setItem('currentPage', String(this.currentPage)); // Salva a página atual no localStorage
        this.isLoading = false; // Desativa o estado de carregamento
      },
      (error) => {
        console.error('Erro ao carregar personagens:', error);
        this.isLoading = false; // Desativa o estado de carregamento mesmo em caso de erro
      }
    );
  }, 1500);
}

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.fetchCharacters(`${this.baseUrl}/?page=${this.currentPage + 1}`);
    }
  }

  goToPrevPage(): void {
    if (this.currentPage > 1) {
      this.fetchCharacters(`${this.baseUrl}/?page=${this.currentPage - 1}`);
    }
  }

  goToFirstPage(): void {
    this.fetchCharacters(`${this.baseUrl}/?page=1`);
  }

  goToLastPage(): void {
    this.fetchCharacters(`${this.baseUrl}/?page=${this.totalPages}`);
  }

   // Extrai o número da página a partir das URLs `next` e `prev`
  private extractPageNumber(nextUrl: string | null, prevUrl: string | null): number {
    if (nextUrl) {
      return parseInt(new URL(nextUrl).searchParams.get('page') || '1', 10) - 1;
    } else if (prevUrl) {
      return parseInt(new URL(prevUrl).searchParams.get('page') || '1', 10) + 1;
    }
    return 1; // Página inicial por padrão
  }
}
