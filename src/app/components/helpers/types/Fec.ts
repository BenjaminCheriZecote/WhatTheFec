
export class Fec {
    file:File|null;
    reportControllFile:ReportControllFile;
    reportControllContent:ReportControllContent;
    workbook:any;
} 
export class ReportControllFile {
    headerColumns:string;
    // formatDate:string;
}
export class ReportControllContent {
    searchEmptyNumPiece:string;
    searchAlonePieceIsolateDate:string;
    checkDatesColumns:string;
    checkBalancePiece:string;
}

