import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderstateService {
  private toggleState = new BehaviorSubject<string>('inicio');
  toggleState$ = this.toggleState.asObservable();

  setToggleState(state: string): void {
    this.toggleState.next(state);
  }

  getToggleState(): string {
    return this.toggleState.value;
  }
}
