import { PapsT } from '@/types/paps';
import axios from 'axios';

export async function getPaps() {
  try {
    const { data } = await axios.get('/api/paps');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPap(papId: string) {
  try {
    const { data } = await axios.get(`/api/paps/${papId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updatePap(papId: string, updatePap: PapsT) {
  try {
    const { data } = await axios.put(`/api/paps/${papId}`, updatePap);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createPap(pap: PapsT) {
  try {
    const { data } = await axios.post(`/api/paps`, pap);
    return data;
  } catch (error) {
    throw error;
  }
}
