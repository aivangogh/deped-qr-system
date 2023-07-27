import axios from 'axios';

type UpdateProfileType = {
  position: string;
  school: string;
  contactNumber: string;
};



export async function getProfile(id: string) {
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(id: string, profile: UpdateProfileType) {
  try {
    const { data } = await axios.put(`/api/users/${id}`, profile);
    return data;
  } catch (error) {
    throw error;
  }
}
