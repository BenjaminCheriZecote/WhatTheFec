import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptControllFileService {
  headerColumns = (header:string[]) => {
    const structure18 = ['JournalCode', 'JournalLib', 'EcritureNum', 'EcritureDate', 'CompteNum', 'CompteLib', 'CompAuxNum', 'CompAuxLib', 'PieceRef', 'PieceDate', 'EcritureLib', 'Debit', 'Credit', 'EcritureLet', 'DateLet', 'ValidDate', 'Montantdevise', 'Idevise\r'];
    const structure18bis = ['JournalCode', 'JournalLib', 'EcritureNum', 'EcritureDate', 'CompteNum', 'CompteLib', 'CompAuxNum', 'CompAuxLib', 'PieceRef', 'PieceDate', 'EcritureLib', 'Montant', 'Sens', 'EcritureLet', 'DateLet', 'ValidDate', 'Montantdevise', 'Idevise\r'];

    const structure21 = ['JournalCode', 'JournalLib', 'EcritureNum', 'EcritureDate', 'CompteNum', 'CompteLib', 'CompAuxNum', 'CompAuxLib', 'PieceRef', 'PieceDate', 'EcritureLib', 'Debit', 'Credit', 'EcritureLet', 'DateLet', 'ValidDate', 'Montantdevise', 'Idevise', 'DateRglt', 'ModeRglt', 'NatOp\r'];
    const structure21bis = ['JournalCode', 'JournalLib', 'EcritureNum', 'EcritureDate', 'CompteNum', 'CompteLib', 'CompAuxNum', 'CompAuxLib', 'PieceRef', 'PieceDate', 'EcritureLib', 'Montant', 'Sens', 'EcritureLet', 'DateLet', 'ValidDate', 'Montantdevise', 'Idevise\r'];
    
    const structure22 = ['JournalCode', 'JournalLib', 'EcritureNum', 'EcritureDate', 'CompteNum', 'CompteLib', 'CompAuxNum', 'CompAuxLib', 'PieceRef', 'PieceDate', 'EcritureLib', 'Debit', 'Credit', 'EcritureLet', 'DateLet', 'ValidDate', 'Montantdevise', 'Idevise', 'DateRglt', 'ModeRglt', 'NatOp', 'IdClient\r'];
    const structure22bis = ['JournalCode', 'JournalLib', 'EcritureNum', 'EcritureDate', 'CompteNum', 'CompteLib', 'CompAuxNum', 'CompAuxLib', 'PieceRef', 'PieceDate', 'EcritureLib', 'Montant', 'Sens', 'EcritureLet', 'DateLet', 'ValidDate', 'Montantdevise', 'Idevise\r'];

    function isEqual(header:string[], tableau2:string[]) {
        const error:string[] = [];
      
        header.forEach((value, index) => { 
            if (value !== tableau2[index]) {
                error.push(value);
                console.log(error)
            }
        });

        if (error.length !== 0) {
            const messageError = `La strucure du fichier est invalide. Vérifiez l'orhographe du nom de la colonne : ${error}.`;
            return messageError;
        } else {
            const message = "La structure du fichier est correcte. Le nombre de colonne est autorisée, les entêtes de colonnes correspondent aux attentes légales.";
            return message;
        }
    }

    if (header[11] === structure18[11]) {
        if (header.length === 18) {
            let result = isEqual(header, structure18);
            return result;
        } else if (header.length === 21) {
            let result = isEqual(header, structure21);
            return result;
        } else if (header.length === 22) {
            let result = isEqual(header, structure22);
            return result;
        } else {
            const messageError = "La strucure du fichier est invalide. Vous ne disposez pas du nombre de colonnes autorisées.";
            return messageError;
        }
    } else {
        if (header.length === 18) {
            let result = isEqual(header, structure18bis);
            return result;
        } else if (header.length === 21) {
            let result = isEqual(header, structure21bis);
            return result;
        } else if (header.length === 22) {
            let result = isEqual(header, structure22bis);
            return result;
        } else {
            const messageError = "La strucure du fichier est invalide. Vous ne disposez pas du nombre de colonnes autorisées.";
            return messageError;
        }
    }
    
}

// formatDebCred: (data) => {

// },

formatDate = (date:any) => {
    // regex
    function checkFormat(date:any) {
        // vérifie le format AAAAMMJJ
        var regex = /^(19|20)\d\d(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
    
        return regex.test(date);
      }
      
      if (checkFormat(date)) {
        console.log("La date est au format AAAAMMJJ.");
      } else {
        console.log("La date n'est pas au format AAAAMMJJ.");
      }
}
}
