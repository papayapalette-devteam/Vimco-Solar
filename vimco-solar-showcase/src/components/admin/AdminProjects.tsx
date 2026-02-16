import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProjectCard from '@/components/ProjectCard';
import StatsBar from '@/components/StatsBar';
import UploadProjectModal from '@/components/UploadProjectModal';
import { useProjects } from '@/hooks/useProjects';

const AdminProjects = () => {
  const { data: projects = [], isLoading, error } = useProjects();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project?.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project?.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const matchesType = filterType === 'all' || project.project_type === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Stats */}
      <StatsBar projects={projects} />

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects by name, location, or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[160px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="solar" onClick={() => setIsUploadOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-destructive text-lg">
            Failed to load projects. Please try again.
          </p>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            {projects.length === 0 
              ? "No projects yet. Add your first project to get started!"
              : "No projects found matching your criteria."}
          </p>
          {projects.length > 0 && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}

      {/* Upload Modal */}
      <UploadProjectModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </div>
  );
};

export default AdminProjects;
