import axios from 'axios';

export async function importXlsxFile(trainingCode: string, xlsxFile: File) {
  try {
    const file = new FormData();
    file.set('xlsx-file', xlsxFile);

    const { data } = await axios.post(
      `/api/import-xlsx-file/${trainingCode}`,
      file
    );
    return data;
  } catch (error) {
    throw error;
  }
}
