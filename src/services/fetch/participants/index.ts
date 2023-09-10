import axios from 'axios';

export async function deleteParticipants(trainingCode: string) {
  try {
    const res = await axios.delete(`/api/participants/${trainingCode}`);
    return res;
  } catch (error) {
    throw error;
  }
}
