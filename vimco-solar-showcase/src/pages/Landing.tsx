import { Link } from 'react-router-dom';
import { Sun, Zap, ArrowRight, Phone, ChevronRight, MapPin, Shield, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import ClientLogosMarquee from '@/components/ClientLogosMarquee';
import TestimonialsSection from '@/components/TestimonialsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import CTABanner from '@/components/CTABanner';
import { useProjects } from '@/hooks/useProjects';
import heroImage from '@/assets/hero-solar-india.jpg';

const Landing = () => {
  const { data: projects = [], isLoading } = useProjects();
  
  // Only show first 3 projects
  const displayedProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header showAdminLink />
      <WhatsAppButton />
      
      {/* Hero Section - Indian Theme with Background Image */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Solar panels in India" 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay - stronger on mobile for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-india-navy/95 via-india-navy/85 to-india-navy/60 md:to-india-navy/40" />
        </div>

        {/* Indian flag stripe at top */}
        <div className="absolute top-0 left-0 right-0 h-1 md:h-1.5 flex z-20">
          <div className="flex-1 bg-india-saffron" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-india-green" />
        </div>

        {/* Decorative elements - hidden on small mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-india-saffron/40 animate-float" />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-solar-gold/30 animate-float" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-5 h-5 rounded-full bg-india-green/30 animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 py-16 sm:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left - Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in">
                <span className="text-xl">🇮🇳</span>
                <span className="text-sm font-medium text-white">Bharat Ka Trusted Solar Partner</span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 animate-slide-up leading-tight">
                Bijli Bill Mein
                <span className="block text-india-saffron mt-1 sm:mt-2">90% Tak Bachat!</span>
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 sm:mt-4 text-white/90">
                  Ab Solar Lagao, Paisa Bachao
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/80 max-w-xl mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Ghar ho ya business, humne 10+ saalon mein India bhar mein hazaron solar systems lagaye hain. Government subsidy mein bhi help karte hain!
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                {[
                  { icon: Sun, label: '10+ Saal Experience', color: 'india-saffron' },
                  { icon: Shield, label: '25 Saal Warranty', color: 'white' },
                  { icon: Award, label: 'Subsidy Assistance', color: 'india-green' },
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10"
                  >
                    <item.icon className={`h-4 w-4 sm:h-5 sm:w-5 text-${item.color}`} style={{ color: idx === 0 ? 'hsl(24 95% 53%)' : idx === 2 ? 'hsl(120 50% 35%)' : 'white' }} />
                    <span className="text-xs sm:text-sm font-medium text-white">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Location Badge */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <MapPin className="h-5 w-5 text-india-saffron" />
                <span className="text-white/80">Poore Bharat Mein Service</span>
              </div>

              {/* Quick Call CTA */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Button 
                  size="lg" 
                  className="bg-india-saffron hover:bg-india-saffron/90 text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-saffron"
                  asChild
                >
                  <a href="tel:+919041414599">
                    <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden xs:inline">Call Now: </span>+91 90414 14599
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="border-2 border-white/30 bg-white/5 text-white hover:bg-white/10 h-12 sm:h-14"
                  asChild
                >
                  <a href="#projects">
                    <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-solar-gold" />
                    View Our Work
                  </a>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="mt-6 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <div className="flex -space-x-2 sm:-space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-india-saffron to-solar-gold border-2 border-white flex items-center justify-center">
                        <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm sm:text-base">Hazaron Khush Customers</p>
                    <p className="text-white/60 text-xs sm:text-sm">Poore Bharat Mein</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Lead Capture Form */}
            <div className="animate-scale-in lg:ml-auto w-full max-w-md mx-auto lg:max-w-none" style={{ animationDelay: '0.2s' }}>
              <LeadCaptureForm variant="hero" />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      {/* Client Logos Marquee */}
      <ClientLogosMarquee />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* CTA Banner */}
      <CTABanner />

      {/* Projects Section - Show only 3 */}
      <section id="projects" className="py-12 sm:py-20 scroll-mt-8">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-14">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-india-saffron/10 text-india-saffron rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Hamare Kaam
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Hamare <span className="text-india-saffron">Projects</span> Dekho
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
              India bhar mein humne kiye hue premium solar installations
            </p>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-india-saffron" />
            </div>
          ) : displayedProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="animate-slide-up opacity-0"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <ProjectCard project={project} isPublicView />
                  </div>
                ))}
              </div>

              {/* View More Button */}
              {projects.length > 3 && (
                <div className="text-center">
                  <Button size="lg" variant="outline" asChild className="group border-india-saffron text-india-saffron hover:bg-india-saffron hover:text-white">
                    <Link to="/projects">
                      View All {projects.length} Projects
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-2xl border border-border">
              <Sun className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No projects available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-india-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-2xl sm:rounded-3xl shadow-card border border-border overflow-hidden india-stripe">
            <div className="grid md:grid-cols-2">
              {/* Left - Content */}
              <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                  Aaj Hi <span className="text-india-saffron">Bachat Shuru Karo</span>!
                </h2>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Free quote lo aaj hi! Humare experts aapki energy needs samajhkar best solar solution design karenge.
                </p>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {[
                    { text: 'Free Site Survey', color: 'india-saffron' },
                    { text: 'Custom Design', color: 'solar-gold' },
                    { text: 'Subsidy Mein Help', color: 'india-green' },
                    { text: '24/7 Support', color: 'india-saffron' }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 sm:gap-3">
                      <div 
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: idx === 2 ? 'hsl(120 50% 35% / 0.1)' : 'hsl(24 95% 53% / 0.1)' }}
                      >
                        <ArrowRight 
                          className="h-2.5 w-2.5 sm:h-3 sm:w-3" 
                          style={{ color: idx === 2 ? 'hsl(120 50% 35%)' : 'hsl(24 95% 53%)' }} 
                        />
                      </div>
                      <span className="text-foreground font-medium text-sm sm:text-base">{item.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="bg-india-saffron hover:bg-india-saffron/90 text-white w-full sm:w-auto" asChild>
                    <a href="tel:+919041414599">
                      <Phone className="mr-2 h-4 w-4" />
                      +91 90414 14599
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right - Form */}
              <div className="bg-muted/50 p-6 sm:p-8 md:p-12">
                <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6 text-foreground">Free Quote Lo Abhi!</h3>
                <LeadCaptureForm variant="section" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;