import { NgIf } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FecService } from '../../../helpers/services/fecService/fecs.service';
import saveAs from 'file-saver';
import { Subscription } from 'rxjs';
import { FileIconComponent } from '../../icons/fileIcon/file-icon.component';
import { LoaderIconComponent } from '../../icons/loaderIcon/loader-icon.component';
import { DeleteIconComponent } from '../../icons/deleteIcon/delete-icon.component';
import {UploadIconComponent} from '../../icons/uploadIcon/upload-icon.component'
import { Fec } from '../../../helpers/types/Fec';


@Component({
  selector: 'app-tag-fec',
  standalone: true,
  imports: [NgIf, FileIconComponent, LoaderIconComponent, DeleteIconComponent, UploadIconComponent ],
  templateUrl: './tag-fec.component.html',
  styleUrl: './tag-fec.component.css'
})
export class TagFecComponent implements OnInit{
  @Input() fec: any;
  @Input() indexFec: number;

  fecs:(Fec | File)[];
  percentLoaded:number;
  loaded:boolean=false;

  @ViewChild('progressLoaded') progressLoadedElement!:ElementRef;
  private percentLoadedSubscription: Subscription;

  constructor(
    private fecService:FecService,
  ) {}

  ngOnInit(): void {
    this.fecService.setSelectedFec(undefined);
    this.fecService.fecs$.subscribe(fecs => {
      this.fecs = fecs;
    })
    // abonnement a percentLoaded provenant de fecService
    this.percentLoadedSubscription = this.fecService.percentLoaded$
    .subscribe(percentLoaded => {
      this.percentLoaded = percentLoaded;
      setTimeout(() => {
        // si la valeur de la balise html progress vaut 100, désabonnement de percentLoaded
        if (this.progressLoadedElement && this.progressLoadedElement.nativeElement.value === 100) {
          this.unsubscribeFromPercentLoaded();
          this.loaded = true;
          this.fecService.turnOffLoading();
        }
      });
    });
  }
  
  ngOnDestroy(): void {
    this.unsubscribeFromPercentLoaded();
  }

  private unsubscribeFromPercentLoaded(): void {
    if (this.percentLoadedSubscription) {
      this.percentLoadedSubscription.unsubscribe();
    }
  }

  listenerButtonUploader = async (nameFile:string, wb:any) => {
    const buffer = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `WTFEC-${nameFile}.xlsx`);
  }

  removeFec = () => {
    const currentFecs = this.fecService.getFecs();
    currentFecs.splice(this.indexFec, 1)
  }
}
