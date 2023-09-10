import axios from 'axios';

export async function deleteSpeakers(trainingCode: string) {
  try {
    const res = await axios.delete(`/api/speakers/${trainingCode}`);
    return res;
  } catch (error) {
    throw error;
  }
}
