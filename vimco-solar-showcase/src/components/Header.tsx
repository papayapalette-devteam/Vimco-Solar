import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import vimcoLogo from '@/assets/vimco-logo.png';

interface HeaderProps {
  showAdminLink?: boolean;
}

const Header = ({ showAdminLink }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Solar Products', to: '/solar-products' },
    { label: 'EPC Company', to: '/epc-company' },
    { label: 'Our Projects', to: '/projects' },
    { label: 'Certificates', to: '/certificates' },
    { label: 'Events', to: '/events' },
    { label: 'Contact', to: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={vimcoLogo} alt="VIMCO Solar" className="h-12 w-auto" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive(link.to)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button className="hidden md:inline-flex bg-solar-gold hover:bg-solar-gold-light text-primary" asChild>
            <a href="tel:9041414599">Call: 9041414599</a>
          </Button>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.to)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button className="mt-4 bg-solar-gold hover:bg-solar-gold-light text-primary" asChild>
              <a href="tel:9041414599">Call: 9041414599</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
