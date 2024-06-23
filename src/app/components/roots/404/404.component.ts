import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './404.component.html',
  styleUrl: './404.component.css'
})
export class PageNotFoundComponent {

}
