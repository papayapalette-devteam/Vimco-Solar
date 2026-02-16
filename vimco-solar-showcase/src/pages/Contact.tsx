import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Find Us',
      lines: [
        '8-A, BHAGAT SINGH NAGAR, MODEL HOUSE,',
        'Jalandhar, Punjab, 144001',
      ],
    },
    {
      icon: Phone,
      title: 'Call Us',
      lines: [
        'Mobile: 9041414599',
        'Mobile: 9216546307',
        'Phone: 0181-4051414',
      ],
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: [
        'info@vimcosolar.com',
        'internationalvimco@gmail.com',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-primary via-navy-deep to-primary py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-solar-gold/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-white/70 text-lg">Get in Touch with Our Team</p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* Contact Info Cards */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, idx) => (
              <div 
                key={idx}
                className="bg-card rounded-2xl p-8 border border-border text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-6">
                  <info.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.lines.map((line, lineIdx) => (
                    <p key={lineIdx} className="text-muted-foreground">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
