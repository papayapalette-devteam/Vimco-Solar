import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useCertificates, useCertificateMutations, Certificate } from '@/hooks/useSiteContent';
import api from "@/./api"
import { useToast } from '@/hooks/use-toast';
import axios from "axios";

const AdminCertificates = () => {

  const {toast}=useToast()
  const { data: certificates = [], isLoading } = useCertificates();
  const {  deleteCertificate } = useCertificateMutations();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Certificate | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    is_featured: false,
    is_active: true,
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({ title: '', description: '', image_url: '', is_featured: false, is_active: true, display_order: 0 });
    setEditingItem(null);
  };

  const openEdit = (item: Certificate) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      image_url: item.image_url,
      is_featured: item.is_featured,
      is_active: item.is_active,
      display_order: item.display_order,
    });
    setIsOpen(true);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {


    if (editingItem) {
      await api.put(`api/certificates/update-certificate/${editingItem._id}`, formData);

      toast({
        title: "Success",
        description: "Certificate updated successfully",
      });
    } else {
      await api.post(`api/certificates/add-certificate`, formData);

      toast({
        title: "Success",
        description: "Certificate created successfully",
      });
    }

    setIsOpen(false);
    resetForm();

  }  catch (error: unknown) {
  let message = "Failed to add certificate. Please try again.";

  if (axios.isAxiosError(error)) {
    message = error.response?.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
}
};


  if (isLoading) {
    return <div className="flex items-center justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Certificates ({certificates.length})</h2>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Certificate</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit' : 'Add'} Certificate</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} rows={3} />
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input id="image_url" value={formData.image_url} onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))} required placeholder="https://..." />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input id="display_order" type="number" value={formData.display_order} onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))} />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="is_featured" checked={formData.is_featured} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))} />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="is_active" checked={formData.is_active} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))} />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>
              <Button type="submit" className="w-full">
                {editingItem ? 'Update' : 'Create'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {certificates.map((item) => (
          <div key={item._id} className={`bg-card border border-border rounded-lg overflow-hidden ${!item.is_active ? 'opacity-50' : ''}`}>
            <div className="relative">
              <img src={item.image_url} alt={item.title} className="w-full h-32 object-cover" />
              {item.is_featured && (
                <div className="absolute top-2 right-2 bg-solar-gold text-primary-foreground p-1 rounded">
                  <Star className="h-3 w-3 fill-current" />
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm line-clamp-1 mb-1">{item.title}</h3>
              {item.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
              )}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" >
                  {item.is_active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(item)}>
                  <Edit className="h-3 w-3" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Certificate?</AlertDialogTitle>
                      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteCertificate.mutate(item._id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
        {certificates.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">No certificates yet. Add your first one!</div>
        )}
      </div>
    </div>
  );
};

export default AdminCertificates;
