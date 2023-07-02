import { read, utils, WorkBook, WorkSheet } from 'xlsx';

export const parseExcelToJson = (file: File): Promise<any> => {
  console.log('Parsing Excel file:', file.name);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook: WorkBook = read(data, { type: 'array' });

      const worksheet: WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

      console.log('Parsed JSON data:', jsonData);
      resolve(jsonData);
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};
