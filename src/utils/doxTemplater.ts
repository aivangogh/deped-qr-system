import DocxTemplater from 'docxtemplater';

import fs from 'fs';
import path from 'path';

// Load the docx file as binary content
const content = fs.readFileSync(
    path.resolve(__dirname, "input.docx"),
    "binary"
);