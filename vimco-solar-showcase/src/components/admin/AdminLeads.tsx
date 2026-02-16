import { useState } from 'react';
import { Trash2, Mail, Phone, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useContactSubmissions, useContactSubmissionMutations } from '@/hooks/useSiteContent';
import { format } from 'date-fns';

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  contacted: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  converted: 'bg-green-500/10 text-green-500 border-green-500/20',
  closed: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

const statusIcons: Record<string, React.ElementType> = {
  new: Clock,
  contacted: MessageSquare,
  converted: CheckCircle,
  closed: XCircle,
};

const AdminLeads = () => {
  const { data: submissions = [], isLoading } = useContactSubmissions();
  const { updateStatus, deleteSubmission } = useContactSubmissionMutations();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredSubmissions = filterStatus === 'all' 
    ? submissions 
    : submissions.filter(s => s.status === filterStatus);

  const statusCounts = submissions.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (isLoading) {
    return <div className="flex items-center justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Contact Leads ({submissions.length})</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ({submissions.length})</SelectItem>
              <SelectItem value="new">New ({statusCounts.new || 0})</SelectItem>
              <SelectItem value="contacted">Contacted ({statusCounts.contacted || 0})</SelectItem>
              <SelectItem value="converted">Converted ({statusCounts.converted || 0})</SelectItem>
              <SelectItem value="closed">Closed ({statusCounts.closed || 0})</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['new', 'contacted', 'converted', 'closed'].map((status) => {
          const Icon = statusIcons[status];
          return (
            <div key={status} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm capitalize text-muted-foreground">{status}</span>
              </div>
              <p className="text-2xl font-bold">{statusCounts[status] || 0}</p>
            </div>
          );
        })}
      </div>

      {/* Submissions List */}
      <div className="space-y-3">
        {filteredSubmissions.map((item) => {
          const StatusIcon = statusIcons[item.status] || Clock;
          return (
            <div key={item._id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{item.name}</span>
                    <Badge variant="outline" className={statusColors[item.status] || ''}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
                    <a href={`mailto:${item.email}`} className="flex items-center gap-1 hover:text-foreground">
                      <Mail className="h-3 w-3" />{item.email}
                    </a>
                    {item.phone && (
                      <a href={`tel:${item.phone}`} className="flex items-center gap-1 hover:text-foreground">
                        <Phone className="h-3 w-3" />{item.phone}
                      </a>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />{format(new Date(item.createdAt), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80">{item.message}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Select value={item.status} onValueChange={(status) => updateStatus.mutate({ id: item._id, status })}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Lead?</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete this contact submission.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteSubmission.mutate(item._id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          );
        })}
        {filteredSubmissions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {submissions.length === 0 ? 'No contact submissions yet.' : 'No submissions match this filter.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeads;
