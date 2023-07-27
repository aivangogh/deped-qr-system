import axios from 'axios';

export async function enroll(trainingCode: string, id: string) {
  try {
    const { data } = await axios.post(`/api/enroll`, {
      trainingCode,
      id,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
