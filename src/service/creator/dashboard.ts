// service/creator/dashboard.ts
import axios from '@/lib/axios';
import { CreateIdeaModel } from '@/types/creator/create-idea-model';


export const saveIdeaDraftApi = async (model: CreateIdeaModel) => {
  const formData = new FormData();

  Object.entries(model).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      key !== 'media' &&
      key !== 'documents'
    ) {
      formData.append(key, value.toString());
    }
  });

  model.media?.forEach(file => formData.append('media', file));
  model.documents?.forEach(file => formData.append('documents', file));

  const res = axios.post(
    `/creator/new-idea/${ideaId ?? ''}`,
    formData,
    {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    );
};

export const getIdeaDraftApi = async (id: string) => {
  const res = await axios.get(`/creator/idea/draft/${id}`);
  return res.data as CreateIdeaModel;
};

export const submitIdeaApi = async (id: string) => {
  const res = await axios.post(`/creator/idea/submit/${id}`);
  return res.data;
};









// export const createIdeaApi = async (model: CreateIdeaModel) => {
//   const formData = new FormData();

//   // Append normal fields
//   Object.entries(model).forEach(([key, value]) => {
//     if (
//       key !== 'media' &&
//       key !== 'documents' &&
//       value !== undefined &&
//       value !== null
//     ) {
//       formData.append(key, value.toString());
//     }
//   });

//   // Append media
//   model.media.forEach((file) => {
//     formData.append('media', file);
//   });

//   // Append documents
//   model.documents.forEach((file) => {
//     formData.append('documents', file);
//   });

//   const response = await axios.post(
//     '/creator/new-idea',
//     formData,
//     {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     }
//   );

//   return response.data;
// };


export const getDashboardStats = async () => {
  const response = await axios.get("/creator/dashboard/stats");
  return response.data;
}
