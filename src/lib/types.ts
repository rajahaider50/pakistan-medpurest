export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  description?: string;
}

export interface Language {
  id: string;
  code: string;
  name: string;
  native_name: string;
  is_default: boolean;
  is_active: boolean;
  is_rtl: boolean;
}

export interface Category {
  id: string;
  parent_id?: string | null;
  slug: string;
  name: string;
  description?: string;
  image_url?: string;
  sort_order: number;
  featured: boolean;
  status: string;
  children?: Category[];
}

export interface Product {
  id: string;
  category_id?: string | null;
  slug: string;
  sku?: string;
  name: string;
  short_description?: string;
  description?: string;
  features: string[];
  specifications: Record<string, string>;
  applications: string[];
  packaging?: string;
  sterilization?: string;
  primary_image: string;
  images: string[];
  documents?: { title: string; url: string }[];
  status: string;
  featured: boolean;
  sort_order: number;
  views: number;
  created_at?: string;
  category?: Category;
}

export interface NewsItem {
  id: string;
  slug: string;
  category: 'company-news' | 'industry-dynamics' | string;
  title: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  author: string;
  views: number;
  published_at: string;
  status: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  category: 'problem-guide' | 'product-introduction' | string;
  title: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  author: string;
  reading_time: string;
  views: number;
  published_at: string;
  status: string;
}

export interface VideoItem {
  id: string;
  slug: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  duration?: string;
  sort_order: number;
  status: string;
}

export interface Certificate {
  id: string;
  title: string;
  cert_number?: string;
  issuing_authority?: string;
  issue_date?: string;
  expiry_date?: string;
  image_url: string;
  sort_order: number;
  status: string;
}

export interface Honor {
  id: string;
  title: string;
  year?: string;
  issuer?: string;
  description?: string;
  image_url?: string;
  sort_order: number;
  status: string;
}

export interface CompanyHistory {
  id: string;
  year: string;
  title: string;
  description: string;
  image_url?: string;
  sort_order: number;
}

export interface CompanyCulture {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: string;
  image_url?: string;
  sort_order: number;
}

export interface Inquiry {
  id: string;
  product_id?: string | null;
  product_name?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  quantity?: string;
  message: string;
  status: 'new' | 'contacted' | 'in_progress' | 'closed';
  notes?: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  status: string;
}
