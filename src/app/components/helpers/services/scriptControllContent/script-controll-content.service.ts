import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptControllContentService {
    sortData = (protoBody:any) => {
    protoBody.sort((a:any, b:any) => { 
        if (a[0] === b[0]) {
            return a[2] - b[2];
        } else {
            return a[0].localeCompare(b[0]);
        }
    } );
    // si le trie fait remonter une ligne vide en début de fichier, elle est supprimée
    // cas fréquent des fichier .txt ou un retour à la ligne est parfois laissé en fin de fichier
    if (!protoBody[0].length) protoBody.splice(0, 1);
    return protoBody;
    }

    searchEmptyNumPiece = (ws:any) => {
        let messageError:string = '';
        const rowsError:string[]= [];
        ws.eachRow((row:any, rowNumber:any) => {
            if (row.values[3] === '') {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFF1F2F4' }
                };

                row._cells[2].fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'ffe74141' }
                }
                rowsError.push(rowNumber);
            }
        });
        if (rowsError.length) messageError = `Écritures sans numéro de pièces : ${rowsError.length} ligne(s).`;
        return messageError;
    }

    searchAlonePieceIsolateDate = (ws:any) => {
        let messageError:string = '';
        const rowsErrorIsolatePieces = [];
        const rowsErrorIsolateDates = [];

        if (ws._rows[0]._cells[0]._value.value !== ws._rows[1]._cells[0]._value.value) {
            ws._rows[0].fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF1F2F4' }
            };
            
            ws._rows[0]._cells[2].font = {
                color: { argb: 'ffe74141' },
                bold: true
            };
            ws._rows[0]._cells[0].font = {
                color: { argb: 'ffe74141' },
                bold: true
            };

            rowsErrorIsolatePieces.push(1);
        };

        if (ws._rows[ws._rows.length-1]._cells[0]._value.value !== ws._rows[ws._rows.length-2]._cells[0]._value.value) {

            ws._rows[ws._rows.length-1].fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF1F2F4' }
            };

            ws._rows[ws._rows.length-1]._cells[2].font = {
                color: { argb: 'ffe74141' },
                bold: true
            };
            ws._rows[ws._rows.length-1]._cells[0].font = {
                color: { argb: 'ffe74141' },
                bold: true
            };

            rowsErrorIsolatePieces.push(ws._rows.length);

        } else if (ws._rows[ws._rows.length-1]._cells[2]._value.value !== ws._rows[ws._rows.length-2]._cells[2]._value.value) {
            ws._rows[ws._rows.length-1].fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF1F2F4' }
            };

            ws._rows[ws._rows.length-1]._cells[2].font = {
                color: { argb: 'ffe74141' },
                bold: true
            };

            rowsErrorIsolatePieces.push(ws._rows.length);
        };

        for (let index = 1; index < ws._rows.length-1; index++) {
            // si on est dans le meme code journal
            if (ws._rows[index-1]._cells[0]._value.value === ws._rows[index]._cells[0]._value.value) {
                
                // si p-1 !== p && p+1 !== p
                if (ws._rows[index-1]._cells[2]._value.value !== ws._rows[index]._cells[2]._value.value && ws._rows[index+1]._cells[2]._value.value !== ws._rows[index]._cells[2]._value.value) {
                    ws._rows[index].fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFF1F2F4' }
                    };
                    ws._rows[index]._cells[2].font = {
                        color: { argb: 'ffe74141' },
                        bold: true
                    };

                    rowsErrorIsolatePieces.push(index);
                };
                //si p-1 === p
                if (ws._rows[index-1]._cells[2]._value.value === ws._rows[index]._cells[2]._value.value) {
                    // si d-1 !== d
                    if (ws._rows[index-1]._cells[3]._value.value !== ws._rows[index]._cells[3]._value.value) {
                        ws._rows[index].fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFF1F2F4' }
                        };
                        ws._rows[index]._cells[3].font = {
                            color: { argb: 'FF0808CD' },
                            bold: true
                        };
                        rowsErrorIsolateDates.push(index);
                    };
                }

            } else if (ws._rows[index-1]._cells[0]._value.value !== ws._rows[index]._cells[0]._value.value && ws._rows[index+1]._cells[0]._value.value !== ws._rows[index]._cells[0]._value.value) {
                ws._rows[index].fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFF1F2F4' }
                };

                ws._rows[index]._cells[2].font = {
                    color: { argb: 'ffe74141' },
                    bold: true
                };
                ws._rows[index]._cells[0].font = {
                    color: { argb: 'ffe74141' },
                    bold: true
                };

                rowsErrorIsolatePieces.push(index);
            }
        }

        const rowsErrorIsolatePiecesSorted = [...new Set(rowsErrorIsolatePieces)];

        if (rowsErrorIsolatePieces.length) messageError = `Ligne d'écriture isolée : ${rowsErrorIsolatePiecesSorted.length} ligne(s).\n`
        if (rowsErrorIsolateDates.length) messageError = messageError + `Date d'écriture différente sur une même pièce : ${rowsErrorIsolateDates.length} ligne(s).`
        return messageError;
    }

    checkDatesColumns = (ws:any) => {
        let messageError:string = '';
        const rowsError:string[] = []
        ws.eachRow((row:any, rowNumber:any) => {
            if (row.values[4] !== row.values[10]) {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFF1F2F4' }
                };

                row._cells[3].font = {
                    color: { argb: 'FF0808CD' },
                    bold: true
                }

                row._cells[9].font = {
                    color: { argb: 'FF0808CD' },
                    bold: true
                }
                rowsError.push(rowNumber)
            }
        })

        if (rowsError.length) messageError = `Dates des colonnes EcritureDate et PieceDate différentes : ${rowsError.length} ligne(s).`
        return messageError;
    }

    // checkSelfDatesPiece: () => {

    // },

    checkBalancePiece = (header:any, body:any, ws2:any) => {
        let messageError = '';
        const objectPieces:any = {};
        const rowsError:string[] = [];

        if (header[11] === 'Debit' && header[12] === 'Credit') {
            body.forEach(([JournalCode, JournalLib, EcritureNum, EcritureDate, CompteNum, CompteLib, CompAuxNum, CompAuxLib, PieceRef, PieceDate, EcritureLib, Debit, Credit, EcritureLet, DateLet, ValidDate, Montantdevise, Idevise]:string|number[], index:number) => {
                if (objectPieces.hasOwnProperty(`${JournalCode}${EcritureNum}`)) {
                    objectPieces[`${JournalCode}${EcritureNum}`][3] += Debit;
                    objectPieces[`${JournalCode}${EcritureNum}`][4] += Credit;
                    objectPieces[`${JournalCode}${EcritureNum}`][5] = objectPieces[`${JournalCode}${EcritureNum}`][3] - objectPieces[`${JournalCode}${EcritureNum}`][4];
    
                } else {
                    objectPieces[`${JournalCode}${EcritureNum}`] = [index+1, JournalCode, EcritureNum, Debit, Credit, +Debit - +Credit]
                }
    
            });
        } else if (header[11] === 'Montant' && header[12] === 'Sens') {
            
            body.forEach(([JournalCode, JournalLib, EcritureNum, EcritureDate, CompteNum, CompteLib, CompAuxNum, CompAuxLib, PieceRef, PieceDate, EcritureLib, Montant, Sens, EcritureLet, DateLet, ValidDate, Montantdevise, Idevise]:string|number[], index:number) => {
                let parseSens: number = (typeof Sens === 'string') ? parseInt(Sens, 10) : Sens;
                let parseMontant: number = (typeof Montant === 'string') ? parseFloat(Montant) : Montant;
                
                if (objectPieces.hasOwnProperty(`${JournalCode}${EcritureNum}`)) {
                    if (parseSens === 1) objectPieces[`${JournalCode}${EcritureNum}`][3] += Montant;
                    if (parseSens === -1) objectPieces[`${JournalCode}${EcritureNum}`][4] += Montant;
                    objectPieces[`${JournalCode}${EcritureNum}`][5] = objectPieces[`${JournalCode}${EcritureNum}`][3] - objectPieces[`${JournalCode}${EcritureNum}`][4];
    
                } else {
                    let Debit;
                    let Credit;
                    if (parseSens === 1) Debit = parseMontant;
                    if (parseSens === -1) Credit = parseMontant;
                    objectPieces[`${JournalCode}${EcritureNum}`] = [index+1, JournalCode, EcritureNum, Debit?Debit:0, Credit?Credit:0, (Debit?Debit:0) - (Credit?Credit:0)]
                }
    
            });
        }


        const pieces:any[] = Object.values(objectPieces);
        const unbalancedPieces = pieces.filter(piece => piece[3].toFixed(2) !== piece[4].toFixed(2));
        unbalancedPieces.forEach((piece) => rowsError.push(piece[0]));
        unbalancedPieces.unshift(['Ligne', 'JournalCode', 'EcritureNum', 'Debit', 'Credit', 'Ecarts']);
        ws2.addRows(unbalancedPieces);
        
        if (rowsError.length) messageError = `Pièces déséquilibrées : ${rowsError.length} ligne(s).`;
        return messageError;
    }
  
}
