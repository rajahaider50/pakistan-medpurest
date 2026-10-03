export type SupportedLocale = 'en' | 'es' | 'ar' | 'pt' | 'zh';

export interface Translations {
  home: string;
  products: string;
  aboutUs: string;
  news: string;
  blog: string;
  video: string;
  certificate: string;
  contactUs: string;
  history: string;
  honor: string;
  culture: string;
  companyNews: string;
  industryDynamics: string;
  problemGuide: string;
  productIntro: string;
  searchPlaceholder: string;
  inquireNow: string;
  viewDetails: string;
  downloadBrochure: string;
  popularSearches: string;
  quickLinks: string;
  productCategories: string;
  contactInfo: string;
  sendInquiry: string;
  allRightsReserved: string;
  heroTitle: string;
  heroSubtitle: string;
  exploreCatalog: string;
  reasonsTitle: string;
  reasonsSubtitle: string;
  certificatesTitle: string;
  latestNewsTitle: string;
}

export const translations: Record<SupportedLocale, Translations> = {
  en: {
    home: 'Home',
    products: 'Products',
    aboutUs: 'About Us',
    news: 'News',
    blog: 'Blog',
    video: 'Video',
    certificate: 'Certificates',
    contactUs: 'Contact Us',
    history: 'History',
    honor: 'Honors & Awards',
    culture: 'Corporate Culture',
    companyNews: 'Company News',
    industryDynamics: 'Industry Dynamics',
    problemGuide: 'Problem Guide',
    productIntro: 'Product Introduction',
    searchPlaceholder: 'Search products, categories, certificates...',
    inquireNow: 'Inquire Now',
    viewDetails: 'View Details',
    downloadBrochure: 'Download Catalog PDF',
    popularSearches: 'Popular Searches',
    quickLinks: 'Quick Links',
    productCategories: 'Product Categories',
    contactInfo: 'Contact Information',
    sendInquiry: 'Send Business Inquiry',
    allRightsReserved: 'All Rights Reserved',
    heroTitle: 'Pakistan Medical Technology',
    heroSubtitle: 'Leading Manufacturer of Surgical Packs, Disposable Gowns & Infection Prevention Solutions',
    exploreCatalog: 'Explore Product Catalog',
    reasonsTitle: '6 Reasons To Choose Us',
    reasonsSubtitle: 'Dedicated to high-end surgical packs, isolation gowns, medical drapes, and hospital sterilization solutions.',
    certificatesTitle: 'International Quality & Regulatory Certifications',
    latestNewsTitle: 'Latest Medical News & Industry Updates',
  },
  es: {
    home: 'Inicio',
    products: 'Productos',
    aboutUs: 'Sobre Nosotros',
    news: 'Noticias',
    blog: 'Blog',
    video: 'Videos',
    certificate: 'Certificados',
    contactUs: 'Contáctenos',
    history: 'Historia',
    honor: 'Honores',
    culture: 'Cultura Corporativa',
    companyNews: 'Noticias de la Empresa',
    industryDynamics: 'Dinámica de la Industria',
    problemGuide: 'Guía de Problemas',
    productIntro: 'Introducción de Productos',
    searchPlaceholder: 'Buscar productos, batas quirúrgicas...',
    inquireNow: 'Consultar Ahora',
    viewDetails: 'Ver Detalles',
    downloadBrochure: 'Descargar Catálogo PDF',
    popularSearches: 'Búsquedas Populares',
    quickLinks: 'Enlaces Rápidos',
    productCategories: 'Categorías de Productos',
    contactInfo: 'Información de Contacto',
    sendInquiry: 'Enviar Consulta',
    allRightsReserved: 'Todos los derechos reservados',
    heroTitle: 'Tecnología Médica de Pakistán',
    heroSubtitle: 'Fabricante líder de paquetes quirúrgicos, batas desechables y control de infecciones',
    exploreCatalog: 'Explorar Catálogo',
    reasonsTitle: '6 Razones Para Elegirnos',
    reasonsSubtitle: 'Comprometidos con el desarrollo de kits quirúrgicos de alta gama y batas médicas.',
    certificatesTitle: 'Certificaciones Internacionales de Calidad',
    latestNewsTitle: 'Últimas Noticias y Actualizaciones',
  },
  ar: {
    home: 'الرئيسية',
    products: 'المنتجات',
    aboutUs: 'من نحن',
    news: 'الأخبار',
    blog: 'المدونة',
    video: 'فيديو',
    certificate: 'الشهادات',
    contactUs: 'اتصل بنا',
    history: 'تاريخنا',
    honor: 'الجوائز والتكريم',
    culture: 'ثقافة الشركة',
    companyNews: 'أخبار الشركة',
    industryDynamics: 'ديناميكيات الصناعة',
    problemGuide: 'دليل الحلول الطبية',
    productIntro: 'تعريف بالمنتجات',
    searchPlaceholder: 'ابحث عن المنتجات، العباءات الجراحية...',
    inquireNow: 'اطلب تسعيرة الآن',
    viewDetails: 'عرض التفاصيل',
    downloadBrochure: 'تحميل الكتالوج بصيغة PDF',
    popularSearches: 'عمليات البحث الشائعة',
    quickLinks: 'روابط سريعة',
    productCategories: 'أقسام المنتجات',
    contactInfo: 'معلومات الاتصال',
    sendInquiry: 'إرسال استفسار تجاري',
    allRightsReserved: 'جميع الحقوق محفوظة',
    heroTitle: 'تكنولوجيا باكستان الطبية',
    heroSubtitle: 'الشركة الرائدة في تصنيع حزم العمليات الجراحية والملابس الوقائية الطبية المعقمة',
    exploreCatalog: 'استكشف كتالوج المنتجات',
    reasonsTitle: '٦ أسباب تجعلك تختارنا',
    reasonsSubtitle: 'ملتزمون بتطوير حزم العمليات الجراحية المتقدمة وحلول مكافحة العدوى للمستشفيات.',
    certificatesTitle: 'شهادات الجودة والتراخيص الدولية',
    latestNewsTitle: 'آخر الأخبار والتطورات الطبية',
  },
  pt: {
    home: 'Início',
    products: 'Produtos',
    aboutUs: 'Sobre Nós',
    news: 'Notícias',
    blog: 'Blog',
    video: 'Vídeos',
    certificate: 'Certificados',
    contactUs: 'Fale Conosco',
    history: 'História',
    honor: 'Prêmios',
    culture: 'Cultura Corporativa',
    companyNews: 'Notícias da Empresa',
    industryDynamics: 'Dinâmica do Setor',
    problemGuide: 'Guia Clínico',
    productIntro: 'Apresentação de Produtos',
    searchPlaceholder: 'Pesquisar produtos médicos...',
    inquireNow: 'Solicitar Orçamento',
    viewDetails: 'Ver Detalhes',
    downloadBrochure: 'Baixar Catálogo PDF',
    popularSearches: 'Buscas Populares',
    quickLinks: 'Links Rápidos',
    productCategories: 'Categorias de Produtos',
    contactInfo: 'Informações de Contato',
    sendInquiry: 'Enviar Consulta Comercial',
    allRightsReserved: 'Todos os direitos reservados',
    heroTitle: 'Tecnologia Médica do Paquistão',
    heroSubtitle: 'Fabricante líder de campos cirúrgicos, aventais descartáveis e desinfecção',
    exploreCatalog: 'Explorar Catálogo',
    reasonsTitle: '6 Razões Para Nos Escolher',
    reasonsSubtitle: 'Especialistas no desenvolvimento de pacotes cirúrgicos estéreis e vestuário de proteção.',
    certificatesTitle: 'Certificações Internacionais de Qualidade',
    latestNewsTitle: 'Últimas Notícias Médicas',
  },
  zh: {
    home: '首页',
    products: '产品中心',
    aboutUs: '关于我们',
    news: '新闻资讯',
    blog: '临床博客',
    video: '视频展示',
    certificate: '资质证书',
    contactUs: '联系我们',
    history: '发展历程',
    honor: '荣誉资质',
    culture: '企业文化',
    companyNews: '企业动态',
    industryDynamics: '行业前沿',
    problemGuide: '使用指南',
    productIntro: '产品介绍',
    searchPlaceholder: '搜索医疗耗材、手术衣、手术包...',
    inquireNow: '立即询价',
    viewDetails: '查看详情',
    downloadBrochure: '下载电子画册 PDF',
    popularSearches: '热门搜索',
    quickLinks: '快速链接',
    productCategories: '产品大类',
    contactInfo: '联系方式',
    sendInquiry: '发送业务咨询',
    allRightsReserved: '保留所有权利',
    heroTitle: '巴基斯坦医疗科技',
    heroSubtitle: '专业手术包、医用防护服、无菌手术衣与感染控制耗材国际供应商',
    exploreCatalog: '浏览产品目录',
    reasonsTitle: '选择我们的 6 大理由',
    reasonsSubtitle: '专注医用高分子材料、万级净化无菌车间与全球医院集采服务。',
    certificatesTitle: '国际质量与产品认证',
    latestNewsTitle: '最新企业新闻与行业动态',
  },
};
