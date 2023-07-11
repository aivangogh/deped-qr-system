import axios from 'axios';

export default async function fetchUploadDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file, file.name);

  console.log(file);
  console.log('fetchUploadDocument');
  console.log(formData);

  const response = await axios.post(
    '/api/google-drive-file/upload/document',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  console.log(response);
  // return await fetch('/api/google-drive-file/upload/document', {
  //   method: 'POST',
  //   body: formData,
  // });
}
