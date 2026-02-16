import { useClientLogos } from '@/hooks/useSiteContent';

const ClientLogosMarquee = () => {
  const { data: logos = [], isLoading } = useClientLogos();

  const activeLogos = logos.filter(l => l.is_active);

  if (isLoading || activeLogos.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 bg-muted/30 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-6 sm:mb-8">
        <p className="text-center text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
          India Ke Top Brands Ke Saath Kaam Karte Hain
        </p>
      </div>
      
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-muted/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-muted/30 to-transparent z-10" />
        
        {/* Marquee container */}
        <div className="flex animate-marquee">
          {[...activeLogos, ...activeLogos].map((client, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 mx-3 sm:mx-6 flex items-center justify-center"
            >
              <div className="w-24 h-16 sm:w-32 sm:h-20 bg-card border border-border rounded-lg sm:rounded-xl shadow-soft flex items-center justify-center p-2 sm:p-3 hover:shadow-card hover:scale-105 transition-all duration-300">
                {client.logo_url ? (
                  <img 
                    src={client.logo_url} 
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : client.text_logo ? (
                  <span className="text-sm sm:text-lg font-bold text-india-navy tracking-wider">{client.text_logo}</span>
                ) : (
                  <span className="text-sm sm:text-lg font-bold text-primary">{client.name}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosMarquee;
