import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Fec } from '../../types/Fec';
import { BehaviorSubject } from 'rxjs';
import * as ExcelJS from 'exceljs';
import { ScriptControllContentService } from '../scriptControllContent/script-controll-content.service';
import { ScriptControllFileService } from '../scriptControllFile/script-controll-file.service';

@Injectable({
  providedIn: 'root',
})
export class FecService {
  private fecs = new BehaviorSubject<Fec[]>([]);
  private fec = new BehaviorSubject<Fec|null>(null);
  private percentLoaded = new BehaviorSubject<number>(0);
  fecs$ = this.fecs.asObservable();
  fec$ = this.fec.asObservable();
  percentLoaded$ = this.percentLoaded.asObservable();
  reader:FileReader;
  errorTypeFile:string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private scriptControllContent: ScriptControllContentService, 
    private scriptControllFile: ScriptControllFileService
  ) { }

  setFecs(value:Fec[]) : void {
    this.fecs.next(value)
  }
  addFec = (newFec:Fec) => {
    const currentFecs = this.fecs.getValue();
    this.fecs.next([...currentFecs, newFec])
  }
  getFecs() : any {
    return this.fecs.getValue();
  }

  getFile = async (inputFileElement:any) => {
    if (isPlatformBrowser(this.platformId)) {

      console.log("File selected");
  
      const selectedFile = inputFileElement.files[0];
  
      if (selectedFile.type !== 'text/plain') return this.errorTypeFile = 'Veuillez sélectionner un fichier de type text';
  
      this.errorTypeFile = '';
      this.reader = new FileReader();

      this.reader.addEventListener('progress', this.updateProgress);
      
      this.reader.addEventListener('load', async () => {
        const textContent = this.reader.result;
        // création d'un nouveau fichier excel / workbook
        const wb:ExcelJS.Workbook = new ExcelJS.Workbook();
        // ajout d'une feuille de calcul dans le workbook
        const ws:ExcelJS.Worksheet = wb.addWorksheet('Fichier Control');
        // ajout d'une seconde feuille de calcul
        const ws2:ExcelJS.Worksheet = wb.addWorksheet('Debit Credit');

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

          const newFec: Fec = {
            file: selectedFile,
            reportControllFile: {
              headerColumns: this.scriptControllFile.headerColumns(header)
            },
            reportControllContent: {
              searchEmptyNumPiece: this.scriptControllContent.searchEmptyNumPiece(ws),
              searchAlonePieceIsolateDate: this.scriptControllContent.searchAlonePieceIsolateDate(ws),
              checkDatesColumns: this.scriptControllContent.checkDatesColumns(ws),
              checkBalancePiece: this.scriptControllContent.checkBalancePiece(body, ws2)
            },
            workbook:wb
          };

          this.addFec(newFec);
          this.fec.next(newFec);

        }
  
        
      });
      // lecture du fichier, permettant ainsi l'observation des données.
      this.reader.readAsText(selectedFile);
    
    }
    return 
  }

  // Fonction pour mettre à jour la progression
updateProgress = (event: ProgressEvent<FileReader>) => {
  if (event.lengthComputable) {
    const percentProgress = Math.round((event.loaded / event.total) * 100);
    this.percentLoaded.next(percentProgress);
    console.log(`Progress: ${percentProgress}%`); 
  }
}
}
