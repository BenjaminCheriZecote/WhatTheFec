import { Component, Input } from '@angular/core';

@Component({
  selector: 'fontGlossaryIcon',
  standalone: true,
  imports: [],
  templateUrl: './font-glossary-icon.component.html',
  styleUrl: './font-glossary-icon.component.css'
})
export class FontGlossaryIconComponent {
  @Input() ariaLabel: string;
  @Input() width: string;
  @Input() color: string;
}
