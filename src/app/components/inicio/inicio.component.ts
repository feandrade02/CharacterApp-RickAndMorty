import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {}
