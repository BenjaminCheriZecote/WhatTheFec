import { Component, Input } from '@angular/core';

@Component({
  selector: 'loaderIcon',
  standalone: true,
  imports: [],
  templateUrl: './loader-icon.component.html',
  styleUrl: './loader-icon.component.css'
})
export class LoaderIconComponent {
  @Input() width: string;

}
