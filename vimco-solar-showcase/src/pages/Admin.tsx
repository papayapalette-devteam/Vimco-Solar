import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, LogOut, LayoutDashboard, FolderKanban, MessageSquare, Users, Award, Calendar, Image, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminProjects from '@/components/admin/AdminProjects';
import AdminTestimonials from '@/components/admin/AdminTestimonials';
import AdminClientLogos from '@/components/admin/AdminClientLogos';
import AdminEvents from '@/components/admin/AdminEvents';
import AdminCertificates from '@/components/admin/AdminCertificates';
import AdminLeads from '@/components/admin/AdminLeads';
import AdminSiteSettings from '@/components/admin/AdminSiteSettings';
import { useToast } from '@/hooks/use-toast';
import AdminHeader from '@/components/AdminHeader';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ CHECK LOCAL STORAGE TOKEN
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/auth");
    } else {
      setIsAdmin(true);
    }

    setLoading(false);
  }, [navigate]);

  // ✅ LOGOUT
  const handleSignOut = () => {
    localStorage.removeItem("adminToken");

    toast({
      title: 'Signed Out',
      description: 'You have been successfully signed out.',
    });

    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const tabs = [
    { value: 'projects', label: 'Projects', icon: FolderKanban },
    { value: 'leads', label: 'Leads', icon: MessageSquare },
    { value: 'testimonials', label: 'Testimonials', icon: Users },
    { value: 'clients', label: 'Client Logos', icon: Image },
    { value: 'events', label: 'Events', icon: Calendar },
    { value: 'certificates', label: 'Certificates', icon: Award },
    { value: 'settings', label: 'Site Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-6 md:py-8">
        
        {/* Admin Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground text-sm">
                admin@gmail.com
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut} size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </section>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-auto flex-wrap justify-start gap-1 bg-muted/50 p-1 mb-6">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="flex items-center gap-1.5 px-3 py-2 text-sm data-[state=active]:bg-background"
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="projects" className="mt-0">
            <AdminProjects />
          </TabsContent>
          
          <TabsContent value="leads" className="mt-0">
            <AdminLeads />
          </TabsContent>
          
          <TabsContent value="testimonials" className="mt-0">
            <AdminTestimonials />
          </TabsContent>
          
          <TabsContent value="clients" className="mt-0">
            <AdminClientLogos />
          </TabsContent>
          
          <TabsContent value="events" className="mt-0">
            <AdminEvents />
          </TabsContent>
          
          <TabsContent value="certificates" className="mt-0">
            <AdminCertificates />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <AdminSiteSettings />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} VIMCO Solar. Go Green, Go For Solar.</p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
