import { useState, useEffect } from 'react';
import { Save, RotateCcw, Search, Globe, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSiteSettings, useSiteSettingMutations } from '@/hooks/useSiteContent';

interface HeroSettings {
  badge_text: string;
  headline_part1: string;
  headline_part2: string;
  headline_part3: string;
  subtitle: string;
  phone_number: string;
  trust_badge_1: string;
  trust_badge_2: string;
  trust_badge_3: string;
}

interface CompanySettings {
  company_name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
}

interface SeoSettings {
  site_title: string;
  meta_description: string;
  meta_keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_card: string;
  twitter_site: string;
  twitter_image: string;
  canonical_url: string;
  robots: string;
  google_site_verification: string;
  structured_data_name: string;
  structured_data_type: string;
  structured_data_url: string;
  structured_data_logo: string;
  structured_data_description: string;
  structured_data_area_served: string;
  structured_data_price_range: string;
}

const defaultHeroSettings: HeroSettings = {
  badge_text: 'Bharat Ka Trusted Solar Partner',
  headline_part1: 'Bijli Bill Mein',
  headline_part2: '90% Tak Bachat!',
  headline_part3: 'Ab Solar Lagao, Paisa Bachao',
  subtitle: 'Ghar ho ya business, humne 10+ saalon mein India bhar mein hazaron solar systems lagaye hain. Government subsidy mein bhi help karte hain!',
  phone_number: '+91 90414 14599',
  trust_badge_1: '10+ Saal Experience',
  trust_badge_2: '25 Saal Warranty',
  trust_badge_3: 'Subsidy Assistance',
};

const defaultCompanySettings: CompanySettings = {
  company_name: 'VIMCO Solar',
  tagline: 'Go Green, Go For Solar',
  email: 'info@vimcosolar.com',
  phone: '+91 90414 14599',
  address: 'Punjab, India',
  whatsapp: '+919041414599',
};

const defaultSeoSettings: SeoSettings = {
  site_title: 'VIMCO Solar - Premium Solar Energy Solutions in India',
  meta_description: 'VIMCO Solar offers premium solar panel installation services across India. Save up to 90% on electricity bills with our residential, commercial & industrial solar solutions. 10+ years experience, 25-year warranty.',
  meta_keywords: 'solar panels India, solar installation Punjab, solar energy, VIMCO Solar, solar EPC company, residential solar, commercial solar, industrial solar, solar subsidy India',
  og_title: 'VIMCO Solar - Go Green, Go For Solar',
  og_description: 'Premium solar energy solutions across India. Residential, commercial & industrial solar installations with 25-year warranty and government subsidy assistance.',
  og_image: '',
  twitter_card: 'summary_large_image',
  twitter_site: '@vimcosolar',
  twitter_image: '',
  canonical_url: '',
  robots: 'index, follow',
  google_site_verification: '',
  structured_data_name: 'VIMCO Solar',
  structured_data_type: 'SolarEnergyCompany',
  structured_data_url: '',
  structured_data_logo: '',
  structured_data_description: 'Premium solar panel installation and EPC services across India with 10+ years of experience.',
  structured_data_area_served: 'India',
  structured_data_price_range: '₹₹',
};

