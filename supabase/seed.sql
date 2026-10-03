-- Seed Data for Pakistan Medical / MedPurest Clone

-- Languages
INSERT INTO med_languages (code, name, native_name, is_default, is_active, is_rtl) VALUES
('en', 'English', 'English', TRUE, TRUE, FALSE),
('es', 'Spanish', 'Español', FALSE, TRUE, FALSE),
('ar', 'Arabic', 'العربية', FALSE, TRUE, TRUE),
('pt', 'Portuguese', 'Português', FALSE, TRUE, FALSE),
('zh', 'Chinese', '中文', FALSE, TRUE, FALSE)
ON CONFLICT (code) DO NOTHING;

-- Site Settings
INSERT INTO med_site_settings (key, value, description) VALUES
('site_name', 'Pakistan Medical Supplies', 'Brand & Website Name'),
('site_tagline', 'Professional Infection Prevention & Surgical Solutions Manufacturer', 'Company Tagline'),
('company_legal_name', 'Pakistan MedPurest Healthcare Technologies Ltd.', 'Official Legal Name'),
('contact_email', 'info@pakistanmedical.com', 'Primary Inquiries Email'),
('contact_phone', '+92 51 289 1917', 'Primary Phone Number'),
('contact_whatsapp', '+92 300 556 1917', 'WhatsApp Business Contact'),
('contact_address', 'Medical & Surgical Technology Industrial Zone, Sialkot / Islamabad, Pakistan', 'Factory & HQ Address'),
('operating_hours', 'Monday - Saturday: 8:30 AM - 6:00 PM (PKT / UTC+5)', 'Office Working Hours'),
('cleanroom_area', '60,000+ m²', 'Cleanroom facility area'),
('purification_grade', 'Class 100,000 Standard', 'Purification grade'),
('countries_exported', '85+ Countries', 'Global market presence'),
('years_experience', '25+ Years', 'Manufacturing heritage'),
('facebook_url', 'https://facebook.com/pakistanmedical', 'Facebook Page'),
('linkedin_url', 'https://linkedin.com/company/pakistanmedical', 'LinkedIn Profile'),
('youtube_url', 'https://youtube.com/@pakistanmedical', 'YouTube Channel'),
('twitter_url', 'https://twitter.com/pakistanmedical', 'Twitter / X Profile')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Admin User (password: admin123, sha256 hash: 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9)
INSERT INTO med_admin_users (email, password_hash, full_name, role, status) VALUES
('admin@pakistanmedical.com', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'Master Administrator', 'super_admin', 'active')
ON CONFLICT (email) DO NOTHING;

