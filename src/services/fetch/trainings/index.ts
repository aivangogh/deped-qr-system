import axios from 'axios';
import { create } from 'zustand';

export async function getPaps() {
  try {
    const { data } = await axios.get('/api/paps');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTraining(trainingCode: string) {
  try {
    const { data } = await axios.get(`/api/training/${trainingCode}`);
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
      `/api/training/${trainingCode}`,
      updateTraining
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createTraining(training: any) {
  try {
    const { data } = await axios.post(`/api/training`, training);
    return data;
  } catch (error) {
    throw error;
  }
}
