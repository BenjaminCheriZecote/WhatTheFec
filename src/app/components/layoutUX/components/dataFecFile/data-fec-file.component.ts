import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Fec } from '../../../helpers/types/Fec';
import { FecService } from '../../../helpers/services/sharedServices/fecs.service';

@Component({
  selector: 'app-data-fec-file',
  standalone: true,
  imports: [NgIf],
  templateUrl: './data-fec-file.component.html',
  styleUrl: './data-fec-file.component.css'
})
export class DataFecFileComponent implements OnInit{
  @Input() fec: any;

  constructor(
    private fecService:FecService, 
  ) {}

  ngOnInit(): void {
    
  }


}
