import axios from 'axios';

export async function getTrainingsForParticipant(id: string) {
  try {
    const { data } = await axios.get(
      `/api/trainings/participant/trainings/${id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}
