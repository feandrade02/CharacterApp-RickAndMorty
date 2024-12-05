import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CharacterResponse, Character } from '../model/interface/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  private favorites: Character[] = [];
  private favoritesSubject = new BehaviorSubject<Character[]>(this.favorites);

  favorites$ = this.favoritesSubject.asObservable();

  private favoriteCountSubject = new BehaviorSubject<number>(0);
  favoriteCount$ = this.favoriteCountSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCharacters(url: string = this.apiUrl): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(url);
  }

  toggleFavorite(character: Character): void {
    const index = this.favorites.findIndex((fav) => fav.id === character.id);

    if (index > -1) {
      // Remove se já estiver nos favoritos
      this.favorites.splice(index, 1);
    } else {
      // Adiciona se não estiver nos favoritos
      this.favorites.push(character);
    }

    // Atualiza o BehaviorSubject
    this.favoritesSubject.next([...this.favorites]);
    this.favoriteCountSubject.next(this.favorites.length);
  }

  getFavorites(): Character[] {
    return [...this.favorites];
  }
}
