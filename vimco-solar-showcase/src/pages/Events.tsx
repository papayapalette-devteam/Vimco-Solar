import { Calendar, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useEvents } from '@/hooks/useSiteContent';

const Events = () => {
  const { data: events = [], isLoading } = useEvents();
  const activeEvents = events.filter(e => e.is_active);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-4">
            <a href="/" className="hover:text-primary-foreground">Home</a>
            <span>›</span>
            <span>Events</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
            Events
          </h1>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : activeEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeEvents.map((event) => (
                <div key={event.id} className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-border group">
                  <div className="overflow-hidden">
                    {event.image_url ? (
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-56 bg-muted flex items-center justify-center">
                        <Calendar className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-india-saffron mb-2 leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">{event.author}</p>
                    {event.event_date && (
                      <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(event.event_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    )}
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No events available yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Events;
