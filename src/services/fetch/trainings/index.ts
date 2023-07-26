import { CreateTrainingT } from '@/types/trainings';
import axios from 'axios';

export async function getTrainings() {
  try {
    const { data } = await axios.get(`/api/trainings`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTraining(trainingCode: string) {
  try {
    const { data } = await axios.get(`/api/trainings/${trainingCode}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateTraining(
  trainingCode: string,
  updateTraining: any
) {
  try {
    const { data } = await axios.put(
      `/api/trainings/${trainingCode}`,
      updateTraining
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createTraining(training: CreateTrainingT) {
  try {
    console.log(training);
    const { data } = await axios.post(`/api/trainings`, training);
    return data;
  } catch (error) {
    throw error;
  }
}
