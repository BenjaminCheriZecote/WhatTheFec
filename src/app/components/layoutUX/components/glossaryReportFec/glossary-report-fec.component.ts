import { Component, OnInit } from '@angular/core';
import { FontGlossaryIconComponent } from '../../icons/fontGlossaryIcon/font-glossary-icon.component';
import { SquareGlossaryIconComponent } from '../../icons/squareGlossaryIcon/square-glossary-icon.component';
import { legendGlossary } from '../../../helpers/types/legendGlossary';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-glossary-report-fec',
  standalone: true,
  imports: [FontGlossaryIconComponent, SquareGlossaryIconComponent, NgFor, NgIf],
  templateUrl: './glossary-report-fec.component.html',
  styleUrl: './glossary-report-fec.component.css'
})
export class GlossaryReportFecComponent implements OnInit {
  glossary:legendGlossary[];
  ngOnInit(): void {
    this.glossary = [
      {
        id:1,
        type:"square",
        ariaLabel:"cellule bleutée",
        width:"2rem",
        color:"var(--colorIconHome)",
        figCaption:"ligne d'écriture en erreur"
      },
      {
        id:2,
        type:"square",
        ariaLabel:"cellule rouge",
        width:"2rem",
        color:"var(--colorRedStrong)",
        figCaption:"écriture sans numéro de pièce"
      },
      {
        id:3,
        type:"font",
        ariaLabel:"texte en rouge",
        width:"2rem",
        color:"var(--colorRedStrong)",
        figCaption:"ligne d'écriture isolée, sans contrepartie"
      },
      {
        id:4,
        type:"font",
        ariaLabel:"texte en bleu",
        width:"2rem",
        color:"var(--colorBlueFontErrorDate)",
        figCaption:"date en erreur"
      },
    ]
  }
}
