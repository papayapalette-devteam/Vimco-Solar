import { Star, Quote } from 'lucide-react';
import { useTestimonials } from '@/hooks/useSiteContent';

const TestimonialsSection = () => {
  const { data: testimonials = [], isLoading } = useTestimonials();

  // Only show active testimonials
  const activeTestimonials = testimonials.filter(t => t.is_active);

  if (isLoading) {
    return (
      <section className="py-12 sm:py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (activeTestimonials.length === 0) return null;

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-14">
          <span className="inline-block px-3 sm:px-4 py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
            Join hundreds of satisfied customers who have made the switch to solar energy
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {activeTestimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-soft hover:shadow-card transition-all duration-300 relative group"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 sm:-top-4 left-4 sm:left-6 bg-primary p-2 sm:p-3 rounded-lg sm:rounded-xl text-primary-foreground shadow-lg">
                <Quote className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>

              {/* Rating */}
              <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4 mt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-solar-gold text-solar-gold" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {testimonial.image_url ? (
                    <img src={testimonial.image_url} alt={testimonial.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-primary font-bold text-base sm:text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
