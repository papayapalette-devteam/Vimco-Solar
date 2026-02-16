-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  capacity TEXT NOT NULL,
  completed_date DATE NOT NULL DEFAULT CURRENT_DATE,
  description TEXT,
  client_name TEXT,
  project_type TEXT NOT NULL DEFAULT 'residential' CHECK (project_type IN ('residential', 'commercial', 'industrial')),
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'ongoing')),
  images TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (portfolio is public)
CREATE POLICY "Anyone can view projects"
ON public.projects
FOR SELECT
USING (true);

-- Create policy for public insert (for now, anyone can add projects)
CREATE POLICY "Anyone can insert projects"
ON public.projects
FOR INSERT
WITH CHECK (true);

-- Create policy for public update
CREATE POLICY "Anyone can update projects"
ON public.projects
FOR UPDATE
USING (true);

-- Create policy for public delete
CREATE POLICY "Anyone can delete projects"
ON public.projects
FOR DELETE
USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

-- Storage policies for project images
CREATE POLICY "Anyone can view project images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Anyone can upload project images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Anyone can update project images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'project-images');

CREATE POLICY "Anyone can delete project images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'project-images');