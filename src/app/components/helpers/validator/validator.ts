
interface Validator {
    sizeFile: (file: File, errorTypeFile: any, isLoading:any) => void;
    typeFile: (file: File, errorTypeFile: any, isLoading:any) => void;
    emptyFile: (file: File, errorTypeFile: any, isLoading:any) => void;
    lengthBody: (body: any, errorTypeFile: any, isLoading:any, fecs:any) => void;
  }

const validator:Validator = {
    sizeFile: (file, errorTypeFile, isLoading) => {
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE){
            errorTypeFile.next("La taille du fichier est supérieur à 5Mo.");
            isLoading.next(false);
            throw new Error("Bad request. The file size is larger than 5MB");
        }
    },
    typeFile: (file, errorTypeFile, isLoading) => {
        if (file.type !== 'text/plain') {
            errorTypeFile.next("Veuillez sélectionner un fichier de type .txt");
            isLoading.next(false);
            throw new Error("Forbidden. Type '.txt' is needed." );
        }
            
    },
    emptyFile: (file, errorTypeFile, isLoading) => {
        if (file.size <= 0) {
            errorTypeFile.next("Fichier vide, veuillez vérifier votre fichier.");
            isLoading.next(false);
            throw new Error("Bad request. Empty file, please check your file." );
        }
    },
    lengthBody: (body, errorTypeFile, isLoading, fecs) => {
        if (body.length < 2) {
            errorTypeFile.next("Écritures comptables inexistantes ou insuffisantes.");
            isLoading.next(false);
            fecs.getValue().pop();
            throw new Error("Bad request. Not enought data." );
        }
    }

}

export default validator;