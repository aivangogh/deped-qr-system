import { utils, read, WorkSheet, WorkBook } from 'xlsx';

export const parseExcelToJson = async (
  fileBuffer: ArrayBuffer,
  sheetIndex: number
): Promise<any[]> => {
  try {
    const workbook: WorkBook = read(fileBuffer, { type: 'buffer' });

    const worksheet: WorkSheet =
      workbook.Sheets[workbook.SheetNames[sheetIndex]];

    const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

    // Filter out empty arrays
    const nonEmptyRows = jsonData.filter((row: any) => row.length > 0);

    return jsonData;
  } catch (error: any) {
    throw new Error(`Error parsing Excel file: ${error.message}`);
  }
};
