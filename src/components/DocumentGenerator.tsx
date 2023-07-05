import { ParticipantDetailsT } from '@/types/types';
import { saveAs } from 'file-saver';
import { Button } from './ui/button';

import useSettingsStore from '@/store/useSettingsStore';
import { TemplateHandler } from 'easy-template-x';

const DocumentGenerator = ({ data }: { data: ParticipantDetailsT }) => {
  const { documentForParticipantsDirectUrl } = useSettingsStore();

  async function generateDocument() {
    try {
      const response = await fetch(documentForParticipantsDirectUrl, {
        method: 'GET',
        headers: {
          'Content-Type':
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          mode: 'cors',
        },
      });
      const templateFile = await response.blob();

      console.log(response);

      const handler = new TemplateHandler();
      const doc = await handler.process(templateFile, data);
      saveAs(new Blob([doc]), 'generated_document.docx');
    } catch (error) {
      console.error('Error generating document:', error);
    }
  }

  return <Button onClick={generateDocument}>Generate Document</Button>;
};

export default DocumentGenerator;
