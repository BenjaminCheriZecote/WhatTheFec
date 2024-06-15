import { Component, Input } from '@angular/core';

@Component({
  selector: 'deleteIcon',
  standalone: true,
  imports: [],
  templateUrl: './delete-icon.component.html',
  styleUrl: './delete-icon.component.css'
})
export class DeleteIconComponent {
  @Input() width: string;
}
