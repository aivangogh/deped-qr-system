import { OfficesT } from '@/types/offices';
import axios from 'axios';

export async function getOffices() {
  try {
    const { data } = await axios.get('/api/offices');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOffice(officeId: string) {
  try {
    const { data } = await axios.get(`/api/offices/${officeId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateOffice(officeId: string, updateOffice: OfficesT) {
  try {
    const { data } = await axios.put(`/api/offices/${officeId}`, updateOffice);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createOffice(office: OfficesT) {
  try {
    const { data } = await axios.post(`/api/offices`, office);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteOffice(officeId: string) {
  try {
    const { data } = await axios.delete(`/api/offices/${officeId}`);
    return data;
  } catch (error) {
    throw error;
  }
}