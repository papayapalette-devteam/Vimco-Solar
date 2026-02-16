import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import vimcoLogo from '@/assets/vimco-logo.png';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Solar Products', to: '/solar-products' },
    { label: 'EPC Company', to: '/epc-company' },
    { label: 'Our Projects', to: '/projects' },
    { label: 'Certificates', to: '/certificates' },
    { label: 'Events', to: '/events' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img 
              src={vimcoLogo} 
              alt="VIMCO Solar" 
              className="h-12 sm:h-16 w-auto mb-4 sm:mb-6 brightness-0 invert"
            />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              VIMCO Solar - A brand that has always believed in providing innovative solutions in solar technology. Go Green, Go For Solar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base sm:text-lg font-bold mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.to} 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-base sm:text-lg font-bold mb-4 sm:mb-6">Contact Info</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-solar-gold shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-xs sm:text-sm">
                  8-A, BHAGAT SINGH NAGAR, MODEL HOUSE, Jalandhar, Punjab, 144001
                </span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-solar-gold shrink-0" />
                <a href="tel:9041414599" className="text-primary-foreground/70 text-xs sm:text-sm hover:text-primary-foreground transition-colors">9041414599</a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-solar-gold shrink-0" />
                <a href="mailto:info@vimcosolar.com" className="text-primary-foreground/70 text-xs sm:text-sm hover:text-primary-foreground transition-colors break-all">info@vimcosolar.com</a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-display text-base sm:text-lg font-bold mb-4 sm:mb-6">Business Hours</h4>
            <ul className="space-y-2 sm:space-y-3 text-primary-foreground/70 text-xs sm:text-sm">
              <li className="flex justify-between gap-2">
                <span>Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between gap-2">
                <span>Saturday</span>
                <span>9:00 AM - 2:00 PM</span>
              </li>
              <li className="flex justify-between gap-2">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-primary-foreground/50 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} VIMCO Solar. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 pr-40">
              <Link to="/auth" className="text-xs sm:text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
