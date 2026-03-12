import axios from '@/lib/axios';
import { CreateIdeaModel, SaveIdeaResponse } from '@/types/creator/create-idea-model';

export const saveIdeaDraftApi = async (
  model: CreateIdeaModel
): Promise<SaveIdeaResponse> => {
  const formData = new FormData();

  // Append DTO fields
  Object.entries(model).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      key === 'media' ||
      key === 'documents' ||
      key === 'id'
    ) return;

    formData.append(key, String(value));
  });

  // Media
  model.media?.forEach(file => {
    formData.append('media', file);
  });

  // Documents
  model.documents?.forEach(file => {
    formData.append('documents', file);
  });

  const response = await axios.post<SaveIdeaResponse>(
    `/creator/new-idea/${model.id ?? ''}`,
    formData
  );

  return response.data;
};






export const getDashboardStats = async () => {
  const response = await axios.get("/creator/dashboard");
  return response.data;
}
