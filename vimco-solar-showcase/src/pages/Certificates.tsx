import { Loader2, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useCertificates } from '@/hooks/useSiteContent';

const Certificates = () => {
  const { data: certificates = [], isLoading } = useCertificates();
  const activeCertificates = certificates.filter(c => c.is_active);
  const featuredCert = activeCertificates.find(c => c.is_featured);
  const regularCerts = activeCertificates.filter(c => !c.is_featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-4">
            <a href="/" className="hover:text-primary-foreground">Home</a>
            <span>›</span>
            <span>Our Certificates</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
            Our Certificates
          </h1>
        </div>
      </section>

      {/* Certificates Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : activeCertificates.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Content */}
              <div>
                <h2 className="text-india-saffron font-display text-2xl md:text-3xl font-bold mb-6">
                  OUR CERTIFICATE
                </h2>
                <div className="w-16 h-1 bg-india-saffron mb-6"></div>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">VIMCO SOLAR, Established in the Year – 2015.</strong> A brand that needs no introduction has always believed in providing innovative solutions in solar technology. With that same commitment, we have now ventured into the world of solar technology. With our pioneering solar technology solutions we have set out on our journey of creating a pollution-free green world for future generations.
                </p>
                
                {/* Certificate Grid */}
                <div className="grid grid-cols-2 gap-6 mt-10">
                  {regularCerts.map((cert) => (
                    <div 
                      key={cert.id} 
                      className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-border"
                    >
                      <img 
                        src={cert.image_url} 
                        alt={cert.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3">
                        <p className="text-xs font-medium text-foreground">{cert.title}</p>
                        {cert.description && (
                          <p className="text-xs text-muted-foreground mt-1">{cert.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Content - Featured Certificate */}
              <div className="lg:sticky lg:top-24">
                {featuredCert ? (
                  <img 
                    src={featuredCert.image_url} 
                    alt={featuredCert.title}
                    className="w-full rounded-lg shadow-xl"
                  />
                ) : regularCerts.length > 0 ? (
                  <img 
                    src={regularCerts[0].image_url} 
                    alt={regularCerts[0].title}
                    className="w-full rounded-lg shadow-xl"
                  />
                ) : null}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg">No certificates available yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Certificates;
