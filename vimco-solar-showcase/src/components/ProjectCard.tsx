import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Zap, Building2, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types/project';
import ProjectDetailModal from './ProjectDetailModal';



interface ProjectCardProps {
  project: Project;
  isPublicView?: boolean;
}

const projectTypeStyles = {
  residential: 'bg-eco-green/10 text-eco-green border-eco-green/30',
  commercial: 'bg-accent/10 text-accent border-accent/30',
  industrial: 'bg-solar-gold/10 text-secondary-foreground border-solar-gold/30',
};



const ProjectCard = ({ project, isPublicView = false }: ProjectCardProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <>
      <article className="group relative overflow-hidden rounded-xl bg-card shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project?.images?.[0]}
            alt={project?.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          
          {/* Type Badge */}
          <Badge 
            variant="outline" 
            className={`absolute top-3 left-3 capitalize ${projectTypeStyles[project.project_type]}`}
          >
            {project?.project_type}
          </Badge>

          {/* Image Count */}
          {project?.images?.length > 1 && (
            <div className="absolute top-3 right-3 rounded-full bg-foreground/70 px-2 py-1 text-xs text-background">
              {project.images.length} photos
            </div>
          )}

          {/* Quick Stats Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 text-sm text-background">
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4 text-solar-gold" />
              <span className="font-medium">{project?.capacity}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1 mb-2">
            {project.title}
          </h3>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1">{project.location}</span>
            </div>
            {project.client_name && (
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 flex-shrink-0" />
                <span>{project.client_name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>{formatDate(project.completed_date)}</span>
            </div>
          </div>

          {project.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {project.description}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={() => setIsDetailOpen(true)}
            >
              <Eye className="h-4 w-4" />
              View Details
            </Button>
            <Link to={`/project/${project._id}`}>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
                Preview
              </Button>
            </Link>
          </div>
        </div>
      </article>

      <ProjectDetailModal 
        project={project} 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)}
        isPublicView={isPublicView}
      />
    </>
  );
};

export default ProjectCard;
