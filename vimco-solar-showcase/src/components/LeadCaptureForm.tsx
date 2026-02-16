import { useState } from 'react';
import { Send, Phone, CheckCircle, Zap, User, Mail, MessageSquare, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { leadFormSchema, type LeadFormData } from '@/lib/validations';
import api from "@/./api"

interface LeadCaptureFormProps {
  variant?: 'hero' | 'section';
}

const LeadCaptureForm = ({ variant = 'section' }: LeadCaptureFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof LeadFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrors({});

  const result = leadFormSchema.safeParse(formData);

  if (!result.success) {
    const fieldErrors: Partial<Record<keyof LeadFormData, string>> = {};
    result.error.errors.forEach((err) => {
      if (err.path[0]) {
        fieldErrors[err.path[0] as keyof LeadFormData] = err.message;
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
      <div className={`text-center p-8 rounded-2xl ${variant === 'hero' ? 'bg-white shadow-2xl' : 'bg-card border border-border'}`}>
        <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-india-green/10">
          <CheckCircle className="h-10 w-10 text-india-green" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-foreground">
          धन्यवाद! Thank You!
        </h3>
        <p className="text-muted-foreground mb-6">
          We'll call you within 24 hours with your free quote.
        </p>
        <a
          href="tel:+919041414599"
          className="inline-flex items-center gap-2 px-6 py-3 bg-india-saffron text-white rounded-lg font-semibold hover:bg-india-saffron/90 transition-colors"
        >
          <Phone className="h-5 w-5" />
          Call Now: +91 90414 14599
        </a>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
        {/* Indian flag stripe at top */}
        <div className="h-1 sm:h-1.5 flex">
          <div className="flex-1 bg-india-saffron" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-india-green" />
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 sm:p-8">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-india-saffron/10 rounded-full mb-3 sm:mb-4">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-india-saffron" />
              <span className="text-xs sm:text-sm font-semibold text-india-saffron">Free Solar Consultation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1.5 sm:mb-2">
              Get Your Free Quote
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Join 500+ Indian homes & businesses saving on electricity
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <div className="relative">
                <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <Input
                  name="name"
                  placeholder="Your Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className={`pl-10 sm:pl-12 h-12 sm:h-14 text-sm sm:text-base border-2 ${errors.name ? 'border-destructive' : 'border-muted'} focus:border-india-saffron rounded-xl`}
                />
              </div>
              {errors.name && <p className="text-xs sm:text-sm text-destructive mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <div className="relative">
                <Phone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Mobile Number * (e.g., 9876543210)"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`pl-10 sm:pl-12 h-12 sm:h-14 text-sm sm:text-base border-2 ${errors.phone ? 'border-destructive' : 'border-muted'} focus:border-india-saffron rounded-xl`}
                />
              </div>
              {errors.phone && <p className="text-xs sm:text-sm text-destructive mt-1">{errors.phone}</p>}
            </div>
            
            <div>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 sm:pl-12 h-12 sm:h-14 text-sm sm:text-base border-2 ${errors.email ? 'border-destructive' : 'border-muted'} focus:border-india-saffron rounded-xl`}
                />
              </div>
              {errors.email && <p className="text-xs sm:text-sm text-destructive mt-1">{errors.email}</p>}
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold bg-india-saffron hover:bg-india-saffron/90 text-white rounded-xl shadow-saffron transition-all duration-300 hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Get Free Quote
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
              )}
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-muted">
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-india-green" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-india-green" />
                <span>No Obligation</span>
              </div>
            </div>
            <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-2 sm:mt-3">
              🇮🇳 Proudly serving India since 2015
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              className={`pl-10 ${errors.name ? 'border-destructive' : ''}`}
            />
          </div>
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              name="phone"
              type="tel"
              placeholder="Phone Number * (e.g., 9876543210)"
              value={formData.phone}
              onChange={handleChange}
              className={`pl-10 ${errors.phone ? 'border-destructive' : ''}`}
            />
          </div>
          {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            name="email"
            type="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
          />
        </div>
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
      </div>
      <div>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Textarea
            name="message"
            placeholder="Tell us about your solar requirements..."
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`pl-10 ${errors.message ? 'border-destructive' : ''}`}
          />
        </div>
        {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-india-saffron hover:bg-india-saffron/90 text-white"
        size="lg"
      >
        {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};

export default LeadCaptureForm;