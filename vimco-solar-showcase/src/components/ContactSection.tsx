import { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import api from "@/./api"

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrors({});

  const result = contactFormSchema.safeParse(formData);

  if (!result.success) {
    const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
    result.error.errors.forEach((err) => {
      if (err.path[0]) {
        fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
      }
    });
    setErrors(fieldErrors);

    toast({
      title: "Validation Error",
      description: "Please fix the errors in the form.",
      variant: "destructive",
    });
    return;
  }

  setIsSubmitting(true);

  try {
    // 🔥 Using your backend API instead of Supabase
    const response = await api.post("api/contact-us/save-contact-us",formData);

    // If your backend sends success status
    if (response.status !== 200 && response.status !== 201) {
      throw new Error("API Error");
    }

    setIsSubmitted(true);

    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. Redirecting to WhatsApp...",
    });

    // WhatsApp redirect
    // const whatsappMessage = encodeURIComponent(
    //   `Hi VIMCO Solar Team!\n\n` +
    //     `Name: ${formData.name}\n` +
    //     `Email: ${formData.email}\n` +
    //     `Phone: ${formData.phone || "Not provided"}\n` +
    //     `Message: ${formData.message}\n\n` +
    //     `I submitted this inquiry via your website.`
    // );

    // const whatsappUrl = `https://wa.me/919041414599?text=${whatsappMessage}`;

    // setTimeout(() => {
    //   window.open(whatsappUrl, "_blank");
    // }, 500);
  } catch (error) {
    console.error(error);

    toast({
      title: "Submission failed",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-eco-green/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-eco-green" />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Thank You!
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Your message has been received. Our team will get back to you within 24-48 hours.
            </p>
            <Button variant="outline" onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', phone: '', message: '' });
            }}>
              Send Another Message
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to harness the power of solar energy? Contact us for a free consultation and quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                Why Choose VIMCO Solar?
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-solar-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-solar-gold" />
                  </span>
                  Premium quality solar panels with 25-year warranty
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-solar-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-solar-gold" />
                  </span>
                  Professional installation by certified technicians
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-solar-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-solar-gold" />
                  </span>
                  Comprehensive after-sales support and maintenance
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-solar-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-solar-gold" />
                  </span>
                  Competitive pricing with flexible payment options
                </li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card rounded-xl p-5 border border-border flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Call Us</p>
                  <p className="font-medium text-foreground">+91 98765 43210</p>
                </div>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Us</p>
                  <p className="font-medium text-foreground">info@vimco.solar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-card">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your solar project requirements..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'border-destructive' : ''}
                />
                {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;