-- Top-Level Categories
INSERT INTO med_categories (id, parent_id, slug, name, description, image_url, sort_order, featured, status) VALUES
('c1000000-0000-0000-0000-000000000001', NULL, 'protective-equipment', 'Protective Equipment', 'Medical grade disposable protective gowns, scrub suits, isolation suits and specialized protective wear.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', 1, TRUE, 'published'),
('c1000000-0000-0000-0000-000000000002', NULL, 'surgical-pack', 'Surgical Pack', 'Comprehensive procedure-specific sterile surgical drape and instrument packs for modern operating theaters.', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80', 2, TRUE, 'published'),
('c1000000-0000-0000-0000-000000000003', NULL, 'cleaning-and-disinfection-series', 'Cleaning and Disinfection Series', 'High-level multi-enzyme instrument cleaners, biofilm removers, and hospital-grade sterilizing solutions.', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80', 3, TRUE, 'published'),
('c1000000-0000-0000-0000-000000000004', NULL, 'surgical-drapes', 'Surgical Drapes', 'Sterile, liquid-impervious surgical drapes engineered for maximum barrier protection and fluid control.', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', 4, TRUE, 'published')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, image_url = EXCLUDED.image_url;

-- Subcategories under Protective Equipment
INSERT INTO med_categories (id, parent_id, slug, name, description, image_url, sort_order, featured, status) VALUES
('c1100000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'surgical-gown', 'Surgical Gown', 'AAMI Level 3 and Level 4 SMS and SMMS reinforced surgical gowns for highest barrier safety.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', 1, TRUE, 'published'),
('c1100000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'disposable-patient-gowns', 'Disposable Patient Gowns', 'Breathable, hygienic, and dignified single-use patient apparel for clinics and inpatient departments.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', 2, TRUE, 'published'),
('c1100000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'disposable-scrub-suits', 'Disposable Scrub Suits', 'Anti-static, lint-free medical scrub shirts and pants for OR staff and cleanroom technicians.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', 3, TRUE, 'published'),
('c1100000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001', 'isolation-gown', 'Isolation Gown', 'Fluid-resistant PP+PE and CPE isolation gowns for healthcare workers and infection wards.', 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80', 4, TRUE, 'published'),
('c1100000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000001', 'medical-material', 'Medical Material', 'Spunbond, Meltblown, SMS, and breathable membrane raw materials for medical device manufacturing.', 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80', 5, FALSE, 'published')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

-- Subcategories under Surgical Pack
INSERT INTO med_categories (id, parent_id, slug, name, description, image_url, sort_order, featured, status) VALUES
('c1200000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002', 'gynecology-obstetrics-surgery-pack', 'Gynecology & Obstetrics Surgery Pack', 'Sterile C-Section, delivery, and gynecological examination surgical draping sets.', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80', 1, TRUE, 'published'),
('c1200000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000002', 'general-surgery-pack', 'General Surgery Pack', 'Universal surgical pack with laparotomy drapes, mayo stand covers, and adhesive utility drapes.', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', 2, TRUE, 'published'),
('c1200000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000002', 'ophthalmology-and-ent-surgery-pack', 'Ophthalmology & ENT Surgery Pack', 'Fine surgical drape packs equipped with fluid collection pouches and incise film for eye and ENT ops.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', 3, FALSE, 'published'),
('c1200000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000002', 'orthopedic-surgery-pack', 'Orthopedic Surgery Pack', 'Heavy-duty puncture-resistant extremity, knee, hip, and arthroscopy surgical drape systems.', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80', 4, TRUE, 'published'),
('c1200000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000002', 'cardiovascular-surgery-pack', 'Cardiovascular Surgery Pack', 'High-absorbency, anti-microbial incise surgical drapes engineered for open-heart and vascular procedures.', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', 5, TRUE, 'published')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

-- Products
INSERT INTO med_products (
    id, category_id, slug, sku, name, short_description, description,
    features, specifications, applications, packaging, sterilization,
    primary_image, images, status, featured, sort_order, views
) VALUES
(
    'p1000000-0000-0000-0000-000000000001',
    'c1100000-0000-0000-0000-000000000001',
    'sms-sterile-surgical-gown-reinforced',
    'PKG-SG-001',
    'SMS Reinforced Sterile Surgical Gown Level 3 / Level 4',
    'High barrier SMS/SMMS fabric surgical gown with chest and sleeve reinforcement for high-fluid surgical operations.',
    'Pakistan Medical SMS Reinforced Surgical Gown provides reliable protection against bloodborne pathogens, body fluids, and liquid strike-through during prolonged operating room procedures. Engineered using premium multi-layer SMS non-woven material, it offers superior tensile strength, breathability, and ergonomic comfort for the surgical team.',
    '["Meets AAMI PB70 Level 3 & Level 4 liquid barrier standards", "Reinforced chest and forearm critical zones for ultimate fluid resistance", "Soft ultrasonic welded seams prevent microbial penetration", "Generous raglan sleeve cut ensuring full range of movement", "Breathable back panel reduces thermal stress during long surgeries", "Supplied with two sterile hand towels in peelable medical pouch"]'::jsonb,
    '{"Material": "Multi-layer SMS / SMMS Non-Woven", "Grammage": "45-60 gsm", "Sterilization": "EO Gas Sterilized (SAL 10^-6)", "Standard": "EN 13795 / AAMI PB70 Level 3/4", "Color": "Medical Blue / Forest Green", "Closure": "Adjustable hook-and-loop neckline with 4-tie belt"}'::jsonb,
    '["Operating Theatres", "General Surgery & Laparoscopy", "Orthopedic Joint Replacement", "Cardiothoracic Surgery", "Trauma and Emergency Procedures"]'::jsonb,
    '1 pc/sterile pouch, 50 pouches/carton',
    'Ethylene Oxide (EO)',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'published', TRUE, 1, 1420
),
(
    'p1000000-0000-0000-0000-000000000002',
    'c1100000-0000-0000-0000-000000000004',
    'disposable-isolation-suit-coverall',
    'PKG-ISO-002',
    'Disposable Protective Isolation Coverall with Taped Seams',
    'Type 4/5/6 certified microporous laminated protective coverall designed for biological agent barrier protection.',
    'Our Disposable Protective Isolation Coverall is manufactured using high-grade microporous film laminated to spunbond polypropylene. Blue taped heat-sealed seams ensure complete impermeability to particulate matter, aerosols, infectious liquids, and viral agents.',
    '["Type 4B / 5B / 6B certified for chemical and infectious agent protection", "Heat-sealed impervious tape over all seams", "Elasticated hood, cuffs, ankles, and waist for snug contoured fit", "Two-way zipper with storm flap and adhesive sealing strip", "Anti-static treatment meeting EN 1149 standard", "Lint-free, tear-resistant composite fabric"]'::jsonb,
    '{"Material": "Microporous Film laminated PP", "Grammage": "65 gsm", "Seam Type": "Heat-sealed blue taped seams", "Certification": "CE Category III, EN 14126, Type 4/5/6", "Sizes": "M, L, XL, XXL, 3XL", "Color": "White with Blue Seam Tape"}'::jsonb,
    '["Infectious Disease Wards", "Quarantine and Epidemic Control", "Clinical Laboratories", "Pharmaceutical Cleanrooms", "Emergency Rescue Units"]'::jsonb,
    '1 pc/vacuum bag, 40 bags/carton',
    'Non-sterile / Sterile EO available',
    'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'published', TRUE, 2, 980
),
(
    'p1000000-0000-0000-0000-000000000003',
    'c1200000-0000-0000-0000-000000000001',
    'cesarean-section-c-section-surgical-pack',
    'PKG-SP-CS01',
    'Sterile Cesarean Section (C-Section) Surgical Pack',
    'Specialized drape pack including aperture fenestration, fluid collection pouch with suction port, and baby blanket.',
    'Pakistan Medical C-Section Surgical Pack is configured to optimize surgical workflow, minimize drape adjustment time, and maintain strict asepsis during emergency and planned cesarean deliveries. The integrated fluid collection bag prevents operating theater pooling and safeguards surgical teams.',
    '["C-section drape with 360-degree fluid collection pouch and double drainage ports", "Integrated incise film with antimicrobial iodine impregnation", "Includes sterile baby wrap blanket, umbilical cord clamps, and neonatal suction tube", "High absorption zone around incision prevents spillover", "EO sterilized with class 5 chemical indicator strip"]'::jsonb,
    '{"Drape Dimensions": "260cm x 300cm", "Fenestration": "30cm x 34cm with incise film", "Collection Pouch": "Heavy duty polyethylene with malleable wire rim", "Sterilization": "Ethylene Oxide (SAL 10^-6)", "Shelf Life": "3 Years"}'::jsonb,
    '["Obstetrics Operating Rooms", "Maternity Hospitals", "Emergency Labor & Delivery Units"]'::jsonb,
    '1 set/sterile peel pack, 10 sets/carton',
    'Ethylene Oxide (EO)',
    'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'published', TRUE, 3, 1150
),
(
    'p1000000-0000-0000-0000-000000000004',
    'c1000000-0000-0000-0000-000000000003',
    'biofilm-removal-multi-enzyme-cleaner-858',
    'PKG-CLN-858',
    'Multi-Enzyme Medical Instrument Cleaner & Biofilm Remover 858',
    'Quad-enzyme concentrated detergent formulated to break down proteins, lipids, carbohydrates, and mucopolysaccharide biofilms.',
    'Pakistan Medical Multi-Enzyme Cleaner 858 is an advanced hospital-grade enzymatic solution designed for ultrasonic baths, washer-disinfectors, and manual cleaning of flexible endoscopes and surgical instruments. It rapidly digests organic soil and destroys biofilm matrices within 2 to 5 minutes.',
    '["Quad-enzyme matrix: Protease, Lipase, Amylase, and Cellulase", "Neutral pH non-corrosive formula safe for sensitive optical and laparoscopic scopes", "Ultra-low foaming at operating temperatures (up to 60°C)", "Biodegradable, dye-free, and phosphate-free formulation", "Significantly reduces bioburden before high-level disinfection"]'::jsonb,
    '{"pH Value": "7.0 - 8.2 (Neutral)", "Dilution Ratio": "1:200 to 1:400 (2.5ml - 5ml per liter)", "Enzymes Active": "4 Enzymes", "Temperature Range": "20°C - 60°C", "Packaging Size": "1 Gallon (3.8L) / 5L Jerrycan"}'::jsonb,
    '["CSSD (Central Sterile Supply Department)", "Endoscopy Units", "Surgical Instrument Pre-soaking", "Ultrasonic Cleaning Systems"]'::jsonb,
    '4 x 1 Gallon jugs/carton or 2 x 5L/carton',
    'Non-applicable (Liquid chemical formulation)',
    'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'published', TRUE, 4, 1820
),
(
    'p1000000-0000-0000-0000-000000000005',
    'c1000000-0000-0000-0000-000000000003',
    'phthalaldehyde-opa-high-level-disinfectant',
    'PKG-CLN-OPA',
    'Ortho-Phthalaldehyde (OPA) 0.55% High-Level Disinfectant Solution',
    'Ready-to-use high-level disinfectant solution for heat-sensitive semi-critical medical devices and endoscopes.',
    'A glutaraldehyde-free, fast-acting disinfectant requiring zero activation. Achieves high-level disinfection in 5 minutes at 20°C in automated reprocessors or 12 minutes in manual soaking basins. Proven effective against mycobacteria, bacterial spores, fungi, and lipid viruses.',
    '["Ready-to-use formulation without activation required", "Fast 5-minute immersion time at 20°C for automated washers", "Near-odorless and non-irritating compared to traditional aldehydes", "Compatible with stainless steel, titanium, plastics, and optical fiber", "Supports reuse life up to 14 days monitored by test strips"]'::jsonb,
    '{"Active Ingredient": "Ortho-Phthalaldehyde 0.55% - 0.60%", "Contact Time": "5 min (automated) / 12 min (manual)", "Re-use Period": "Up to 14 days", "Shelf Life": "24 months unopened", "Packaging": "3.8 Liter / 5 Liter bottles"}'::jsonb,
    '["Gastroenterology & Endoscope Reprocessing", "ENT Bronchoscopes and Laryngoscopes", "Anesthesia Equipment Disinfection"]'::jsonb,
    '4 bottles / carton',
    'Liquid chemical formulation',
    'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'published', TRUE, 5, 2100
),
(
    'p1000000-0000-0000-0000-000000000006',
    'c1200000-0000-0000-0000-000000000002',
    'universal-laparotomy-general-surgery-pack',
    'PKG-SP-GEN01',
    'Universal Laparotomy & General Surgery Pack',
    'All-in-one sterile pack designed for open abdominal and exploratory general surgical procedures.',
    'Features high-absorbency trilaminate surgical drape with abdominal aperture, reinforced side drapes, mayo stand cover, and suture bag. Reduces contamination risks through lint-free drape construction and high liquid absorption capacity around the operative field.',
    '["Tear-resistant trilaminate absorbent drape fabric", "Reinforced fluid control zone with adhesive edge sealant", "Includes 4 utility drapes, mayo stand cover, and instrument table drape", "Class 100,000 cleanroom manufactured and vacuum packed"]'::jsonb,
    '{"Main Laparotomy Drape": "200cm x 310cm with 25cm x 30cm aperture", "Instrument Table Cover": "150cm x 200cm reinforced", "Mayo Stand Cover": "80cm x 145cm telescopically folded", "Sterilization": "EO Gas"}'::jsonb,
    '["Abdominal Surgeries", "Appendectomies & Cholecystectomies", "Hernia Repair & Exploratory Laparotomy"]'::jsonb,
    '1 set/pouch, 8 sets/carton',
    'Ethylene Oxide (EO)',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'published', TRUE, 6, 850
)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- Certificates
INSERT INTO med_certificates (id, title, cert_number, issuing_authority, issue_date, expiry_date, image_url, sort_order, status) VALUES
('cert-001', 'ISO 13485:2016 Medical Devices Quality Management System', 'MDQ-981240-PK', 'TUV Rheinland / BSI International', '2022-01-15', '2028-01-14', 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=600&q=80', 1, 'published'),
('cert-002', 'CE Mark Certificate MDR (EU) 2017/745 Class I & IIa', 'CE-MDR-2023-889', 'Notified Body 0123 / CE Marking Authority', '2023-04-10', '2028-04-09', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80', 2, 'published'),
('cert-003', 'FDA Device Establishment Registration 510(k)', 'FDA-REG-3017849', 'U.S. Food and Drug Administration', '2021-11-20', '2027-12-31', 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80', 3, 'published'),
('cert-004', 'EN 13795 Surgical Drapes & Gowns Compliance', 'EN-13795-ST-441', 'SGS Medical Testing Institute', '2023-02-18', '2027-02-17', 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=600&q=80', 4, 'published'),
('cert-005', 'ISO 9001:2015 International Quality Management System', 'QMS-PK-77402', 'Lloyds Register Quality Assurance', '2020-08-12', '2026-08-11', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80', 5, 'published')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- Honors
INSERT INTO med_honors (id, title, year, issuer, description, image_url, sort_order, status) VALUES
('hon-001', 'National Healthcare Export Excellence Award', '2024', 'Ministry of Commerce & Health Authorities', 'Awarded for extraordinary quality compliance and outstanding medical equipment export growth across 85 countries.', 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80', 1, 'published'),
('hon-002', 'Cleanroom Technology & Aseptic Manufacturing Pioneer', '2023', 'Asia-Pacific Medical Devices Federation', 'Recognition for establishing the largest robotic Class 100,000 surgical pack assembly facility.', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80', 2, 'published'),
('hon-003', 'Top 10 Global Infection Prevention Solution Provider', '2022', 'International Hospital Supplies Association', 'Acknowledged for rapid delivery and zero-defect hospital infection control solutions.', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80', 3, 'published')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- Company History
INSERT INTO med_company_history (id, year, title, description, image_url, sort_order) VALUES
('hist-001', '1998', 'Founding & Medical Textile Production', 'Started as a precision medical non-woven weaving mill supplying sterile hospital gauze and basic surgical fabrics.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80', 1),
('hist-002', '2006', 'ISO 13485 & CE Mark Certification', 'Attained international medical device quality standard approvals and commenced bulk direct exports to Europe and the Middle East.', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80', 2),
('hist-003', '2014', 'Launch of 30,000 m² Class 100,000 Cleanroom', 'Expanded industrial operations with state-of-the-art ultrasonic welding machinery and automated packaging lines.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80', 3),
('hist-004', '2020', 'Global Pandemic Relief & Production Scaling', 'Provided over 150 million units of surgical gowns and isolation gear worldwide during the peak epidemic response.', 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80', 4),
('hist-005', '2024', 'Next-Gen Enzymatic & Smart Surgical Lines', 'Inaugurated dedicated research laboratories for biofilm-eradicating enzymatic formulations and surgical packs.', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80', 5)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- Company Culture
INSERT INTO med_company_culture (id, title, subtitle, description, icon, image_url, sort_order) VALUES
('cult-001', 'Purity & Zero Compromise', 'Sterility First', 'In healthcare, perfection is the baseline. Every square millimeter of fabric is subjected to rigorous barrier integrity checks.', 'ShieldCheck', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80', 1),
('cult-002', 'Continuous Innovation', 'R&D Driven', 'Investing over 8% of annual revenue into non-woven polymer engineering, microbial barrier membranes, and ecological materials.', 'Lightbulb', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80', 2),
('cult-003', 'Global Responsibility', 'Patient Safety Above All', 'Empowering surgeons, nurses, and clinical teams across 85 nations with protective gear they can bet their lives upon.', 'Globe', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80', 3),
('cult-004', 'Sustainable Manufacturing', 'Eco Healthcare', 'Transitioning medical packaging to 100% recyclable mono-materials and reducing manufacturing wastewater by 95%.', 'Leaf', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80', 4)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- News
INSERT INTO med_news (id, slug, category, title, excerpt, content, cover_image, author, published_at, status) VALUES
('news-001', 'pakistan-medical-showcases-sterile-surgical-packs-at-arab-health-dubai', 'company-news', 'Pakistan Medical Supplies Showcases Advanced Surgical Packs at Arab Health Dubai', 'Our international sales team demonstrated next-generation AAMI Level 4 surgical gowns and procedure packs at the Dubai World Trade Centre.', 'At the recent Arab Health Medical Exhibition in Dubai, Pakistan Medical Supplies welcomed more than 850 healthcare distributors, procurement directors, and hospital consortium leaders. The focus of this year exhibition was our enhanced AAMI Level 4 reinforced surgical gown line and procedure-specific orthopedic surgical packs. Our engineers presented live hydrostatic head pressure resistance demonstrations, validating zero fluid strikethrough under extreme surgical pressure conditions.', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', 'Editorial Team', NOW() - INTERVAL '3 days', 'published'),
('news-002', 'expansion-of-class-100000-cleanroom-facility-reaches-completion', 'company-news', 'Expansion of 60,000 m² Class 100,000 Purification Cleanroom Reaches Completion', 'The facility expansion enhances monthly sterile surgical drape manufacturing capacity to 12 million units.', 'We are pleased to announce the formal commissioning of our newly expanded Phase 3 cleanroom complex. Spanning an additional 25,000 square meters of Class 100,000 purified workspace, the unit integrates automated ultrasonic welding stations, robotic laser cutting beds, and cleanroom air handling systems maintaining positive pressure and HEPA filtration.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', 'Operations Directorate', NOW() - INTERVAL '10 days', 'published'),
('news-003', 'who-issues-updated-guidelines-for-surgical-site-infection-prevention', 'industry-dynamics', 'WHO Issues Updated Guidelines for Surgical Site Infection (SSI) Prevention in Operating Theatres', 'Global healthcare authorities underline the paramount role of high-barrier non-woven drapes over traditional cotton linens.', 'The World Health Organization (WHO) and CDC have jointly reiterated recommendations emphasizing single-use impervious surgical gowns and drapes. Repeated laundering of traditional woven cotton causes weave expansion, resulting in microbe migration and micro-fiber shed. Modern multi-layer SMS non-wovens offer standardized barrier integrity proven to lower surgical site infection rates by over 40%.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', 'Clinical Regulatory Dept', NOW() - INTERVAL '18 days', 'published')
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- Blogs
INSERT INTO med_blogs (id, slug, category, title, excerpt, content, cover_image, author, reading_time, published_at, status) VALUES
('blog-001', 'how-to-choose-the-right-aami-level-surgical-gown', 'problem-guide', 'Clinical Guide: How to Select the Correct AAMI PB70 Level for Surgical Gowns', 'A comprehensive comparison between AAMI Levels 1, 2, 3, and 4 to help hospital purchasing departments align protection with clinical exposure risks.', 'Selecting appropriate surgical attire requires assessing fluid exposure risks. AAMI PB70 defines four levels of barrier performance based on impact penetration and hydrostatic pressure testing. Level 1 is suited for basic triage; Level 2 for minimally invasive diagnostic procedures; Level 3 for standard laparotomy and mastectomy; while Level 4 is mandatory for high-blood-loss procedures like orthopedic arthroplasty, cardiovascular bypass, and trauma surgeries.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', 'Dr. Farooq Khan, Chief Quality Officer', '5 min read', NOW() - INTERVAL '5 days', 'published'),
('blog-002', 'overcoming-biofilm-resistance-in-endoscopic-channel-cleaning', 'product-introduction', 'Overcoming Bacterial Biofilm Resistance in Flexible Endoscope Channels with Multi-Enzyme Cleaners', 'Why traditional detergents fail against polysaccharide matrix biofilms, and how quad-enzyme solutions restore lumen sterility.', 'Flexible endoscopes feature long, narrow internal lumens that present one of the most formidable reprocessing challenges in hospital medicine. Organic soils rapidly consolidate into dense biofilms that shield underlying bacteria from high-level chemical disinfectants. Pakistan Medical Multi-Enzyme Cleaner 858 combines high-activity proteases and cellulases that chemically break down the matrix within 3 minutes.', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80', 'CSSD Specialist Panel', '6 min read', NOW() - INTERVAL '12 days', 'published')
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- Videos
INSERT INTO med_videos (id, slug, title, description, video_url, thumbnail_url, duration, sort_order, status) VALUES
('vid-001', 'class-100000-cleanroom-surgical-pack-manufacturing-tour', 'Automated Class 100,000 Cleanroom & Ultrasonic Surgical Pack Production Facility Tour', 'Take an inside look at Pakistan Medical automated manufacturing lines, HEPA purification zones, and rigorous quality inspection protocols.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', '04:25', 1, 'published'),
('vid-002', 'hydrostatic-pressure-test-surgical-gown-demonstration', 'Hydrostatic Pressure & Blood Strikethrough Barrier Test Demonstration', 'Watch our laboratory technicians execute standard EN 13795 and AAMI PB70 hydrostatic tests comparing SMS reinforced gowns against liquid penetration.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', '03:10', 2, 'published'),
('vid-003', 'multi-enzyme-858-rapid-biofilm-dissolution-test', 'Multi-Enzyme Cleaner 858 Biofilm Dissolution Laboratory Demonstration', 'Microscopic demonstration showing how quad-enzyme formula digests stubborn proteinaceous soil on endoscopic lumen samples in under 180 seconds.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80', '02:45', 3, 'published')
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;
