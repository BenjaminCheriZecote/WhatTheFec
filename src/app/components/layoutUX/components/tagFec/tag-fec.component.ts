import { NgIf } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FecService } from '../../../helpers/services/sharedServices/fecs.service';
import saveAs from 'file-saver';

@Component({
  selector: 'app-tag-fec',
  standalone: true,
  imports: [NgIf],
  templateUrl: './tag-fec.component.html',
  styleUrl: './tag-fec.component.css'
})
export class TagFecComponent implements AfterViewInit{
  @Input() fec: any;
  percentLoaded:number;
  @ViewChild('progressLoaded') divProgressLoadedElement!:ElementRef;

  constructor(
    private fecService:FecService, 
  ) {}

  ngOnInit(): void {
    // abonnement a percentLoaded provenant de fecService
    this.fecService.percentLoaded$.subscribe(percentLoaded => {
      this.percentLoaded = percentLoaded;

      if (this.divProgressLoadedElement) this.divProgressLoadedElement.nativeElement.style.width = `${this.percentLoaded}%`;
    });
  }
  // on ne peut avoir accès à une variable @ViewChild a l'initialisation du composant (ngOnInit). 
  // affectation de la variable divProgressLoadedElement dans ngAfterViewInit 
  // puis dans ngOnit pour que sa valeur suive celle de l'abonnement de percentLoaded
  ngAfterViewInit(): void {
    if (this.divProgressLoadedElement) this.divProgressLoadedElement.nativeElement.style.width = `${this.percentLoaded}%`;
  }

  listenerButtonUploader = async (nameFile:string, wb:any) => {
    const buffer = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `WTFEC-${nameFile}.xlsx`);
  }
  
}
