import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CharacterService } from '../../services/character.service';
import { Character, CharacterResponse } from '../../model/interface/character.model'
import { CommonModule } from '@angular/common';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule, 
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
  searchText: string = ''; // Armazena o texto da pesquisa
  searchError: boolean = false; // Indica erro ou resultado vazio
  private searchTerms = new Subject<string>();

  ngOnInit(): void {
    // Tenta carregar a página atual do localStorage ou inicia na página 1
    const savedPage = localStorage.getItem('currentPage');
    this.currentPage = savedPage ? parseInt(savedPage, 10) : 1;
    this.fetchCharacters(`${this.baseUrl}/?page=${this.currentPage}`);

    // Observa o Subject 'searchTerms' e realiza a busca com debounce
    this.searchTerms.pipe(
      debounceTime(300), // Espera 300ms após o usuário parar de digitar
      distinctUntilChanged() // Evita buscar com o mesmo termo consecutivamente
    ).subscribe(searchText => {
      this.isLoading = true;
      this.searchError = false;

      const searchTextLowerCase = searchText.trim().toLowerCase();
      const searchUrl = this.baseUrl + (searchText ? `/?name=${searchTextLowerCase}` : `/?page=${this.currentPage}`);

      this.characterService.getCharacters(searchUrl).subscribe({
        next: (response: CharacterResponse) => {
          this.isLoading = false;
          this.handleSearchResponse(response);
        },
        error: (error) => {
          this.isLoading = false;
          this.searchError = true;
          console.error('Erro ao carregar personagens:', error);
        },
      });
    });
  }

  // Método chamado ao digitar no campo de busca
  onSearch(): void {
    // Emite o termo de pesquisa para o 'searchTerms'
    this.searchTerms.next(this.searchText);
  }

  private handleSearchResponse(response: CharacterResponse): void {
    if (response && response.results.length > 0) {
      this.characters = response.results;
      this.totalPages = response.info.pages;
      this.currentPage = this.extractPageNumber(response.info.next, response.info.prev);
      localStorage.setItem('currentPage', String(this.currentPage));
      this.searchError = false;
    } else {
      this.characters = [];
      this.searchError = true; // Ativa o erro caso não haja resultados
    }
  }

  fetchCharacters(url: string): void {
    if (this.isLoading) return;
    this.isLoading = true;
    this.searchError = false;

    this.characterService.getCharacters(url).subscribe(
      (response: CharacterResponse) => {
        this.isLoading = false;
        this.handleSearchResponse(response);
      },
      (error) => {
        this.isLoading = false;
        this.searchError = true;
      }
    );
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      const url = this.searchText
        ? `${this.baseUrl}/?name=${this.searchText.toLowerCase()}&page=${this.currentPage + 1}`
        : `${this.baseUrl}/?page=${this.currentPage + 1}`;
      this.fetchCharacters(url);
    }
  }

  goToPrevPage(): void {
    if (this.currentPage > 1) {
      const url = this.searchText
        ? `${this.baseUrl}/?name=${this.searchText.toLowerCase()}&page=${this.currentPage - 1}`
        : `${this.baseUrl}/?page=${this.currentPage - 1}`;
      this.fetchCharacters(url);
    }
  }

  goToFirstPage(): void {
    const url = this.searchText
      ? `${this.baseUrl}/?name=${this.searchText.toLowerCase()}&page=1`
      : `${this.baseUrl}/?page=1`;
    this.fetchCharacters(url);
  }

  goToLastPage(): void {
    const url = this.searchText
      ? `${this.baseUrl}/?name=${this.searchText.toLowerCase()}&page=${this.totalPages}`
      : `${this.baseUrl}/?page=${this.totalPages}`;
    this.fetchCharacters(url);
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
