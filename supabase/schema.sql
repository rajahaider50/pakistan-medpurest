-- MedPurest / Pakistan Medical Clone Database Schema (Text ID version for maximum flexibility)

DROP TABLE IF EXISTS med_activity_logs CASCADE;
DROP TABLE IF EXISTS med_inquiries CASCADE;
DROP TABLE IF EXISTS med_company_culture CASCADE;
DROP TABLE IF EXISTS med_company_history CASCADE;
DROP TABLE IF EXISTS med_honors CASCADE;
DROP TABLE IF EXISTS med_certificates CASCADE;
DROP TABLE IF EXISTS med_videos CASCADE;
DROP TABLE IF EXISTS med_blogs CASCADE;
DROP TABLE IF EXISTS med_news CASCADE;
DROP TABLE IF EXISTS med_product_translations CASCADE;
DROP TABLE IF EXISTS med_category_translations CASCADE;
DROP TABLE IF EXISTS med_products CASCADE;
DROP TABLE IF EXISTS med_categories CASCADE;
DROP TABLE IF EXISTS med_admin_users CASCADE;
DROP TABLE IF EXISTS med_site_settings CASCADE;
DROP TABLE IF EXISTS med_languages CASCADE;

CREATE TABLE med_languages (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    native_name VARCHAR(50) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_rtl BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE med_site_settings (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE med_categories (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    parent_id TEXT REFERENCES med_categories(id) ON DELETE SET NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE med_products (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    category_id TEXT REFERENCES med_categories(id) ON DELETE SET NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    sku VARCHAR(100),
    name VARCHAR(250) NOT NULL,
    short_description TEXT,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    specifications JSONB DEFAULT '{}'::jsonb,
    applications JSONB DEFAULT '[]'::jsonb,
    packaging VARCHAR(200),
    sterilization VARCHAR(100),
    primary_image TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    documents JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(20) DEFAULT 'published',
    featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    views INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE med_category_translations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    category_id TEXT REFERENCES med_categories(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    seo_title VARCHAR(250),
    seo_description TEXT,
    UNIQUE(category_id, language_code)
);

CREATE TABLE med_product_translations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    product_id TEXT REFERENCES med_products(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL,
    name VARCHAR(250) NOT NULL,
    short_description TEXT,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    applications JSONB DEFAULT '[]'::jsonb,
    seo_title VARCHAR(250),
    seo_description TEXT,
    UNIQUE(product_id, language_code)
);

CREATE TABLE med_news (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug VARCHAR(250) UNIQUE NOT NULL,
    category VARCHAR(100) DEFAULT 'company-news', -- 'company-news' or 'industry-dynamics'
    title VARCHAR(300) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    author VARCHAR(100) DEFAULT 'Pakistan Medical',
    views INT DEFAULT 0,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE med_blogs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug VARCHAR(250) UNIQUE NOT NULL,
    category VARCHAR(100) DEFAULT 'problem-guide', -- 'problem-guide' or 'product-introduction'
    title VARCHAR(300) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    author VARCHAR(100) DEFAULT 'Clinical Editorial Team',
    reading_time VARCHAR(50) DEFAULT '4 min read',
    views INT DEFAULT 0,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE med_videos (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug VARCHAR(200) UNIQUE NOT NULL,
    title VARCHAR(250) NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    duration VARCHAR(50),
    sort_order INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE med_certificates (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title VARCHAR(200) NOT NULL,
    cert_number VARCHAR(100),
    issuing_authority VARCHAR(200),
    issue_date VARCHAR(50),
    expiry_date VARCHAR(50),
    image_url TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE med_honors (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title VARCHAR(200) NOT NULL,
    year VARCHAR(20),
    issuer VARCHAR(200),
    description TEXT,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE med_company_history (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    year VARCHAR(20) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE med_company_culture (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(200),
    description TEXT NOT NULL,
    icon VARCHAR(50),
    image_url TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE med_inquiries (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    product_id TEXT REFERENCES med_products(id) ON DELETE SET NULL,
    product_name VARCHAR(250),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(200),
    country VARCHAR(100),
    quantity VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'new', -- new, contacted, in_progress, closed
    notes TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE med_admin_users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin', -- super_admin, admin, editor
    status VARCHAR(20) DEFAULT 'active',
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE med_activity_logs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_email VARCHAR(150),
    action VARCHAR(100) NOT NULL,
    entity VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    details TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
