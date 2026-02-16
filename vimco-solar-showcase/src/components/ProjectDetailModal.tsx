import { useState } from 'react';
import { MapPin, Calendar, Zap, Building2, Download, ChevronLeft, ChevronRight, FileDown, ImageDown, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Project } from '@/types/project';
import { toast } from '@/hooks/use-toast';
import { useDeleteProject } from '@/hooks/useProjects';
import EditProjectModal from './EditProjectModal';

interface ProjectDetailModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  isPublicView?: boolean;
}

const projectTypeStyles = {
  residential: 'bg-eco-green/10 text-eco-green border-eco-green/30',
  commercial: 'bg-accent/10 text-accent border-accent/30',
  industrial: 'bg-solar-gold/10 text-secondary-foreground border-solar-gold/30',
};

const ProjectDetailModal = ({ project, isOpen, onClose, isPublicView = false }: ProjectDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteProject = useDeleteProject();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProject.mutateAsync(project._id);
      toast({
        title: "Project Deleted",
        description: "The project has been permanently removed.",
      });
      onClose();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const downloadImage = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.title.replace(/\s+/g, '-')}-image-${index + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast({
        title: "Image Downloaded",
        description: `Image ${index + 1} has been downloaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not download the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadAllImages = async () => {
    toast({
      title: "Downloading Images",
      description: `Starting download of ${project.images.length} images...`,
    });
    
    for (let i = 0; i < project.images.length; i++) {
      await downloadImage(project.images[i], i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const downloadProjectDetails = () => {
    const details = `
VIMCO Solar - Project Details
=============================

Project: ${project.title}
Client: ${project.client_name || 'N/A'}
Location: ${project.location}
Project Type: ${project.project_type.charAt(0).toUpperCase() + project.project_type.slice(1)}
Capacity: ${project.capacity}
Completion Date: ${formatDate(project.completed_date)}
Status: ${project.status.charAt(0).toUpperCase() + project.status.slice(1)}

Description:
${project.description || 'No description provided.'}

---
Generated from VIMCO Solar Project Portfolio
Website: https://vimcosolar.com
    `.trim();

    const blob = new Blob([details], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.replace(/\s+/g, '-')}-details.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Details Downloaded",
      description: "Project details have been saved as a text file.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="font-display text-2xl font-bold text-foreground">
                {project.title}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge 
                  variant="outline" 
                  className={`capitalize ${projectTypeStyles[project.project_type]}`}
                >
                  {project.project_type}
                </Badge>
                <Badge variant="secondary" className="capitalize">
                  {project.status}
                </Badge>
              </div>
            </div>
            {!isPublicView && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditOpen(true)}
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" disabled={isDeleting}>
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Project</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{project.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Image Gallery */}
          <div className="relative rounded-xl overflow-hidden bg-muted">
            <div className="aspect-video relative">
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Download current image button */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-3 right-3 bg-card/90 hover:bg-card"
                onClick={() => downloadImage(project.images[currentImageIndex], currentImageIndex)}
              >
                <Download className="h-4 w-4" />
              </Button>

              {/* Navigation arrows */}
              {project.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-foreground/70 text-background px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {project.images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto">
                {project.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-primary ring-2 ring-primary/30' 
                        : 'border-transparent hover:border-border'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4 p-4 rounded-xl bg-muted/50">
              <h4 className="font-semibold text-foreground">Project Information</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">{project.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Zap className="h-4 w-4 text-solar-gold flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Capacity</p>
                    <p className="font-medium text-foreground">{project.capacity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Completion Date</p>
                    <p className="font-medium text-foreground">{formatDate(project.completed_date)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4 rounded-xl bg-muted/50">
              <h4 className="font-semibold text-foreground">Client Details</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Client Name</p>
                    <p className="font-medium text-foreground">{project.client_name || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Project Description</h4>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
          )}

          <Separator />

          {/* Download Actions */}
          <div className="flex flex-wrap gap-3">
            <Button variant="solar" onClick={downloadAllImages}>
              <ImageDown className="h-4 w-4" />
              Download All Images ({project.images.length})
            </Button>
            <Button variant="navy" onClick={downloadProjectDetails}>
              <FileDown className="h-4 w-4" />
              Download Project Details
            </Button>
          </div>
        </div>
      </DialogContent>

      {!isPublicView && (
        <EditProjectModal
          project={project}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </Dialog>
  );
};

export default ProjectDetailModal;
