import axios from 'axios';

export async function getBudgets() {
  try {
    const res = await axios.get('/api/budgets');
    return res;
  } catch (error) {
    throw error;
  }
}

export async function getTrainingsBudget() {
  try {
    const {data} = await axios.get('/api/budgets/trainings');
    return data;
  } catch (error) {
    throw error;
  }
}
