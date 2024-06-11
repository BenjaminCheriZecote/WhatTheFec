import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { NgIf, NgFor, isPlatformBrowser } from '@angular/common';
import { ScriptControllContentService } from '../../helpers/services/scriptControllContent/script-controll-content.service';
import { ScriptControllFileService } from '../../helpers/services/scriptControllFile/script-controll-file.service';
import { StorageServiceService } from '../../helpers/services/storageService/storage-service.service';
import { TagFecComponent } from '../../layoutUX/components/tagFec/tag-fec.component';
import { DataFecFileComponent } from '../../layoutUX/components/dataReportFec/data-report-fec.component';
import { Fec } from '../../helpers/types/Fec';
import { FecService } from '../../helpers/services/sharedServices/fecs.service';

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [NgIf, TagFecComponent, NgFor, DataFecFileComponent],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css',
  providers: [ScriptControllContentService, ScriptControllFileService]
})
export class TestingComponent implements OnInit{

  errorTypeFile:string;
  reader:FileReader;
  fecs:Fec[];
  fec:Fec|null;
  

  @ViewChild('file') inputFileElement!: ElementRef;
  @ViewChild('form') formElement!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private scriptControllContent : ScriptControllContentService, 
    private scriptControllFile : ScriptControllFileService, 
    private storageService : StorageServiceService,
    private fecService:FecService, 
  ) {}

  ngOnInit(): void {
    this.errorTypeFile = '';
    if (isPlatformBrowser(this.platformId)) this.reader = new FileReader();
    this.fecService.fecs$.subscribe(fecs => {
      this.fecs = fecs;
    })
    this.fecService.fec$.subscribe(fec => {
      this.fec = fec;
    })
    
  }


  findFile = () => {
    this.inputFileElement.nativeElement.click();
  }

  getFile = (input:any) => {
    this.fecService.getFile(input);
  }

  selectedFec = (indexFec:number) => {
    const foundFec = this.fecService.getFecs().find((fec:Fec, index:number) => index === indexFec);
    this.fec = foundFec;
  }

}
