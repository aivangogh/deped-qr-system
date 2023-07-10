import axios from 'axios';

export default async function fetchUploadDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  console.log('fetchUploadDocument');
  console.log(file);

  const response = await axios.post('/api/google-drive-file/upload/document', {
    file,
  });

  console.log(response);
  // return await fetch('/api/google-drive-file/upload/document', {
  //   method: 'POST',
  //   body: file,
  // });
}
