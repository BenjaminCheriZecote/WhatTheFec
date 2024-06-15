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

  addFec = (newFec:Fec) => {
    const currentFecs = this.fecs.getValue();
    this.fecs.next([...currentFecs, newFec])
  }
  updateFec = (newFec:Fec) => {
    const currentFecs = this.fecs.getValue();
    const updatedFec = currentFecs.pop();
    if (updatedFec) {
      updatedFec.reportControllFile = newFec.reportControllFile;
      updatedFec.reportControllContent = newFec.reportControllContent;
      updatedFec.workbook = newFec.workbook;
      this.fecs.next([...currentFecs, updatedFec]);
    }
  }
  getFecs() : any {
    return this.fecs.getValue();
  }
  setSelectedFec = (event:Event) => {
    const tagFecElement = event.target instanceof HTMLElement && event.target.closest('.row');
    if (tagFecElement && tagFecElement.classList.contains('selected')) return
    if (isPlatformBrowser(this.platformId)) {
      const fecs = document.querySelectorAll('.row');
      fecs.forEach((fec) => {
        fec.classList.remove('selected');
      });
      if (event.target instanceof HTMLElement) event.target.classList.add('selected')
      if (tagFecElement) tagFecElement.classList.add('selected')
      
    }
  }

  resetPercentLoaded = () => {
    this.percentLoaded.next(0);
  }

  getFile = async (inputFileElement:any) => {
    if (isPlatformBrowser(this.platformId)) {
  
      const selectedFile:File = inputFileElement.files[0];
  
      if (selectedFile.type !== 'text/plain') return this.errorTypeFile = 'Veuillez sélectionner un fichier de type text';
      
      const protoFec = {
        file:selectedFile,
        reportControllFile: {
          headerColumns: null
        },
        reportControllContent: {
          searchEmptyNumPiece: null,
          searchAlonePieceIsolateDate: null,
          checkDatesColumns: null,
          checkBalancePiece: null
        },
        workbook:null
      };
      this.addFec(protoFec);

      this.errorTypeFile = '';
      this.reader = new FileReader();

      this.reader.addEventListener('progress', this.updateProgress);
      
      this.reader.addEventListener('load', async () => {
        this.percentLoaded.next(1);
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(console.log("test"))
          }, 200)
        })
        const start = performance.now();
        const textContent = this.reader.result;
        // création d'un nouveau fichier excel / workbook
        const wb:ExcelJS.Workbook = new ExcelJS.Workbook();
        // ajout d'une feuille de calcul dans le workbook
        const ws:ExcelJS.Worksheet = wb.addWorksheet('Fichier Control');
        // ajout d'une seconde feuille de calcul
        const ws2:ExcelJS.Worksheet = wb.addWorksheet('Debit Credit');
        this.percentLoaded.next(15);
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
          this.percentLoaded.next(30);
          // puis les données des colonnes débit et crédit sont convertis en nombre. Le résultat est stocké dans body
          const body = protoBody.map( line => {
              const modifiedLine = [...line];
              modifiedLine[11] = parseInt(modifiedLine[11] as string, 10);
              modifiedLine[12] = parseInt(modifiedLine[12] as string, 10);
              return modifiedLine;
          });
          this.percentLoaded.next(50);

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

          this.updateFec(newFec);
          this.fec.next(newFec);
          this.percentLoaded.next(100);
        }
        const end = performance.now();
        console.log(`Execution time: ${end - start} milliseconds`);
  
        
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
  }
}
}
