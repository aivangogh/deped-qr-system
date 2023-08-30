import axios from 'axios';

export async function importXlsxFile(xlsxFile: File) {
  try {
    const file = new FormData();
    file.set('xlsx-file', xlsxFile);


    console.log('Importing XLSX file:', xlsxFile);
    const { data } = await axios.post(`/api/import-xlsx-file`, file);
    return data;
  } catch (error) {
    throw error;
  }
}
