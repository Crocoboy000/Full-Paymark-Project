export interface NavItem {
  label: string;
  link: string;
  additional: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FinancialCardItem {
  title: string;
  desc: string;
  href: string;
  label: string;
  mainImage: string;
  accentImage: string;
}

export interface TestimonialItem {
  author: string;
  title: string;
  image: string;
  review: string;
}

export interface PricingPlanItem {
  title: string;
  price: number;
  desc: string;
  featured: boolean;
  features: string[];
}

export interface StreamlineCardItem {
  title: string;
  desc: string;
  img: string;
}

export interface FooterLinkSection {
  title: string;
  links: string[];
}



