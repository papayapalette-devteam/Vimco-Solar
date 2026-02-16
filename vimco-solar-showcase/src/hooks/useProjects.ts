import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Project, ProjectFormData } from '@/types/project';
import api from "@/api"
import { log } from 'console';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await api.get("api/project/get-project");
      return data.data as Project[];
    },
  });
};

// export const useAddProject = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (formData: ProjectFormData & { imageUrls: string[] }) => {
//       const { data, error } = await supabase
//         .from('projects')
//         .insert({
//           title: formData.title,
//           location: formData.location,
//           capacity: formData.capacity,
//           completed_date: formData.completed_date || new Date().toISOString().split('T')[0],
//           description: formData.description || null,
//           client_name: formData.client_name || null,
//           project_type: formData.project_type,
//           status: 'completed',
//           images: formData.imageUrls,
//         })
//         .select()
//         .single();

//       if (error) throw error;
//       return data as Project;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['projects'] });
//     },
//   });
// };

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...formData
    }: Partial<Project> & { id: string }) => {

      const response = await api.put(
        `api/project/update-project/${id}`,
        formData
      );

      return response.data.data as Project;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};


export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`api/project/delete-project/${id}`);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};


export const uploadProjectImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `projects/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('project-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('project-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
