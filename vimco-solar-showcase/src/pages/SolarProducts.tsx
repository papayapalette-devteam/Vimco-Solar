import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sun, Building2, Factory, ArrowRight, Zap, Battery, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SolarProducts = () => {
  const solarTypes = [
    {
      icon: Grid3X3,
      title: 'On-Grid Solar',
      description: 'Connected to the main electrical grid, allowing you to sell excess power back and reduce electricity bills significantly.',
    },
    {
      icon: Battery,
      title: 'Off-Grid Solar',
      description: 'Completely independent solar systems with battery storage, perfect for remote locations without grid access.',
    },
    {
      icon: Zap,
      title: 'Hybrid Solar',
      description: 'The best of both worlds - grid-connected with battery backup for uninterrupted power supply.',
    },
  ];

  const products = [
    {
      icon: Sun,
      title: 'Solar Power',
      description: 'Solar power works by converting energy from the sun into power. There are two forms of energy generated from the sun for our use – electricity and heat.',
      link: '/solar-power',
      image: 'https://vimcosolar.com/wp-content/uploads/revslider/home-3/slide-9.jpg',
    },
    {
      icon: Sun,
      title: 'Solar For Home',
      description: '1000+ Solar Power Projects around the country with guarantee and assurance of services whenever needed.',
      benefits: [
        'Financial investment returns',
        'Decrease upfront costs with solar incentives',
        'Reduction of your carbon footprint',
        'Major drop in electricity bills',
        'Increase in home value',
      ],
      link: '/solar-for-home',
    },
    {
      icon: Building2,
      title: 'Solar For Business',
      description: '100+ Solar Power Plants for Various Businesses, each project was Customized as per Client\'s need.',
      benefits: [
        'HIGHEST ROI',
        'NO LOCK-IN CONTRACT',
        'FEED IN TARIFF',
        '5 YEAR WORKMANSHIP WARRANTY',
      ],
      link: '/solar-for-business',
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
              Solar Products
            </h1>
            <p className="text-white/70 text-lg">Comprehensive Solar Energy Solutions</p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* Solar Power Types */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Types of Solar Power Systems
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Solar power works by converting energy from the sun into power through solar panels, ranging from residential rooftops to large solar farms.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {solarTypes.map((type, idx) => (
              <div 
                key={idx}
                className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-4 rounded-xl bg-primary/10 w-fit mb-6 group-hover:bg-primary/20 transition-colors">
                  <type.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{type.title}</h3>
                <p className="text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solar For Home */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-primary/5 to-solar-gold/5 rounded-2xl p-8 md:p-12 border border-border">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Sun className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-primary">Residential Solar</span>
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                  Solar Solutions For Your Home
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  1000+ Solar Power Projects around the country with guarantee and assurance of services whenever needed.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    'Financial investment returns',
                    'Decrease upfront costs with solar incentives',
                    'Reduction of your carbon footprint',
                    'Major drop in electricity bills',
                    'Increase in home value',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-solar-gold" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <Link to="/contact">
                    Get Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="bg-gradient-to-br from-solar-gold/20 to-primary/20 rounded-2xl p-8 flex items-center justify-center">
                <Sun className="h-32 w-32 text-solar-gold/50" />
              </div>
            </div>
          </div>
        </section>

        {/* Solar For Business */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-navy-deep to-primary rounded-2xl p-8 md:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img 
                  src="https://vimcosolar.com/wp-content/uploads/2023/03/black-solar-panel-lot-on-roof.jpg" 
                  alt="Commercial Solar Installation"
                  className="rounded-xl shadow-2xl"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-white/10">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-white/70">Commercial Solar</span>
                </div>
                <h2 className="font-display text-3xl font-bold mb-6">
                  Solar Systems for Your Business
                </h2>
                <p className="text-white/80 text-lg mb-6">
                  100+ Solar Power Plants for Various Businesses, each project was Customized as per Client's need.
                </p>
                <p className="text-white/70 mb-8">
                  A Commercial solar power project can significantly reduce your electricity bill and become a money-saving asset for your business, and you get to enjoy the tax benefits and government incentives as well.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {['HIGHEST ROI', 'NO LOCK-IN CONTRACT', 'FEED IN TARIFF', '5 YEAR WARRANTY'].map((benefit, idx) => (
                    <div key={idx} className="bg-white/10 rounded-lg p-4 text-center">
                      <span className="text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" className="bg-solar-gold hover:bg-solar-gold-light text-primary" asChild>
                  <Link to="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Invest */}
        <section className="text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              Why Invest in Solar?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Electricity prices are rising day by day and so are your daily expenses. On the other hand, the cost of installing solar has never been more pocket-friendly. If you install a solar system, you can count-out the expenditure of electricity out of your major monthly expenses list.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SolarProducts;
