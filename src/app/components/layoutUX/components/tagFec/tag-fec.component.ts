import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FecService } from '../../../helpers/services/sharedServices/fecs.service';
import saveAs from 'file-saver';

@Component({
  selector: 'app-tag-fec',
  standalone: true,
  imports: [NgIf],
  templateUrl: './tag-fec.component.html',
  styleUrl: './tag-fec.component.css'
})
export class TagFecComponent {
  @Input() fec: any;

  constructor(
    private fecService:FecService, 
  ) {}

  listenerButtonUploader = async (nameFile:string, wb:any) => {
    const buffer = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `WTFEC-${nameFile}.xlsx`);
  }
  
}
