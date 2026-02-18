import { useState, useRef, useEffect } from 'react';
import { Upload, ImagePlus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Project } from '@/types/project';
import { useUpdateProject, uploadProjectImage } from '@/hooks/useProjects';
import api from "@/./api"
import { log } from 'console';

interface EditProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const EditProjectModal = ({ project, isOpen, onClose }: EditProjectModalProps) => {
  const [formData, setFormData] = useState({
    title: project.title,
    location: project.location,
    capacity: project.capacity,
    completed_date: project.completed_date,
    description: project.description || '',
    client_name: project.client_name || '',
    project_type: project.project_type as 'residential' | 'commercial' | 'industrial',
    images:[]
  });
  const [existingImages, setExistingImages] = useState<string[]>(project.images);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateProject = useUpdateProject();

  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const MAX_FILE_SIZE_MB = 10;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

useEffect(() => {
  setFormData({
    title: project.title,
    location: project.location,
    capacity: project.capacity,
    completed_date: project.completed_date,
    description: project.description || '',
    client_name: project.client_name || '',
    project_type: project.project_type as 'residential' | 'commercial' | 'industrial',
    images: project.images || [],
  });
}, [project]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: 'residential' | 'commercial' | 'industrial') => {
    setFormData(prev => ({ ...prev, project_type: value }));
  };

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return `"${file.name}" is not a supported image type. Please use JPG, PNG, WebP, or GIF.`;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `"${file.name}" exceeds ${MAX_FILE_SIZE_MB}MB limit.`;
    }
    return null;
  };

  const [uploading, setUploading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  const newFiles = Array.from(files);
  const validFiles: File[] = [];
  const errors: string[] = [];

  newFiles.forEach((file) => {
    const error = validateFile(file);
    if (error) {
      errors.push(error);
    } else {
      validFiles.push(file);
    }
  });

  if (errors.length > 0) {
    toast({
      title: "Invalid Files",
      description: errors.join(" "),
      variant: "destructive",
    });
  }

  if (validFiles.length === 0) return;

  try {
    setUploading(true); // 🔥 Start loader

    const formDataUpload = new FormData();
    validFiles.forEach((file) => {
      formDataUpload.append("files", file);
    });

    const response = await api.post(
      "api/upload/upload-files",
      formDataUpload
    );

    const data = response.data;

    if (!data.success) {
      throw new Error(data.message || "Upload failed");
    }

    const uploadedUrls = data.urls;

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls],
    }));

    setImagePreviews((prev) => [...prev, ...uploadedUrls]);

    toast({
      title: "Success",
      description: "Images uploaded successfully",
    });

  } catch (error: unknown) {
    let message = "Upload failed";

    if (error instanceof Error) {
      message = error.message;
    }

    toast({
      title: "Upload Failed",
      description: message,
      variant: "destructive",
    });
  } finally {
    setUploading(false); // 🔥 Stop loader
  }
};

const removeImage = (index: number) => {
  setFormData((prev) => ({
    ...prev,
    images: prev.images.filter((_, i) => i !== index),
  }));
};






  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalImages = existingImages.length + newImages.length;
    if (!formData.title || !formData.location || !formData.capacity || totalImages === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and have at least one image.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await updateProject.mutateAsync({
        id: project._id,
        ...formData,
      });

      toast({
        title: "Project Updated",
        description: "Your project has been successfully updated.",
      });
      
      onClose();
    } catch {
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold">
            Edit Project
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">

   <div className="space-y-3">
      <label className="font-medium">Project Images *</label>

      {/* Upload Box */}
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors
        ${uploading
            ? "border-gray-300 bg-gray-100 cursor-not-allowed"
            : "border-gray-300 cursor-pointer hover:border-blue-500 hover:bg-gray-50"
          }`}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
          disabled={uploading}
        />

        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-sm text-gray-600">Uploading images...</p>
          </div>
        ) : (
          <>
            <ImagePlus className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              Click or drag images here to upload
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG up to 10MB each
            </p>
          </>
        )}
      </div>

      {/* Preview Grid */}
      {formData.images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {formData.images.map((url, index) => (
            <div
              key={index}
              className="relative group aspect-video rounded-lg overflow-hidden"
            >
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Optional overlay when uploading new images */}
              {uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>


          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Residential Solar Installation"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client_name">Client Name</Label>
              <Input
                id="client_name"
                name="client_name"
                placeholder="e.g., ABC Corporation"
                value={formData.client_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., Mumbai, India"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity *</Label>
              <Input
                id="capacity"
                name="capacity"
                placeholder="e.g., 50 kW"
                value={formData.capacity}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project_type">Project Type</Label>
              <Select value={formData.project_type} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="completed_date">Completion Date</Label>
              <Input
                id="completed_date"
                name="completed_date"
                type="date"
                value={formData.completed_date}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the project details, specifications, and highlights..."
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="solar" 
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Upload className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectModal;
