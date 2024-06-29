import { Component, Input } from '@angular/core';

@Component({
  selector: 'squareGlossaryIcon',
  standalone: true,
  imports: [],
  templateUrl: './square-glossary-icon.component.html',
  styleUrl: './square-glossary-icon.component.css'
})
export class SquareGlossaryIconComponent {
  @Input() ariaLabel: string;
  @Input() width: string;
  @Input() color: string;
}
