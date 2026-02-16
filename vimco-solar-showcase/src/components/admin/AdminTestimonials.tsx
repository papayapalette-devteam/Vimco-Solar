import { useState } from 'react';
import { Plus, Edit, Trash2, Star, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTestimonials, useTestimonialMutations, Testimonial } from '@/hooks/useSiteContent';
import api from "@/./api"
import { useToast } from '@/hooks/use-toast';


const AdminTestimonials = () => {

  const { toast } = useToast();

  const { data: testimonials = [], isLoading } = useTestimonials();
  const {   deleteTestimonial } = useTestimonialMutations();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    image_url: '',
    is_active: true,
    display_order: 0,
  });


  const resetForm = () => {
    setFormData({ name: '', role: '', content: '', rating: 5, image_url: '', is_active: true, display_order: 0 });
    setEditingItem(null);
  };

  const openEdit = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      content: item.content,
      rating: item.rating,
      image_url: item.image_url || '',
      is_active: item.is_active,
      display_order: item.display_order,
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {


    if (editingItem) {
      // ✅ UPDATE
      const response = await api.put(
        `api/testimonial/update-testimonial/${editingItem._id}`,
        formData
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast({
        title: "Success",
        description: "Testimonial updated successfully",
      });

    } else {
      // ✅ CREATE
      const response = await api.post(
        `api/testimonial/add-testimonial`,
        formData
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast({
        title: "Success",
        description: "Testimonial created successfully",
      });
    }

    setIsOpen(false);
    resetForm();

  } catch (error: unknown) {
    let message = "Something went wrong";

    if (error instanceof Error) {
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
        <h2 className="text-xl font-semibold">Testimonials ({testimonials.length})</h2>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Testimonial</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit' : 'Add'} Testimonial</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto p-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="role">Role / Location</Label>
                <Input id="role" value={formData.role} onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="content">Testimonial</Label>
                <Textarea id="content" value={formData.content} onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))} required rows={4} />
              </div>
              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setFormData(prev => ({ ...prev, rating: star }))} className="focus:outline-none">
                      <Star className={`h-6 w-6 ${star <= formData.rating ? 'fill-solar-gold text-solar-gold' : 'text-muted-foreground'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="image_url">Image URL (optional)</Label>
                <Input id="image_url" value={formData.image_url} onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))} placeholder="https://..." />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input id="display_order" type="number" value={formData.display_order} onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))} />
              </div>
              <div className="flex items-center gap-2">
                <Switch id="is_active" checked={formData.is_active} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))} />
                <Label htmlFor="is_active">Active</Label>
              </div>
              <Button type="submit" className="w-full">
                {editingItem ? 'Update' : 'Create'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {testimonials.map((item) => (
          <div key={item._id} className="bg-card border border-border rounded-lg p-4 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{item.name}</span>
                {!item.is_active && <span className="text-xs bg-muted px-2 py-0.5 rounded">Hidden</span>}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{item.role}</p>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-solar-gold text-solar-gold" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 line-clamp-2">"{item.content}"</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="icon" >
                {item.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                <Edit className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Testimonial?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteTestimonial.mutate(item._id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No testimonials yet. Add your first one!</div>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonials;
