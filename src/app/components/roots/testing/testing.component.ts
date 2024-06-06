import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { NgIf, isPlatformBrowser } from '@angular/common';
import { fecFile } from '../../helpers/types/fecFile';

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [NgIf],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent {

  clientListFEC:fecFile[];

  @ViewChild('file') inputFileElement!: ElementRef;
  @ViewChild('form') formElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  findFile = () => {
    this.inputFileElement.nativeElement.click();
  }

  getFile = () => {
    console.log("File selected");
    this.clientListFEC = [];

    const clientFile = this.inputFileElement.nativeElement.files[0];
    this.clientListFEC.push(clientFile);
    console.log('Sélectionné?', clientFile);
    console.log('Tableau client', this.clientListFEC);

    

  }

}
