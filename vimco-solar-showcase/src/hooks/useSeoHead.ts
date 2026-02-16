import { useEffect } from 'react';
import { useSiteSettings } from '@/hooks/useSiteContent';

interface SeoSettings {
  site_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_card?: string;
  twitter_site?: string;
  twitter_image?: string;
  canonical_url?: string;
  robots?: string;
  google_site_verification?: string;
  structured_data_name?: string;
  structured_data_type?: string;
  structured_data_url?: string;
  structured_data_logo?: string;
  structured_data_description?: string;
  structured_data_area_served?: string;
  structured_data_price_range?: string;
}

const setMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
  if (!content) return;
  let el = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.content = content;
};

const setLink = (rel: string, href: string) => {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
};

export const useSeoHead = () => {
  const { data: settings = [] } = useSiteSettings();

  useEffect(() => {
    const seoSetting = settings.find(s => s.key === 'seo');
    if (!seoSetting) return;

    const seo = seoSetting.value as unknown as SeoSettings;

    // Title
    if (seo.site_title) {
      document.title = seo.site_title;
    }

    // Basic meta
    if (seo.meta_description) setMeta('description', seo.meta_description);
    if (seo.meta_keywords) setMeta('keywords', seo.meta_keywords);
    if (seo.robots) setMeta('robots', seo.robots);
    if (seo.google_site_verification) setMeta('google-site-verification', seo.google_site_verification);

    // Open Graph
    if (seo.og_title) setMeta('og:title', seo.og_title, 'property');
    if (seo.og_description) setMeta('og:description', seo.og_description, 'property');
    if (seo.og_image) setMeta('og:image', seo.og_image, 'property');
    setMeta('og:type', 'website', 'property');

    // Twitter
    if (seo.twitter_card) setMeta('twitter:card', seo.twitter_card);
    if (seo.twitter_site) setMeta('twitter:site', seo.twitter_site);
    if (seo.twitter_image) setMeta('twitter:image', seo.twitter_image);

    // Canonical
    if (seo.canonical_url) setLink('canonical', seo.canonical_url);

    // Structured Data (JSON-LD)
    if (seo.structured_data_name) {
      let scriptEl = document.querySelector('script[data-seo-jsonld]') as HTMLScriptElement | null;
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.type = 'application/ld+json';
        scriptEl.setAttribute('data-seo-jsonld', 'true');
        document.head.appendChild(scriptEl);
      }

      const jsonLd: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': seo.structured_data_type || 'LocalBusiness',
        name: seo.structured_data_name,
      };

      if (seo.structured_data_url) jsonLd.url = seo.structured_data_url;
      if (seo.structured_data_logo) jsonLd.logo = seo.structured_data_logo;
      if (seo.structured_data_description) jsonLd.description = seo.structured_data_description;
      if (seo.structured_data_area_served) jsonLd.areaServed = seo.structured_data_area_served;
      if (seo.structured_data_price_range) jsonLd.priceRange = seo.structured_data_price_range;

      scriptEl.textContent = JSON.stringify(jsonLd);
    }
  }, [settings]);
};
