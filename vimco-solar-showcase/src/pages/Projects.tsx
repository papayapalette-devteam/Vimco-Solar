import { useState } from 'react';
import { Search, Filter, Loader2, Sun } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import StatsBar from '@/components/StatsBar';
import { useProjects } from '@/hooks/useProjects';

const Projects = () => {
  const { data: projects = [], isLoading, error } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const matchesType = filterType === 'all' || project.project_type === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-primary via-navy-deep to-primary py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-solar-gold/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Our Projects
            </h1>
            <p className="text-white/70 text-lg">Browse Our Complete Portfolio of Solar Installations</p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Stats */}
        <section className="mb-12 -mt-6 relative z-20">
          <div className="bg-card rounded-2xl shadow-card p-6 border border-border">
            <StatsBar projects={projects} />
          </div>
        </section>

        {/* Controls */}
        <section className="flex flex-col md:flex-row gap-4 mb-10 p-4 bg-muted/50 rounded-xl border border-border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by name, location, or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[180px] bg-background">
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
        </section>

        {/* Projects Grid */}
        <section>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-destructive/5 rounded-2xl border border-destructive/20">
              <p className="text-destructive text-lg font-medium">
                Failed to load projects. Please try again.
              </p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project._id}
                  className="animate-slide-up opacity-0"
                  style={{ 
                    animationDelay: `${index * 80}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <ProjectCard project={project} isPublicView />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-2xl border border-border">
              <div className="max-w-md mx-auto">
                <Sun className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg mb-2">
                  {projects.length === 0 
                    ? "No projects available yet."
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
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