const AdminSiteSettings = () => {
  const { data: settings = [], isLoading } = useSiteSettings();
  const { upsertSetting } = useSiteSettingMutations();
  
  const [heroSettings, setHeroSettings] = useState<HeroSettings>(defaultHeroSettings);
  const [companySettings, setCompanySettings] = useState<CompanySettings>(defaultCompanySettings);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>(defaultSeoSettings);

  useEffect(() => {
    if (settings.length > 0) {
      const heroSetting = settings.find(s => s.key === 'hero');
      const companySetting = settings.find(s => s.key === 'company');
      const seoSetting = settings.find(s => s.key === 'seo');
      
      if (heroSetting) {
        setHeroSettings({ ...defaultHeroSettings, ...(heroSetting.value as Partial<HeroSettings>) });
      }
      if (companySetting) {
        setCompanySettings({ ...defaultCompanySettings, ...(companySetting.value as Partial<CompanySettings>) });
      }
      if (seoSetting) {
        setSeoSettings({ ...defaultSeoSettings, ...(seoSetting.value as Partial<SeoSettings>) });
      }
    }
  }, [settings]);

  const handleHeroChange = (key: keyof HeroSettings, value: string) => {
    setHeroSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleCompanyChange = (key: keyof CompanySettings, value: string) => {
    setCompanySettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSeoChange = (key: keyof SeoSettings, value: string) => {
    setSeoSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveHero = async () => {
    await upsertSetting.mutateAsync({ key: 'hero', value: heroSettings as unknown as Record<string, unknown> });
  };

  const handleSaveCompany = async () => {
    await upsertSetting.mutateAsync({ key: 'company', value: companySettings as unknown as Record<string, unknown> });
  };

  const handleSaveSeo = async () => {
    await upsertSetting.mutateAsync({ key: 'seo', value: seoSettings as unknown as Record<string, unknown> });
  };

  const resetHero = () => setHeroSettings(defaultHeroSettings);
  const resetCompany = () => setCompanySettings(defaultCompanySettings);
  const resetSeo = () => setSeoSettings(defaultSeoSettings);

  if (isLoading) {
    return <div className="flex items-center justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Site Settings</h2>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>SEO — Meta Tags</CardTitle>
              <CardDescription>Configure how your site appears in Google search results</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="site_title">Page Title</Label>
            <Input id="site_title" value={seoSettings.site_title} onChange={(e) => handleSeoChange('site_title', e.target.value)} placeholder="VIMCO Solar - Premium Solar Energy Solutions" />
            <p className="text-xs text-muted-foreground mt-1">{seoSettings.site_title.length}/60 characters (recommended max 60)</p>
          </div>
          <div>
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea id="meta_description" value={seoSettings.meta_description} onChange={(e) => handleSeoChange('meta_description', e.target.value)} rows={3} placeholder="Describe your business in 155 characters..." />
            <p className="text-xs text-muted-foreground mt-1">{seoSettings.meta_description.length}/160 characters (recommended max 160)</p>
          </div>
          <div>
            <Label htmlFor="meta_keywords">Meta Keywords</Label>
            <Input id="meta_keywords" value={seoSettings.meta_keywords} onChange={(e) => handleSeoChange('meta_keywords', e.target.value)} placeholder="solar panels, solar installation, India..." />
            <p className="text-xs text-muted-foreground mt-1">Comma-separated keywords relevant to your business</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="canonical_url">Canonical URL</Label>
              <Input id="canonical_url" value={seoSettings.canonical_url} onChange={(e) => handleSeoChange('canonical_url', e.target.value)} placeholder="https://vimcosolar.com" />
            </div>
            <div>
              <Label htmlFor="robots">Robots Directive</Label>
              <Input id="robots" value={seoSettings.robots} onChange={(e) => handleSeoChange('robots', e.target.value)} placeholder="index, follow" />
            </div>
          </div>
          <div>
            <Label htmlFor="google_site_verification">Google Site Verification</Label>
            <Input id="google_site_verification" value={seoSettings.google_site_verification} onChange={(e) => handleSeoChange('google_site_verification', e.target.value)} placeholder="Paste your verification code here" />
            <p className="text-xs text-muted-foreground mt-1">From Google Search Console</p>
          </div>

          {/* Google Preview */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <p className="text-xs text-muted-foreground mb-2 font-medium">Google Search Preview</p>
            <div className="space-y-1">
              <p className="text-blue-600 text-lg font-medium truncate">{seoSettings.site_title || 'Page Title'}</p>
              <p className="text-green-700 text-sm truncate">{seoSettings.canonical_url || 'https://yoursite.com'}</p>
              <p className="text-sm text-muted-foreground line-clamp-2">{seoSettings.meta_description || 'Meta description will appear here...'}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleSaveSeo} disabled={upsertSetting.isPending}>
              <Save className="h-4 w-4 mr-2" />Save SEO Settings
            </Button>
            <Button variant="outline" onClick={resetSeo}>
              <RotateCcw className="h-4 w-4 mr-2" />Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Open Graph / Social Sharing */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Social Sharing (Open Graph & Twitter)</CardTitle>
              <CardDescription>Control how your site appears when shared on Facebook, LinkedIn, Twitter, WhatsApp, etc.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="og_title">OG Title</Label>
              <Input id="og_title" value={seoSettings.og_title} onChange={(e) => handleSeoChange('og_title', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="og_image">OG Image URL</Label>
              <Input id="og_image" value={seoSettings.og_image} onChange={(e) => handleSeoChange('og_image', e.target.value)} placeholder="https://yoursite.com/og-image.jpg" />
              <p className="text-xs text-muted-foreground mt-1">Recommended: 1200×630px</p>
            </div>
          </div>
          <div>
            <Label htmlFor="og_description">OG Description</Label>
            <Textarea id="og_description" value={seoSettings.og_description} onChange={(e) => handleSeoChange('og_description', e.target.value)} rows={2} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="twitter_card">Twitter Card Type</Label>
              <Input id="twitter_card" value={seoSettings.twitter_card} onChange={(e) => handleSeoChange('twitter_card', e.target.value)} placeholder="summary_large_image" />
            </div>
            <div>
              <Label htmlFor="twitter_site">Twitter Handle</Label>
              <Input id="twitter_site" value={seoSettings.twitter_site} onChange={(e) => handleSeoChange('twitter_site', e.target.value)} placeholder="@vimcosolar" />
            </div>
            <div>
              <Label htmlFor="twitter_image">Twitter Image URL</Label>
              <Input id="twitter_image" value={seoSettings.twitter_image} onChange={(e) => handleSeoChange('twitter_image', e.target.value)} placeholder="https://..." />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSaveSeo} disabled={upsertSetting.isPending}>
              <Save className="h-4 w-4 mr-2" />Save Social Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Structured Data / Schema.org */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Structured Data (Schema.org)</CardTitle>
              <CardDescription>Help Google understand your business for rich search results and knowledge panels</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sd_name">Business Name</Label>
              <Input id="sd_name" value={seoSettings.structured_data_name} onChange={(e) => handleSeoChange('structured_data_name', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="sd_type">Business Type</Label>
              <Input id="sd_type" value={seoSettings.structured_data_type} onChange={(e) => handleSeoChange('structured_data_type', e.target.value)} placeholder="SolarEnergyCompany" />
              <p className="text-xs text-muted-foreground mt-1">e.g. LocalBusiness, Electrician, SolarEnergyCompany</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sd_url">Website URL</Label>
              <Input id="sd_url" value={seoSettings.structured_data_url} onChange={(e) => handleSeoChange('structured_data_url', e.target.value)} placeholder="https://vimcosolar.com" />
            </div>
            <div>
              <Label htmlFor="sd_logo">Logo URL</Label>
              <Input id="sd_logo" value={seoSettings.structured_data_logo} onChange={(e) => handleSeoChange('structured_data_logo', e.target.value)} placeholder="https://vimcosolar.com/logo.png" />
            </div>
          </div>
          <div>
            <Label htmlFor="sd_description">Business Description</Label>
            <Textarea id="sd_description" value={seoSettings.structured_data_description} onChange={(e) => handleSeoChange('structured_data_description', e.target.value)} rows={2} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sd_area">Area Served</Label>
              <Input id="sd_area" value={seoSettings.structured_data_area_served} onChange={(e) => handleSeoChange('structured_data_area_served', e.target.value)} placeholder="India" />
            </div>
            <div>
              <Label htmlFor="sd_price">Price Range</Label>
              <Input id="sd_price" value={seoSettings.structured_data_price_range} onChange={(e) => handleSeoChange('structured_data_price_range', e.target.value)} placeholder="₹₹" />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSaveSeo} disabled={upsertSetting.isPending}>
              <Save className="h-4 w-4 mr-2" />Save Structured Data
            </Button>
            <Button variant="outline" onClick={resetSeo}>
              <RotateCcw className="h-4 w-4 mr-2" />Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Hero Section Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Customize the main hero section on the homepage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="badge_text">Badge Text</Label>
              <Input id="badge_text" value={heroSettings.badge_text} onChange={(e) => handleHeroChange('badge_text', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input id="phone_number" value={heroSettings.phone_number} onChange={(e) => handleHeroChange('phone_number', e.target.value)} />
            </div>
          </div>
          <div>
            <Label htmlFor="headline_part1">Headline Part 1</Label>
            <Input id="headline_part1" value={heroSettings.headline_part1} onChange={(e) => handleHeroChange('headline_part1', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="headline_part2">Headline Part 2 (Highlighted)</Label>
            <Input id="headline_part2" value={heroSettings.headline_part2} onChange={(e) => handleHeroChange('headline_part2', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="headline_part3">Headline Part 3</Label>
            <Input id="headline_part3" value={heroSettings.headline_part3} onChange={(e) => handleHeroChange('headline_part3', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Textarea id="subtitle" value={heroSettings.subtitle} onChange={(e) => handleHeroChange('subtitle', e.target.value)} rows={3} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="trust_badge_1">Trust Badge 1</Label>
              <Input id="trust_badge_1" value={heroSettings.trust_badge_1} onChange={(e) => handleHeroChange('trust_badge_1', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="trust_badge_2">Trust Badge 2</Label>
              <Input id="trust_badge_2" value={heroSettings.trust_badge_2} onChange={(e) => handleHeroChange('trust_badge_2', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="trust_badge_3">Trust Badge 3</Label>
              <Input id="trust_badge_3" value={heroSettings.trust_badge_3} onChange={(e) => handleHeroChange('trust_badge_3', e.target.value)} />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSaveHero} disabled={upsertSetting.isPending}>
              <Save className="h-4 w-4 mr-2" />Save Hero Settings
            </Button>
            <Button variant="outline" onClick={resetHero}>
              <RotateCcw className="h-4 w-4 mr-2" />Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Company Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>General company contact details used across the site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company_name">Company Name</Label>
              <Input id="company_name" value={companySettings.company_name} onChange={(e) => handleCompanyChange('company_name', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" value={companySettings.tagline} onChange={(e) => handleCompanyChange('tagline', e.target.value)} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={companySettings.email} onChange={(e) => handleCompanyChange('email', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={companySettings.phone} onChange={(e) => handleCompanyChange('phone', e.target.value)} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input id="whatsapp" value={companySettings.whatsapp} onChange={(e) => handleCompanyChange('whatsapp', e.target.value)} placeholder="+919041414599" />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={companySettings.address} onChange={(e) => handleCompanyChange('address', e.target.value)} />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSaveCompany} disabled={upsertSetting.isPending}>
              <Save className="h-4 w-4 mr-2" />Save Company Info
            </Button>
            <Button variant="outline" onClick={resetCompany}>
              <RotateCcw className="h-4 w-4 mr-2" />Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSiteSettings;
