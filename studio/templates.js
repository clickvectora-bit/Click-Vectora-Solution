/**
 * Click Vectora Solution - Professional & Modern Product Templates Data
 */

const SUB_CATEGORIES = {
  card: [
    { id: 'card_horiz', name: 'Horizontal Standard (1000x571)', width: 1000, height: 571 },
    { id: 'card_vert', name: 'Vertical Modern (571x1000)', width: 571, height: 1000 }
  ],
  flyer: [
    { id: 'flyer_a4', name: 'A4 Portrait (800x1131)', width: 800, height: 1131 },
    { id: 'flyer_square', name: 'Square Event Flyer (900x900)', width: 900, height: 900 }
  ],
  brochure: [
    { id: 'brochure_trifold', name: 'Tri-Fold Landscape (1131x800)', width: 1131, height: 800 },
    { id: 'brochure_bifold', name: 'Bi-Fold Standard (1000x800)', width: 1000, height: 800 }
  ],
  poster: [
    { id: 'poster_event', name: 'Event Poster (800x1200)', width: 800, height: 1200 },
    { id: 'poster_square', name: 'Social Post Poster (1000x1000)', width: 1000, height: 1000 }
  ],
  banner: [
    { id: 'banner_web', name: 'Website Hero Banner (1200x600)', width: 1200, height: 600 },
    { id: 'banner_social', name: 'Social Media Cover (1200x630)', width: 1200, height: 630 }
  ],
  standee: [
    { id: 'standee_rollup', name: 'Roll-Up Standee (800x2000)', width: 800, height: 2000 },
    { id: 'standee_xframe', name: 'X-Standee Display (700x1600)', width: 700, height: 1600 }
  ],
  menu: [
    { id: 'menu_restaurant', name: 'Restaurant Menu Standard (800x1100)', width: 800, height: 1100 },
    { id: 'menu_cafe', name: 'Cafe & Bar Card (700x1000)', width: 700, height: 1000 }
  ]
};

const PRODUCT_TEMPLATES = {
  card: [
    { id: 'card_corporate', title: '🏢 Executive Minimal', desc: 'Sleek corporate layout with a structured dark sidebar.', type: 'card_corporate' },
    { id: 'card_creative', title: '🎨 Vibrant Studio', desc: 'Creative orange and warm tone branding for modern agencies.', type: 'card_creative' },
    { id: 'card_modern', title: '⚡ Cyber Dark Theme', desc: 'High-contrast dark card with neon cyan typography accents.', type: 'card_modern' },
    { id: 'card_luxury', title: '💎 Luxury Gold', desc: 'Sophisticated dark slate and gold accents for premium consulting.', type: 'card_luxury' }
  ],
  flyer: [
    { id: 'flyer_sale', title: '🏷️ Flash Sale Promo', desc: 'High-conversion retail discount flyer with bold geometric frames.', type: 'flyer_sale' },
    { id: 'flyer_biz', title: '🚀 SaaS Tech Launch', desc: 'Clean modern layout for tech companies and modern startups.', type: 'flyer_biz' },
    { id: 'flyer_fitness', title: '🔥 Gym & Fitness Club', desc: 'Energetic high-impact layout for training sessions and classes.', type: 'flyer_fitness' }
  ],
  brochure: [
    { id: 'brochure_travel', title: '✈️ Exotic Destinations', desc: 'Immersive travel agency brochure layout with blue accents.', type: 'brochure_travel' },
    { id: 'brochure_realestate', title: '🏡 Luxury Real Estate', desc: 'Professional property showcase brochure with clean frames.', type: 'brochure_realestate' }
  ],
  poster: [
    { id: 'poster_concert', title: '🎸 Neon Music Festival', desc: 'Cyberpunk neon aesthetics for music events and nightlife.', type: 'poster_concert' },
    { id: 'poster_seminar', title: '💡 AI & Tech Conference', desc: 'Professional modern poster layout for corporate seminars.', type: 'poster_seminar' }
  ],
  banner: [
    { id: 'banner_ecommerce', title: '🛍️ E-Commerce Global Hero', desc: 'Conversion-optimized web banner with bold typography.', type: 'banner_ecommerce' },
    { id: 'banner_brand', title: '🌐 Cloud Agency Hero', desc: 'Deep navy background with crisp SaaS feature highlights.', type: 'banner_brand' }
  ],
  standee: [
    { id: 'standee_promo', title: '📢 Exhibition Roll-Up', desc: 'Vertical standee designed for high footfall trade expos.', type: 'standee_promo' },
    { id: 'standee_corporate', title: '💼 Corporate Welcome Stand', desc: 'Professional executive welcome display banner.', type: 'standee_corporate' }
  ],
  menu: [
    { id: 'menu_fine', title: '🍷 Fine Dining & Wine', desc: 'Classy dark charcoal menu template with gold borders.', type: 'menu_fine' },
    { id: 'menu_cafe', title: '☕ Artisan Cafe & Bistro', desc: 'Warm minimalist layout for coffee shops and bakeries.', type: 'menu_cafe' }
  ]
};

