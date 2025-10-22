import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID} from '@angular/core';
import { NgIf, NgFor, isPlatformBrowser, AsyncPipe } from '@angular/common';
import { ScriptControllContentService } from '../../helpers/services/scriptControllContent/script-controll-content.service';
import { ScriptControllFileService } from '../../helpers/services/scriptControllFile/script-controll-file.service';
import { TagFecComponent } from '../../layoutUX/components/tagFec/tag-fec.component';
import { DataFecFileComponent } from '../../layoutUX/components/dataReportFec/data-report-fec.component';
import { Fec } from '../../helpers/types/Fec';
import { FecService } from '../../helpers/services/fecService/fecs.service';
import { GlossaryReportFecComponent } from '../../layoutUX/components/glossaryReportFec/glossary-report-fec.component';

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [NgIf, TagFecComponent, NgFor, DataFecFileComponent, GlossaryReportFecComponent, AsyncPipe ],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css',
  providers: [ScriptControllContentService, ScriptControllFileService]
})
export class TestingComponent implements OnInit{
  errorTypeFile:string='';
  reader:FileReader;
  fecs:(Fec | File)[];
  fec:Fec|null;
  isLoading$ = this.fecService.isLoading$;
  

  @ViewChild('file') inputFileElement!: ElementRef;
  @ViewChild('form') formElement!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private fecService:FecService,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) this.reader = new FileReader();
    this.fecService.fecs$.subscribe(fecs => {
      this.fecs = fecs;
    })
    this.fecService.fec$.subscribe(fec => {
      this.fec = fec;
    })
    this.fecService.errorTypeFile$.subscribe(errorTypeFile => {
      this.errorTypeFile = errorTypeFile;
    })
  }
  

  findFile = () => {
    this.inputFileElement.nativeElement.click();
  }

  getFile = async (input:any) => {
    this.fecService.takeFile(input);
    this.fecService.resetPercentLoaded();
    this.inputFileElement.nativeElement.value = '';
  }

  selectedFec = (event:Event, indexFec:number) => {
    const foundFec = this.fecService.getFecs().find((fec:Fec, index:number) => index === indexFec);
    if (foundFec) {
      this.fec = foundFec;
      this.fecService.setSelectedFec(event);
    }
  }
}
