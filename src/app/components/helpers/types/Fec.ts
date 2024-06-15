import * as ExcelJS from 'exceljs';

// ExcelJS.Workbook
export class Fec {
    file:File|null;
    reportControllFile:ReportControllFile;
    reportControllContent:ReportControllContent;
    workbook:ExcelJS.Workbook|any;
} 
export class ReportControllFile {
    headerColumns:string|null;
    // formatDate:string;
}
export class ReportControllContent {
    searchEmptyNumPiece:string|null;
    searchAlonePieceIsolateDate:string|null;
    checkDatesColumns:string|null;
    checkBalancePiece:string|null;
}

