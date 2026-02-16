import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useClientLogos, useClientLogoMutations, ClientLogo } from '@/hooks/useSiteContent';
import api from "@/./api"
import { useToast } from '@/hooks/use-toast';
import axios from "axios";

const AdminClientLogos = () => {

  const {toast}=useToast()

  const { data: logos = [], isLoading } = useClientLogos();
  const {   deleteClientLogo } = useClientLogoMutations();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ClientLogo | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    text_logo: '',
    is_active: true,
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({ name: '', logo_url: '', text_logo: '', is_active: true, display_order: 0 });
    setEditingItem(null);
  };

  const openEdit = (item: ClientLogo) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      logo_url: item.logo_url || '',
      text_logo: item.text_logo || '',
      is_active: item.is_active,
      display_order: item.display_order,
    });
    setIsOpen(true);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {


    let response;

    if (editingItem) {
      // ✅ UPDATE
      response = await api.put(
        `api/logo/update-logo/${editingItem._id}`, // use _id if Mongo default
        formData
      );

      toast({
        title: "Success",
        description: "Logo updated successfully",
      });

    } else {
      // ✅ CREATE
      response = await api.post(
        `api/logo/add-logo`,
        formData
      );

      toast({
        title: "Success",
        description: "Logo created successfully",
      });
    }

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    setIsOpen(false);
    resetForm();

  } catch (error: unknown) {
  let message = "Failed to add logo. Please try again.";

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
        <h2 className="text-xl font-semibold">Client Logos ({logos.length})</h2>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Logo</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit' : 'Add'} Client Logo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Client Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input id="logo_url" value={formData.logo_url} onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))} placeholder="https://..." />
                <p className="text-xs text-muted-foreground mt-1">Leave empty to use text logo instead</p>
              </div>
              <div>
                <Label htmlFor="text_logo">Text Logo (fallback)</Label>
                <Input id="text_logo" value={formData.text_logo} onChange={(e) => setFormData(prev => ({ ...prev, text_logo: e.target.value }))} placeholder="e.g. FESTON" />
                <p className="text-xs text-muted-foreground mt-1">Displayed if no image URL is provided</p>
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {logos.map((item) => (
          <div key={item._id} className={`bg-card border border-border rounded-lg p-4 flex flex-col ${!item.is_active ? 'opacity-50' : ''}`}>
            <div className="h-16 flex items-center justify-center mb-3 bg-muted/30 rounded">
              {item.logo_url ? (
                <img src={item.logo_url} alt={item.name} className="max-h-full max-w-full object-contain" />
              ) : item.text_logo ? (
                <span className="font-bold text-lg">{item.text_logo}</span>
              ) : (
                <Image className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <p className="font-medium text-sm mb-2 text-center">{item.name}</p>
            <div className="flex items-center justify-center gap-1 mt-auto">
              <Button variant="ghost" size="icon" className="h-8 w-8">
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
                    <AlertDialogTitle>Delete Logo?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteClientLogo.mutate(item._id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
        {logos.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">No client logos yet. Add your first one!</div>
        )}
      </div>
    </div>
  );
};

export default AdminClientLogos;
