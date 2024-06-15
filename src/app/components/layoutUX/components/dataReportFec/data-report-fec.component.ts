import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FecService } from '../../../helpers/services/fecService/fecs.service';

@Component({
  selector: 'app-data-report-fec',
  standalone: true,
  imports: [NgIf],
  templateUrl: './data-report-fec.component.html',
  styleUrl: './data-report-fec.component.css'
})
export class DataFecFileComponent {
  @Input() fec: any;

  constructor(
    private fecService:FecService, 
  ) {}
}
