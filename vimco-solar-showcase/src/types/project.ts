export interface Project {
  _id: string;
  title: string;
  location: string;
  capacity: string;
  completed_date: string;
  description: string | null;
  images: string[];
  client_name: string | null;
  project_type: 'residential' | 'commercial' | 'industrial';
  status: 'completed' | 'ongoing';
  created_at?: string;
  updated_at?: string;
}

export interface ProjectFormData {
  title: string;
  location: string;
  capacity: string;
  completed_date: string;
  description: string;
  client_name: string;
  project_type: 'residential' | 'commercial' | 'industrial';
  images: File[];
}
