import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import api from "@/./api";

// Types
export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ClientLogo {
  _id: string;
  name: string;
  logo_url: string | null;
  text_logo: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Event {
  _id: string;
  title: string;
  author: string;
  description: string;
  image_url: string | null;
  event_date: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  _id: string;
  title: string;
  description: string | null;
  image_url: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  _id: string;
  key: string;
  value: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// Testimonials hooks
export const useTestimonials = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await api.get("api/testimonial/get-testimonial");
      return data.data as Testimonial[];
    },
  });
};

export const useTestimonialMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // const createTestimonial = useMutation({
  //   mutationFn: async (testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) => {
  //     const { data, error } = await supabase.from('testimonials').insert(testimonial).select().single();
  //     if (error) throw error;
  //     return data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['testimonials'] });
  //     toast({ title: 'Success', description: 'Testimonial created' });
  //   },
  //   onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  // });

//  const updateTestimonial = useMutation({
//   mutationFn: async ({
//     id,
//     ...updates
//   }: Partial<Testimonial> & { id: string }) => {
    
//     const response = await api.put(
//       `api/testimonial/update-testimonial/${id}`,
//       updates
//     );

//     if (!response.data.success) {
//       throw new Error(response.data.message || "Update failed");
//     }

//     return response.data.data;
//   },

//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ["testimonials"] });
//     toast({ title: "Success", description: "Testimonial updated" });
//   },

//   onError: (err: Error) =>
//     toast({
//       title: "Error",
//       description: err.message,
//       variant: "destructive",
//     }),
// });


 const deleteTestimonial = useMutation({
  mutationFn: async (id: string) => {
    const response = await api.delete(
      `api/testimonial/delete-testimonial/${id}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Delete failed");
    }

    return response.data;
  },

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    toast({ title: "Success", description: "Testimonial deleted" });
  },

  onError: (err: Error) =>
    toast({
      title: "Error",
      description: err.message,
      variant: "destructive",
    }),
});


  return {   deleteTestimonial };
};

// Client Logos hooks
export const useClientLogos = () => {
  return useQuery({
    queryKey: ['clientlogos'],
    queryFn: async () => {
      const { data } = await api.get("api/logo/get-logo");
      return data.data as ClientLogo[];
    },
  });
};

export const useClientLogoMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();




  const deleteClientLogo = useMutation({
  mutationFn: async (id: string) => {
    const response = await api.delete(
      `api/logo/delete-logo/${id}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Delete failed");
    }

    return response.data;
  },

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["client_logos"] });
    toast({
      title: "Success",
      description: "Client logo deleted",
    });
  },

  onError: (err: Error) =>
    toast({
      title: "Error",
      description: err.message,
      variant: "destructive",
    }),
});


  return {   deleteClientLogo };
};

// Events hooks
export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data } = await api.get("api/events/get-event");
      return data.data as Event[];
    },
  });
};

export const useEventMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();



   const deleteEvent = useMutation({
  mutationFn: async (id: string) => {
    const response = await api.delete(
      `api/events/delete-event/${id}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Delete failed");
    }

    return response.data;
  },

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["client_logos"] });
    toast({
      title: "Success",
      description: "event deleted",
    });
  },

  onError: (err: Error) =>
    toast({
      title: "Error",
      description: err.message,
      variant: "destructive",
    }),
});

  return {  deleteEvent };
};

// Certificates hooks
export const useCertificates = () => {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const { data } = await api.get("api/certificates/get-certificate");
      return data.data as Certificate[];
    },
  });
};

export const useCertificateMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

 

    const deleteCertificate = useMutation({
  mutationFn: async (id: string) => {
    const response = await api.delete(
      `api/certificates/delete-certificate/${id}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Delete failed");
    }

    return response.data;
  },

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["client_logos"] });
    toast({
      title: "Success",
      description: "Client certificate deleted",
    });
  },

  onError: (err: Error) =>
    toast({
      title: "Error",
      description: err.message,
      variant: "destructive",
    }),
});

  return { deleteCertificate };
};

// Site Settings hooks
export const useSiteSettings = () => {
  return useQuery({
    queryKey: ['site_settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;
      return data as SiteSetting[];
    },
  });
};

export const useSiteSettingMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const upsertSetting = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: Record<string, unknown> }) => {
      // First check if setting exists
      const { data: existing } = await supabase.from('site_settings').select('id').eq('key', key).maybeSingle();
      
      if (existing) {
        const { data, error } = await supabase.from('site_settings').update({ value: value as unknown as Record<string, never> }).eq('key', key).select().single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase.from('site_settings').insert([{ key, value: value as unknown as Record<string, never> }]).select().single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings'] });
      toast({ title: 'Success', description: 'Settings saved' });
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  return { upsertSetting };
};

// Contact Submissions hooks
export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  createdAt: string;
}

export const useContactSubmissions = () => {
  return useQuery({
    queryKey: ['contact_submissions'],
    queryFn: async () => {
      const response = await api.get('api/contact-us/get-contact-us');

      // if backend response is:
      // { success: true, count: 5, data: [...] }

      return response.data.data as ContactSubmission[];
    },
  });
};


export const useContactSubmissionMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_submissions'] });
      toast({ title: 'Success', description: 'Status updated' });
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  const deleteSubmission = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_submissions'] });
      toast({ title: 'Success', description: 'Submission deleted' });
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  return { updateStatus, deleteSubmission };
};
