import { Shield, Clock, Award, Users, Wrench, Leaf } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: '25 Year Warranty',
    description: 'Industry-leading warranty on all solar panels and installations',
  },
  {
    icon: Clock,
    title: 'Fast Installation',
    description: 'Professional installation completed within 7-10 days',
  },
  {
    icon: Award,
    title: 'Certified Experts',
    description: 'Government certified and trained solar professionals',
  },
  {
    icon: Users,
    title: '500+ Happy Clients',
    description: 'Trusted by homeowners and businesses across India',
  },
  {
    icon: Wrench,
    title: 'Free Maintenance',
    description: 'Complimentary maintenance for the first year',
  },
  {
    icon: Leaf,
    title: 'Subsidy Assistance',
    description: 'Complete support for government subsidy applications',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 sm:py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-solar-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-14">
          <span className="inline-block px-3 sm:px-4 py-1.5 bg-solar-gold/20 text-solar-gold rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Why VIMCO Solar?
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            India's Trusted Solar Partner
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-sm sm:text-base px-4">
            We combine cutting-edge technology with exceptional service to deliver solar solutions that exceed expectations
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-solar-gold/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-solar-gold" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-1.5 sm:mb-2">{feature.title}</h3>
              <p className="text-primary-foreground/70 text-xs sm:text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
