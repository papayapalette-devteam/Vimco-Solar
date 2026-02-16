import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Building2, Users, Award, Globe, Target, Eye } from 'lucide-react';

const About = () => {
  const stats = [
    { value: '2015', label: 'Year of Establishment' },
    { value: '100+', label: 'Commercial Projects' },
    { value: '1000+', label: 'Residential Projects' },
    { value: '50+', label: 'Workforce Strength' },
  ];

  const commitments = [
    'Empower communities with clean and sustainable energy.',
    'Provide customized solar solutions suited to individual needs and budgets.',
    'Deliver maximum efficiency and reliability through innovative solar integration.',
    'Support clients in achieving long-term savings and energy independence.',
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
              About Us
            </h1>
            <p className="text-white/70 text-lg">Home / About Us</p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* About VIMCO Section */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                About <span className="text-primary">VIMCO Solar</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                <strong className="text-foreground">VIMCO SOLAR,</strong> Established in the Year – 2015. A brand that needs no introduction has always believed in providing innovative solutions in solar technology. With that same commitment, we have now ventured into the world of solar technology.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                With our pioneering solar technology solutions we have set out on our journey of creating a pollution-free green world for future generations.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-solar-gold/10 rounded-2xl p-8 border border-border">
              <img 
                src="https://vimcosolar.com/wp-content/uploads/2023/03/1661978531842.jpeg" 
                alt="VIMCO Solar Team" 
                className="rounded-xl w-full h-auto shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="mb-20 bg-muted/30 rounded-2xl p-8 md:p-12 border border-border">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary" />
            Our Journey
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            <strong className="text-foreground">VIMCO International</strong> first began operations in Australia in 2015, securing its first major project in India the following year. Since then, the company has grown steadily, focusing on solar photovoltaic (PV) power plant integration — delivering environment-friendly, reliable, and sustainable electricity solutions for residential, institutional, and industrial applications.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Over the years, VIMCO has developed a global footprint with projects spanning multiple continents, successfully completing numerous on-grid, off-grid, and hybrid solar power installations across diverse sectors — including private institutions, hospitals, schools, rail coach factories, and defense & government projects.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="bg-card rounded-xl p-6 text-center border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary to-navy-deep rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-white/10">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                At VIMCO, our vision is to make clean and affordable energy accessible for everyone. We believe that the vast potential of solar energy can power a sustainable world — reducing dependency on fossil fuels while lowering electricity costs for our clients.
              </p>
            </div>
            <div className="bg-gradient-to-br from-solar-gold to-accent rounded-2xl p-8 text-primary">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-primary/90 leading-relaxed">
                To support this vision, we have built a collaborative platform inviting investors, clients, students, and professionals to help accelerate the global shift toward renewable energy. Our strategic alliances with both government and private renewable energy development agencies enable us to deliver high-quality, cost-effective, and scalable energy solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Our Commitment
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Through every project, VIMCO strives to deliver excellence
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {commitments.map((commitment, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
              >
                <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <p className="text-foreground">{commitment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Looking Ahead */}
        <section className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">
            Looking Ahead
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            While our operations are primarily focused in <strong className="text-foreground">India</strong>, our influence extends globally. We look forward to collaborating with new partners — particularly in <strong className="text-foreground">defense and government energy installations</strong> — to contribute to a greener, more resilient future powered by solar energy.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