// Advanced Fabric Canvas Template Generator Builders
function applyTemplateObjects(canvas, templateType, BASE_WIDTH, BASE_HEIGHT, setCanvasBackground) {
  if (templateType === 'card_corporate') {
    setCanvasBackground('#ffffff');
    let rect = new fabric.Rect({ left: 40, top: 40, width: 200, height: BASE_HEIGHT - 80, fill: '#0F172A', rx: 6, ry: 6 });
    let title = new fabric.IText('ALEXANDER WRIGHT', { left: 270, top: 110, fontSize: 26, fontFamily: 'Poppins', fill: '#0F172A', fontWeight: 'bold' });
    let subtitle = new fabric.IText('MANAGING DIRECTOR', { left: 270, top: 155, fontSize: 13, fontFamily: 'Montserrat', fill: '#0284C7', charSpacing: 80 });
    let contact = new fabric.IText('alexander@clickvectorasolution.com\n+91 98765 43210\nwww.clickvectorasolution.com', { left: 270, top: 220, fontSize: 13, fontFamily: 'Roboto', fill: '#475569', lineHeight: 1.5 });
    canvas.add(rect, title, subtitle, contact);
  } 
  else if (templateType === 'card_creative') {
    setCanvasBackground('#FFF7ED');
    let bgShape = new fabric.Rect({ left: 0, top: 0, width: 340, height: BASE_HEIGHT, fill: '#FF6B00' });
    let title = new fabric.IText('STUDIO VECTORA', { left: 370, top: 130, fontSize: 30, fontFamily: 'Montserrat', fill: '#0F172A', fontWeight: 'bold' });
    let subtitle = new fabric.IText('CREATIVE DESIGN AGENCY', { left: 370, top: 180, fontSize: 12, fontFamily: 'Poppins', fill: '#EA580C', charSpacing: 100 });
    let contact = new fabric.IText('Hello@vectorastudio.io • +1 (555) 234-8765', { left: 370, top: 320, fontSize: 13, fontFamily: 'Roboto', fill: '#334155' });
    canvas.add(bgShape, title, subtitle, contact);
  } 
  else if (templateType === 'card_modern') {
    setCanvasBackground('#090D16');
    let glowAccent = new fabric.Rect({ left: 50, top: 50, width: 6, height: BASE_HEIGHT - 100, fill: '#00F5D4', rx: 3 });
    let title = new fabric.IText('MARCUS VANCE', { left: 80, top: 130, fontSize: 32, fontFamily: 'Montserrat', fill: '#FFFFFF', fontWeight: 'bold' });
    let subtitle = new fabric.IText('UI/UX LEAD ARCHITECT', { left: 80, top: 185, fontSize: 13, fontFamily: 'Montserrat', fill: '#00F5D4', charSpacing: 120 });
    let contact = new fabric.IText('marcus@vectorasolution.com | @marcus_ux', { left: 80, top: 320, fontSize: 13, fontFamily: 'Roboto', fill: '#94A3B8' });
    canvas.add(glowAccent, title, subtitle, contact);
  }
  else if (templateType === 'card_luxury') {
    setCanvasBackground('#111827');
    let goldFrame = new fabric.Rect({ left: 30, top: 30, width: BASE_WIDTH - 60, height: BASE_HEIGHT - 60, fill: 'transparent', stroke: '#F59E0B', strokeWidth: 2, rx: 4 });
    let title = new fabric.IText('VICTORIA STERLING', { left: 70, top: 140, fontSize: 30, fontFamily: 'Playfair Display', fill: '#FBBF24', fontWeight: 'bold', charSpacing: 50 });
    let subtitle = new fabric.IText('PRIVATE WEALTH ADVISOR', { left: 70, top: 195, fontSize: 12, fontFamily: 'Montserrat', fill: '#9CA3AF', charSpacing: 150 });
    let contact = new fabric.IText('v.sterling@vectorafinancial.com • London / New York', { left: 70, top: 320, fontSize: 12, fontFamily: 'Roboto', fill: '#D1D5DB' });
    canvas.add(goldFrame, title, subtitle, contact);
  }
  else if (templateType === 'flyer_sale') {
    setCanvasBackground('#FEF3C7');
    let header = new fabric.Rect({ left: 50, top: 50, width: BASE_WIDTH - 100, height: 160, fill: '#DC2626', rx: 12, ry: 12 });
    let title = new fabric.IText('MEGA SEASON SALE', { left: 80, top: 90, fontSize: 40, fontFamily: 'Montserrat', fill: '#FFFFFF', fontWeight: 'bold' });
    let sub = new fabric.IText('UP TO 50% OFF ON ALL COLLECTIONS', { left: 80, top: 150, fontSize: 16, fontFamily: 'Poppins', fill: '#FEE2E2', charSpacing: 50 });
    let details = new fabric.IText('• Premium Designer Templates\n• Limited Time Offer Ending Sunday\n• Visit online store to claim voucher code', { left: 80, top: 280, fontSize: 20, fontFamily: 'Roboto', fill: '#1E293B', lineHeight: 1.6 });
    canvas.add(header, title, sub, details);
  }
  else if (templateType === 'flyer_biz') {
    setCanvasBackground('#F8FAFC');
    let topCard = new fabric.Rect({ left: 60, top: 60, width: BASE_WIDTH - 120, height: 200, fill: '#0F172A', rx: 16 });
    let title = new fabric.IText('CLOUDSVCS ENTERPRISE', { left: 90, top: 110, fontSize: 34, fontFamily: 'Montserrat', fill: '#FFFFFF', fontWeight: 'bold' });
    let subtitle = new fabric.IText('Next-Gen Cloud Architecture & Node.js Microservices', { left: 90, top: 170, fontSize: 16, fontFamily: 'Poppins', fill: '#38BDF8' });
    let desc = new fabric.IText('Scale your business infrastructure with automated deployments,\nrobust PostgreSQL databases, and 99.9% uptime SLA.', { left: 90, top: 320, fontSize: 18, fontFamily: 'Roboto', fill: '#334155', lineHeight: 1.6 });
    canvas.add(topCard, title, subtitle, desc);
  }
  else if (templateType === 'flyer_fitness') {
    setCanvasBackground('#0F172A');
    let bannerBg = new fabric.Rect({ left: 50, top: 50, width: BASE_WIDTH - 100, height: 180, fill: '#FF6B00', rx: 10 });
    let title = new fabric.IText('BEASTMODE FITNESS', { left: 80, top: 95, fontSize: 42, fontFamily: 'Montserrat', fill: '#FFFFFF', fontWeight: 'bold', charSpacing: 40 });
    let sub = new fabric.IText('TRANSFORM YOUR BODY • START TODAY', { left: 80, top: 160, fontSize: 16, fontFamily: 'Poppins', fill: '#FFF7ED', charSpacing: 100 });
    let bodyText = new fabric.IText('✓ Professional Personal Trainers\n✓ State of the Art Equipment\n✓ Custom Nutrition & Diet Coaching', { left: 80, top: 290, fontSize: 20, fontFamily: 'Roboto', fill: '#E2E8F0', lineHeight: 1.8 });
    canvas.add(bannerBg, title, sub, bodyText);
  }
  else if (templateType === 'brochure_travel') {
    setCanvasBackground('#F0F9FF');
    let bannerBg = new fabric.Rect({ left: 60, top: 60, width: BASE_WIDTH - 120, height: 180, fill: '#0284C7', rx: 12 });
    let mainTitle = new fabric.IText('DISCOVER PARADISE ESCAPES', { left: 90, top: 100, fontSize: 36, fontFamily: 'Playfair Display', fill: '#FFFFFF', fontWeight: 'bold' });
    let subText = new fabric.IText('Curated luxury travel packages across pristine beaches and mountains.', { left: 90, top: 160, fontSize: 16, fontFamily: 'Poppins', fill: '#E0F2FE' });
    let details = new fabric.IText('• All-Inclusive Luxury Resorts\n• Private Guided Tours & Airfare Included\n• Special Early Bird Discounts Available Now', { left: 90, top: 300, fontSize: 18, fontFamily: 'Roboto', fill: '#0369A1', lineHeight: 1.7 });
    canvas.add(bannerBg, mainTitle, subText, details);
  }
  else if (templateType === 'brochure_realestate') {
    setCanvasBackground('#F8FAFC');
    let headerBox = new fabric.Rect({ left: 60, top: 60, width: BASE_WIDTH - 120, height: 190, fill: '#1E293B', rx: 12 });
    let title = new fabric.IText('PRESTIGE HEIGHTS', { left: 90, top: 105, fontSize: 36, fontFamily: 'Playfair Display', fill: '#F8FAFC', fontWeight: 'bold', charSpacing: 30 });
    let subtitle = new fabric.IText('LUXURY APARTMENTS & PENTHOUSES', { left: 90, top: 160, fontSize: 14, fontFamily: 'Montserrat', fill: '#38BDF8', charSpacing: 100 });
    let desc = new fabric.IText('✓ Prime Downtown Location\n✓ Panoramic Skyline Views\n✓ Smart Home Integration & Private Parking', { left: 90, top: 310, fontSize: 18, fontFamily: 'Roboto', fill: '#334155', lineHeight: 1.8 });
    canvas.add(headerBox, title, subtitle, desc);
  }
  else if (templateType === 'poster_concert') {
    setCanvasBackground('#050505');
    let accentBox = new fabric.Rect({ left: 50, top: 50, width: BASE_WIDTH - 100, height: BASE_HEIGHT - 100, fill: 'transparent', stroke: '#00F5D4', strokeWidth: 4, rx: 12 });
    let eventTitle = new fabric.IText('NEON PULSE LIVE', { left: 90, top: 140, fontSize: 48, fontFamily: 'Montserrat', fill: '#FFFFFF', fontWeight: 'bold', charSpacing: 60 });
    let eventSub = new fabric.IText('SATURDAY, 9:00 PM • METRO ARENA', { left: 90, top: 220, fontSize: 20, fontFamily: 'Roboto', fill: '#00F5D4', charSpacing: 50 });
    let lineup = new fabric.IText('FEATURING:\nDJ VECTORA • SYNTHWAVE CREW • CYBERBEAT', { left: 90, top: 380, fontSize: 22, fontFamily: 'Poppins', fill: '#A1A1AA', lineHeight: 1.8 });
    canvas.add(accentBox, eventTitle, eventSub, lineup);
  }
  else if (templateType === 'poster_seminar') {
    setCanvasBackground('#0F172A');
    let topBanner = new fabric.Rect({ left: 60, top: 60, width: BASE_WIDTH - 120, height: 220, fill: '#2563EB', rx: 12 });
    let title = new fabric.IText('AI & FUTURE TECH 2026', { left: 90, top: 115, fontSize: 38, fontFamily: 'Montserrat', fill: '#FFFFFF', fontWeight: 'bold' });
    let sub = new fabric.IText('Global Innovation Summit & Keynote Lectures', { left: 90, top: 185, fontSize: 18, fontFamily: 'Poppins', fill: '#BFDBFE' });
    let details = new fabric.IText('• Industry Expert Panelists & Workshops\n• Networking Sessions with Tech Founders\n• Register online at clickvectorasolution.com', { left: 90, top: 360, fontSize: 20, fontFamily: 'Roboto', fill: '#94A3B8', lineHeight: 1.8 });
    canvas.add(topBanner, title, sub, details);
  }
  else if (templateType === 'banner_ecommerce') {
    setCanvasBackground('#0F172A');
    let heroText = new fabric.IText('THE ULTIMATE TECH SALE', { left: 80, top: 120, fontSize: 44, fontFamily: 'Montserrat', fill: '#FFFFFF', fontWeight: 'bold' });
    let descText = new fabric.IText('Upgrade your workspace with high-performance hardware & accessories.', { left: 80, top: 195, fontSize: 20, fontFamily: 'Poppins', fill: '#38BDF8' });
    let badge = new fabric.Rect({ left: 80, top: 270, width: 220, height: 50, fill: '#FF6B00', rx: 8 });
    let badgeText = new fabric.IText('SHOP NOW →', { left: 125, top: 283, fontSize: 20, fontFamily: 'Montserrat', fill: '#FFFFFF', fontWeight: 'bold' });
    canvas.add(heroText, descText, badge, badgeText);
  }
  else if (templateType === 'banner_brand') {
    setCanvasBackground('#0B0F19');
    let heroText = new fabric.IText('Scale Your Enterprise Cloud', { left: 80, top: 130, fontSize: 42, fontFamily: 'Montserrat', fill: '#FFFFFF', fontWeight: 'bold' });
    let descText = new fabric.IText('Robust SaaS solutions built for high availability and zero friction.', { left: 80, top: 205, fontSize: 20, fontFamily: 'Poppins', fill: '#00F5D4' });
    canvas.add(heroText, descText);
  }
  else if (templateType === 'standee_promo') {
    setCanvasBackground('#0F172A');
    let headerBox = new fabric.Rect({ left: 50, top: 50, width: BASE_WIDTH - 100, height: 320, fill: '#FF6B00', rx: 16 });
    let title = new fabric.IText('CLICK VECTORA\nSOLUTIONS', { left: 80, top: 120, fontSize: 46, fontFamily: 'Montserrat', fill: '#FFFFFF', fontWeight: 'bold', lineHeight: 1.1 });
    let subtitle = new fabric.IText('DIGITAL BRANDING & WEB ARCHITECTURE', { left: 80, top: 260, fontSize: 16, fontFamily: 'Poppins', fill: '#FFF7ED', charSpacing: 80 });
    let details = new fabric.IText('✓ Custom Web Development\n✓ Professional Graphic Design\n✓ SEO & Digital Marketing\n✓ SaaS Billing Platforms', { left: 80, top: 460, fontSize: 24, fontFamily: 'Roboto', fill: '#94A3B8', lineHeight: 2.0 });
    canvas.add(headerBox, title, subtitle, details);
  }
  else if (templateType === 'standee_corporate') {
    setCanvasBackground('#1E293B');
    let borderBox = new fabric.Rect({ left: 40, top: 40, width: BASE_WIDTH - 80, height: BASE_HEIGHT - 80, fill: 'transparent', stroke: '#38BDF8', strokeWidth: 3, rx: 12 });
    let title = new fabric.IText('WELCOME TO OUR\nGLOBAL HEADQUARTERS', { left: 80, top: 150, fontSize: 40, fontFamily: 'Montserrat', fill: '#FFFFFF', fontWeight: 'bold', lineHeight: 1.2 });
    let sub = new fabric.IText('Please check in at reception before entering conference floors.', { left: 80, top: 280, fontSize: 20, fontFamily: 'Poppins', fill: '#94A3B8', lineHeight: 1.5 });
    canvas.add(borderBox, title, sub);
  }
  else if (templateType === 'menu_fine') {
    setCanvasBackground('#121212');
    let borderFrame = new fabric.Rect({ left: 40, top: 40, width: BASE_WIDTH - 80, height: BASE_HEIGHT - 80, fill: 'transparent', stroke: '#D97706', strokeWidth: 2 });
    let menuTitle = new fabric.IText('LE GOURMET RESTAURANT', { left: (BASE_WIDTH / 2) - 210, top: 80, fontSize: 34, fontFamily: 'Playfair Display', fill: '#FBBF24', fontWeight: 'bold', charSpacing: 100 });
    let items = new fabric.IText('STARTERS & APETIZERS\nTruffle Arancini ................................ ₹450\nPan Seared Scallops ........................... ₹680\n\nMAIN COURSES\nSignature Herb Roasted Chicken ........ ₹950\nWagyu Beef Tenderloin ...................... ₹1450\nWild Mushroom Risotto ...................... ₹820', { left: 80, top: 180, fontSize: 18, fontFamily: 'Poppins', fill: '#E5E7EB', lineHeight: 1.8 });
    canvas.add(borderFrame, menuTitle, items);
  }
  else if (templateType === 'menu_cafe') {
    setCanvasBackground('#FAF7F2');
    let borderFrame = new fabric.Rect({ left: 40, top: 40, width: BASE_WIDTH - 80, height: BASE_HEIGHT - 80, fill: 'transparent', stroke: '#B45309', strokeWidth: 2 });
    let menuTitle = new fabric.IText('ARTISAN COFFEE & BAKERY', { left: (BASE_WIDTH / 2) - 200, top: 80, fontSize: 30, fontFamily: 'Playfair Display', fill: '#78350F', fontWeight: 'bold', charSpacing: 80 });
    let items = new fabric.IText('ESPRESSO BAR\nDouble Shot Espresso ....................... ₹220\nCaramel Macchiato .......................... ₹320\nSignature Cold Brew ........................ ₹290\n\nBAKERY & PASTRIES\nAlmond Croissant ............................ ₹240\nBlueberry Cheesecake ...................... ₹350', { left: 80, top: 180, fontSize: 18, fontFamily: 'Poppins', fill: '#292524', lineHeight: 1.8 });
    canvas.add(borderFrame, menuTitle, items);
  }
}