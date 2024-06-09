import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { NgIf, NgFor, isPlatformBrowser } from '@angular/common';
import { ScriptControllContentService } from '../../helpers/services/scriptControllContent/script-controll-content.service';
import { ScriptControllFileService } from '../../helpers/services/scriptControllFile/script-controll-file.service';
import { StorageServiceService } from '../../helpers/services/storageService/storage-service.service';
import { DataFecFileComponent } from '../../layoutUX/components/dataFecFile/data-fec-file.component';
import * as ExcelJS from 'exceljs';
import { Fec } from '../../helpers/types/Fec';
import { FecService } from '../../helpers/services/sharedServices/fecs.service';




@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [NgIf, DataFecFileComponent, NgFor],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css',
  providers: [ScriptControllContentService, ScriptControllFileService]
})
export class TestingComponent implements OnInit{

  errorTypeFile:string;
  reader:FileReader;
  fecs:Fec[];
  fec:Fec;
  

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
    this.fecs = this.fecService.getFecs();
    this.fec = {
      file:null, 
      reportControllFile:{
        headerColumns:''
      }, 
      reportControllContent:{
        searchEmptyNumPiece:'',
        searchAlonePieceIsolateDate:'',
        checkDatesColumns:'',
        checkBalancePiece:'',
      }}
  }


  findFile = () => {
    this.inputFileElement.nativeElement.click();
  }

  getFile = () => {
    if (isPlatformBrowser(this.platformId)) {

      console.log("File selected");
  
      this.fec.file = this.inputFileElement.nativeElement.files[0];
  
      if (this.fec.file!.type !== 'text/plain') return this.errorTypeFile = 'Veuillez sélectionner un fichier de type text';
  
      this.errorTypeFile = '';
      
      this.reader.addEventListener('load', async () => {
        const textContent = this.reader.result;
        // création d'un nouveau fichier excel / workbook
        const wb = new ExcelJS.Workbook();
        // ajout d'une feuille de calcul dans le workbook
        const ws = wb.addWorksheet('Fichier Control');
        // ajout d'une seconde feuille de calcul
        const ws2 = wb.addWorksheet('Debit Credit');

        if (typeof textContent === 'string') {
          // chaque ligne du fichier est stockée dans un tableau 'lines', grâce au retour à la ligne fu fichier
          const lines = textContent && textContent.split('\n');
          // chaque élément de 'lines' est parcellisé pour obtenir les données de chaque colonnes grâce à la tabulatipn du fichier
          const data = Array.isArray(lines) ? lines.map(line => line.split('\t')) : [] as string[][];
          // le premier élément du tableau 'data', constitue la première ligne du fichier, soit les en-têtes des colonnes 
          const header:string[] = data[0];

          // le cors du fichier, sans les en-têtes, est récupéré dans protoBody
          const protoBody: (string | number)[][] = data.slice(1);
          // protoBody est d'abord trié
          this.scriptControllContent.sortData(protoBody);

          // puis les données des colonnes débit et crédit sont convertis en nombre. Le résultat est stocké dans body
          const body = protoBody.map( line => {
              const modifiedLine = [...line];
              modifiedLine[11] = parseInt(modifiedLine[11] as string, 10);
              modifiedLine[12] = parseInt(modifiedLine[12] as string, 10);
              return modifiedLine;
          });

          // Ajout des données dans la première feuille de calcul feuille de calcul
          ws.addRows(body);

          this.fec.reportControllFile.headerColumns = this.scriptControllFile.headerColumns(header);
          this.fec.reportControllContent.searchEmptyNumPiece = this.scriptControllContent.searchEmptyNumPiece(ws);
          this.fec.reportControllContent.searchAlonePieceIsolateDate = this.scriptControllContent.searchAlonePieceIsolateDate(ws);
          this.fec.reportControllContent.checkDatesColumns = this.scriptControllContent.checkDatesColumns(ws);
          this.fec.reportControllContent.checkBalancePiece = this.scriptControllContent.checkBalancePiece(body, ws2);


          console.log("log fec :", this.fec);
          this.fecService.setFecs(this.fec);
          this.fecService.setFec(this.fec);
        }
  
      });
      // lecture du fichier, permettant ainsi l'observation des données.
      this.reader.readAsText(this.fec.file!);
    }
    

    return
  }

  testButton = () => {
    console.log("log fecs :", this.fecService.getFecs().source.value)
  }

}
