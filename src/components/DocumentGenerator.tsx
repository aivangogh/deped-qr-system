import * as React from 'react';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { ParticipantDetailsT } from '@/types/types';
import { Button } from './ui/button';

import fs from 'fs';
import path from 'path';

const DocumentGenerator = ({ data }: { data: ParticipantDetailsT }) => {
  const generateDocument = async () => {
    try {
      // Load the template
      const response = await fetch('/api/template');
      const templateFile = await response.arrayBuffer();

      console.log(response);

      const zip = new PizZip(templateFile);
      const doc = new Docxtemplater(zip);

      // Render and save the document
      doc.setData({
        participant: data.participant,
      });
      doc.render();
      const generatedDocument = doc.getZip().generate({ type: 'nodebuffer' });
      saveAs(new Blob([generatedDocument]), 'generated_document.docx');
    } catch (error) {
      console.error('Error generating document:', error);
    }
  };

  return <Button onClick={generateDocument}>Generate Document</Button>;
};

export default DocumentGenerator;
