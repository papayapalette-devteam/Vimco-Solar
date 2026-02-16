import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useEvents, useEventMutations, Event } from '@/hooks/useSiteContent';
import api from "@/./api"
import { useToast } from '@/hooks/use-toast';
import axios from "axios";

const AdminEvents = () => {

  const {toast}=useToast()

  const { data: events = [], isLoading } = useEvents();
  const { deleteEvent } = useEventMutations();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    image_url: '',
    event_date: '',
    is_active: true,
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({ title: '', author: '', description: '', image_url: '', event_date: '', is_active: true, display_order: 0 });
    setEditingItem(null);
  };

  const openEdit = (item: Event) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      author: item.author,
      description: item.description,
      image_url: item.image_url || '',
      event_date: item.event_date || '',
      is_active: item.is_active,
      display_order: item.display_order,
    });
    setIsOpen(true);
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {


    if (editingItem) {
     const response= await api.put(`api/events/update-event/${editingItem._id}`, formData);

      toast({
        title: "Success",
        description: "Event updated successfully",
      });
    } else {
      await api.post("api/events/add-event", formData);

      toast({
        title: "Success",
        description: "Event created successfully",
      });
    }

    setIsOpen(false);
    resetForm();
  }  catch (error: unknown) {
  let message = "Failed to add event. Please try again.";

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
        <h2 className="text-xl font-semibold">Events ({events.length})</h2>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Event</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit' : 'Add'} Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto p-2">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="author">Author / Organizer</Label>
                <Input id="author" value={formData.author} onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} required rows={4} />
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input id="image_url" value={formData.image_url} onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))} placeholder="https://..." />
              </div>
              <div>
                <Label htmlFor="event_date">Event Date (optional)</Label>
                <Input id="event_date" type="date" value={formData.event_date} onChange={(e) => setFormData(prev => ({ ...prev, event_date: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input id="display_order" type="number" value={formData.display_order} onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))} />
              </div>
              <div className="flex items-center gap-2">
                <Switch id="is_active" checked={formData.is_active} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))} />
                <Label htmlFor="is_active">Active</Label>
              </div>
              <Button type="submit" className="w-full" >
                {editingItem ? 'Update' : 'Create'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((item) => (
          <div key={item._id} className={`bg-card border border-border rounded-lg overflow-hidden ${!item.is_active ? 'opacity-50' : ''}`}>
            {item.image_url && (
              <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <h3 className="font-medium text-sm line-clamp-2 mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">{item.author}</p>
              {item.event_date && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <Calendar className="h-3 w-3" />
                  {new Date(item.event_date).toLocaleDateString()}
                </div>
              )}
              <p className="text-xs text-foreground/80 line-clamp-2 mb-3">{item.description}</p>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" >
                  {item.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Event?</AlertDialogTitle>
                      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteEvent.mutate(item._id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">No events yet. Add your first one!</div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
