import { Component, OnInit } from '@angular/core';
import { ArticleHome } from '../../helpers/types/ArticleHome';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  articlesHome:ArticleHome[];
  
  ngOnInit(): void {
    this.articlesHome = [
      {
        title:"Vérifiez la structure du FEC",
        icon:"bx bxs-bank",
        label:"Se conformer aux normes légale en vue d'un eventuel control."
      },
      {
        title:"Repérez les erreurs potentielles",
        icon:"bx bxs-error-alt",
        label:"Liste les erreurs liées à la structure du FEC et des écritures."
      },
      {
        title:"Exportez le fichier de control",
        icon:"bx bx-search-alt-2",
        label:"Facilite le pointage des erreurs et la correction de celles-ci."
      }
    ]
  }
  
  
}
