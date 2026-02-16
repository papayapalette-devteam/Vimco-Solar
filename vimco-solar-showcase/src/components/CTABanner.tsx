import { Phone, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTABanner = () => {
  const whatsappLink = 'https://wa.me/919041414599?text=Hi!%20I%20am%20interested%20in%20solar%20solutions.';
  const channelLink = 'https://whatsapp.com/channel/0029Va6wftoH5JM4GXZcIH0z';

  return (
    <section className="py-10 sm:py-16 bg-gradient-to-r from-solar-gold via-solar-gold to-solar-gold-light relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2 sm:mb-3">
              Ready to Go Solar? Let's Talk!
            </h2>
            <p className="text-primary/80 max-w-xl text-sm sm:text-base">
              Get a free consultation and customized quote for your home or business. 
              Our experts are ready to help you save on electricity bills.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full sm:w-auto"
              asChild
            >
              <a href="tel:+919041414599">
                <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">Call: +91 90414 14599</span>
              </a>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold w-full sm:w-auto"
              asChild
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">WhatsApp Us</span>
              </a>
            </Button>
          </div>
        </div>

        {/* WhatsApp Channel */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center">
            <span className="text-primary/80 text-xs sm:text-sm">Stay updated with our latest offers:</span>
            <a
              href={channelLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full text-primary font-medium text-xs sm:text-sm transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Follow VIMCO Solar on WhatsApp
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
