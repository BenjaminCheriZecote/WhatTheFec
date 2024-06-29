import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Fec } from '../../types/Fec';
import { BehaviorSubject } from 'rxjs';
import * as ExcelJS from 'exceljs';
import { ScriptControllContentService } from '../scriptControllContent/script-controll-content.service';
import { ScriptControllFileService } from '../scriptControllFile/script-controll-file.service';
import validator from '../../validator/validator';

@Injectable({
  providedIn: 'root',
})
export class FecService {
  private fecs = new BehaviorSubject<Fec[]>([]);
  private fec = new BehaviorSubject<Fec|null>(null);
  private isLoading = new BehaviorSubject<boolean>(false);
  private percentLoaded = new BehaviorSubject<number>(0);
  private errorTypeFile = new BehaviorSubject<string>('');

  fecs$ = this.fecs.asObservable();
  fec$ = this.fec.asObservable();
  isLoading$ = this.isLoading.asObservable();
  percentLoaded$ = this.percentLoaded.asObservable();
  errorTypeFile$ = this.errorTypeFile.asObservable();
  reader:FileReader;
  

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
  setSelectedFec = (event:Event|undefined) => {
    const fecs = document.querySelectorAll('.row');
    let tagFecElement;
    if (event) {
      tagFecElement = event.target instanceof HTMLElement && event.target.closest('.row');
    } else {
      tagFecElement = fecs[fecs.length- 1];
    }
    
    if (tagFecElement && tagFecElement.classList.contains('selected')) return

    if (isPlatformBrowser(this.platformId)) {
      fecs.forEach((fec) => {
        fec.classList.remove('selected');
      });
      if (tagFecElement) tagFecElement.classList.add('selected')
    }
  }

  resetPercentLoaded = () => {
    this.percentLoaded.next(0);
  }

  turnOffLoading = () => {
    this.isLoading.next(false);
  }

  takeFile = async (inputFileElement:any) => {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoading.next(true);
      const selectedFile:File = inputFileElement.files[0];
      console.log("selectedFile", selectedFile);
    
      validator.typeFile(selectedFile, this.errorTypeFile, this.isLoading);
      validator.emptyFile(selectedFile, this.errorTypeFile, this.isLoading);
      validator.sizeFile(selectedFile, this.errorTypeFile, this.isLoading);

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

      this.errorTypeFile.next('');
      this.reader = new FileReader();
      this.reader.addEventListener('load', async (event: ProgressEvent<FileReader>) => {
        await this.analyzeFile(selectedFile);
      });
      this.reader.readAsText(selectedFile);
    }
    return
  }
  analyzeFile = async (selectedFile:File) => {
    this.percentLoaded.next(1);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(console.log("Starting control"))
      }, 200)
    })
    const start = performance.now();
    const textContent = this.reader.result;
    
    if (textContent && typeof textContent === 'string') {
      // chaque ligne du fichier est stockée dans un tableau 'lines', grâce au retour à la ligne du fichier
      const lines = textContent.split('\n');
      // chaque élément de 'lines' est parcellisé pour obtenir les données de chaque colonnes grâce à la tabulatipn du fichier
      const data = Array.isArray(lines) ? lines.map(line => line.split('\t')) : [] as string[][];
      // le premier élément du tableau 'data', constitue la première ligne du fichier, soit les en-têtes des colonnes 
      const header:string[] = data[0];
      // le cors du fichier, sans les en-têtes, est récupéré dans protoBody
      const protoBody: (string | number)[][] = data.slice(1);

      this.percentLoaded.next(15); // SET LOADING 15%

      validator.lengthBody(protoBody, this.errorTypeFile, this.isLoading, this.fecs );
      
      await this.createFileExcelControl(selectedFile, protoBody, header);
      this.percentLoaded.next(100); // SET LOADING 100%
      return
    }
    const end = performance.now();
    console.log(`Execution time: ${end - start} milliseconds`);

    return
  }
  createFileExcelControl = async (selectedFile:File, protoBody:(string | number)[][], header:string[]) => {
    // création d'un nouveau fichier excel / workbook
    const wb:ExcelJS.Workbook = new ExcelJS.Workbook();
    // ajout d'une feuille de calcul dans le workbook
    const ws:ExcelJS.Worksheet = wb.addWorksheet('Fichier Control');
    // ajout d'une seconde feuille de calcul
    const ws2:ExcelJS.Worksheet = wb.addWorksheet('Debit Credit');
    // protoBody est d'abord trié
    this.scriptControllContent.sortData(protoBody);

    this.percentLoaded.next(30); // SET LOADING 30%
    
    // puis les données des colonnes débit et crédit sont convertis en nombre. Le résultat est stocké dans body
    const body = protoBody.map( line => {
        const modifiedLine = [...line];
        modifiedLine[11] = this.parseNumber(modifiedLine[11]);
        modifiedLine[12] = this.parseNumber(modifiedLine[12]);
        return modifiedLine;
    });

    this.percentLoaded.next(45); // SET LOADING 45%
    
    // Ajout des données dans la première feuille de calcul feuille de calcul
    ws.addRows(body);

    this.percentLoaded.next(55); // SET LOADING 55%

    const [searchEmptyNumPiece, searchAlonePieceIsolateDate, checkDatesColumns, checkBalancePiece] = await Promise.all([
      this.scriptControllContent.searchEmptyNumPiece(ws),
      this.scriptControllContent.searchAlonePieceIsolateDate(ws),
      this.scriptControllContent.checkDatesColumns(ws),
      this.scriptControllContent.checkBalancePiece(header, body, ws2)
    ]);
    this.percentLoaded.next(90); // SET LOADING 90%
    const newFec: Fec = {
      file: selectedFile,
      reportControllFile: {
        headerColumns: this.scriptControllFile.headerColumns(header)
      },
      reportControllContent: {
        searchEmptyNumPiece: searchEmptyNumPiece,
        searchAlonePieceIsolateDate: searchAlonePieceIsolateDate,
        checkDatesColumns: checkDatesColumns,
        checkBalancePiece: checkBalancePiece
      },
      workbook:wb
    };
    this.percentLoaded.next(95); // SET LOADING 95%

    this.updateFec(newFec);
    this.fec.next(newFec);
    this.percentLoaded.next(99); // SET LOADING 99%
  }
  parseNumber = (value: string | number): number => {
    if (typeof value === 'string') {
      // toFixed(2) retourne une string où les décimales sont arrodins à 2 chiffres après la virgule
      // ajout d'un second parseFloat pour reconvertir en nombre
      return parseFloat(parseFloat(value.replace(',', '.')).toFixed(2));
    }
    return value;
  };
  setError = (error:string) => {
    this.errorTypeFile.next(`${error}`)
  }
}
