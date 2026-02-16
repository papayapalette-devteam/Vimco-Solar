import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Settings, Wrench, Users, Calendar, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EPCCompany = () => {
  const services = [
    {
      icon: Settings,
      title: 'Operate',
      description: 'We operate the facility in accordance with applicable safety, occupational health and environment regulations.',
    },
    {
      icon: Wrench,
      title: 'Preventive and Corrective Maintenance',
      description: 'Inspection, testing, cleaning, and preventive maintenance and/or corrective repairs and replacement are carried out.',
    },
    {
      icon: Users,
      title: 'Infrastructure & Training',
      description: 'We provide all necessary Operations and Maintenance training and required set of onsite testing instruments and equipment.',
    },
    {
      icon: Calendar,
      title: 'Manpower Deployment & Maintenance Schedule',
      description: 'Our Operations and Maintenance team comprises qualified and trained personnel.',
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
              EPC Company
            </h1>
            <p className="text-white/70 text-lg">Engineering, Procurement & Construction</p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* EPC Overview */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                What is <span className="text-primary">EPC</span>?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                <strong className="text-foreground">EPC</strong> in the solar industry means <strong className="text-foreground">engineering, procurement, and construction.</strong> It is a term that is widely used by companies that provide end-to-end solar energy services, including designing the system, giving procurement details about the system, and installing it.
              </p>
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <a href="https://vimcosolar.com/wp-content/uploads/2023/03/Vimco-Solar1.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                  Download EPC Brochure
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://vimcosolar.com/wp-content/uploads/2023/03/solar-epc-300x263.png" 
                alt="Solar EPC"
                className="rounded-xl shadow-lg"
              />
              <img 
                src="https://vimcosolar.com/wp-content/uploads/2023/03/SJVN-Signs-EPC-Contract-for-125-MW-of-Solar-Projects-in-Uttar-Pradesh.png" 
                alt="EPC Project"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Build-EPC Approach */}
        <section className="mb-20 bg-gradient-to-br from-primary/5 to-solar-gold/5 rounded-2xl p-8 md:p-12 border border-border">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Build-EPC Approach: Turnkey and Flexible
          </h2>
          <div className="space-y-6 text-muted-foreground text-lg">
            <p className="leading-relaxed">
              <strong className="text-foreground">Design-build-EPC</strong> is the evolution of EPC – First, design-build uses the same basic framework as the original EPC model. You have one contract with a single company that's in charge of the engineering, procurement, and construction of your solar project.
            </p>
            <p className="leading-relaxed">
              The other critical aspect of EPC is that it eliminates the rigidity of the EPC process by integrating the flexibility and customization inherent with design-bid-build.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our EPC Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive end-to-end solar solutions from design to maintenance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div 
                key={idx}
                className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-primary to-navy-deep rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Solar Project?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            With our years of expertise, we can design and install a solar system that fits your requirements perfectly.
          </p>
          <Button size="lg" className="bg-solar-gold hover:bg-solar-gold-light text-primary" asChild>
            <Link to="/contact">
              Contact Us Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EPCCompany;
