import axios from 'axios';

export default async function (url: string) {
  try {
    const { data } = await axios.get('/api/google-drive-file', { url });
    return data;
  } catch (error) {
    throw error;
  }
}
