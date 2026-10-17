// ============================================================
//  MyKiraShop — KATALOG PRODUK (SUMBER UTAMA, platform-agnostic)
// ------------------------------------------------------------
//  Konsep: IMVU shop, di-upgrade untuk POD / dropship fizikal.
//  Struktur: Shop -> sub-tab "Baju" & "Aksesori" (setiap satu 1 laman).
//  Bonus POD: 1 design -> banyak produk (T-shirt, Hoodie, Cap, Mug...).
//
//  Cara tambah produk:
//    1. Copy mockup ke: public/products/<id>.png
//    2. Tambah object dalam array `products` di bawah.
//    3. Tambah link platform jual dalam `links`.
//
//  Kalau platform tutup / kena ban -> TUKAR `url` sahaja. Produk kekal.
// ============================================================

export type ProductStatus = 'active' | 'draft' | 'soldout'
export type SectionId = 'baju' | 'aksesori'

export interface Section {
  id: SectionId
  label: string
  emoji: string
  tagline: string
}

export interface ProductLink {
  /** Redbubble, Etsy, Shopee, TikTok Shop, WhatsApp, ... */
  platform: string
  url: string
  price?: string
  primary?: boolean
}

export interface Product {
  id: string
  title: string
  description: string
  /** Kategori utama -> sub-tab */
  section: SectionId
  /** Jenis produk: T-Shirt, Hoodie, Cap, Mug, Phone Case, ... */
  type: string
  tags: string[]
  /** Mockup lokal: /products/<id>.png */
  image: string
  emoji?: string
  /** Rujukan fail design asal (XCF/PSD) untuk simpanan sendiri */
  designFile?: string
  status: ProductStatus
  links: ProductLink[]
}

// ---- Sub-tab (setiap satu = 1 laman) ----
export const sections: Section[] = [
  { id: 'baju', label: 'Baju', emoji: '👕', tagline: 'T-shirt, hoodie & apparel print-on-demand' },
  { id: 'aksesori', label: 'Aksesori', emoji: '🎒', tagline: 'Cap, mug, phone case, tote & lagi' },
]

// ---- Produk ----
// Design: AKU ANAK BRUNEI (satu design -> pelbagai jenis produk POD)
export const products: Product[] = [
  // ===== BAJU =====
  {
    id: 'aku-anak-brunei-tshirt',
    title: 'AKU ANAK BRUNEI — T-Shirt',
    description: 'Design fantasy neon blue (warrior + masjid). Untuk yang bangga jadi anak Brunei.',
    section: 'baju',
    type: 'T-Shirt',
    tags: ['Brunei', 'Neon', 'Fantasy'],
    image: '/products/aku-anak-brunei-tshirt.png',
    emoji: '🛡️',
    designFile: 'D:\\downloads\\koleksibaju\\ANAKBRUNEI.xcf',
    status: 'active',
    links: [
      { platform: 'Redbubble', url: 'https://www.redbubble.com/', price: '$15', primary: true },
      { platform: 'Shopee', url: 'https://shopee.com.my/', price: 'RM35' },
      { platform: 'WhatsApp', url: 'https://wa.me/60XXXXXXXXX' },
    ],
  },
  {
    id: 'aku-anak-brunei-hoodie',
    title: 'AKU ANAK BRUNEI — Hoodie',
    description: 'Versi hoodie hitam dengan design yang sama. Selesa untuk malam sejuk.',
    section: 'baju',
    type: 'Hoodie',
    tags: ['Brunei', 'Hoodie'],
    image: '/products/aku-anak-brunei-hoodie.png',
    emoji: '🧥',
    designFile: 'D:\\downloads\\koleksibaju\\ANAKBRUNEI.xcf',
    status: 'draft',
    links: [],
  },
  {
    id: 'orang-sabah-tshirt',
    title: 'ORANG SABAH — T-Shirt',
    description: 'Slot produk seterusnya. Tukar gambar, tajuk, dan link.',
    section: 'baju',
    type: 'T-Shirt',
    tags: ['Sabah'],
    image: '/products/orang-sabah-tshirt.png',
    emoji: '🌿',
    status: 'draft',
    links: [],
  },

  // ===== AKSESORI =====
  {
    id: 'aku-anak-brunei-cap',
    title: 'AKU ANAK BRUNEI — Cap',
    description: 'Cap hitam, design sulam/print kecil di depan.',
    section: 'aksesori',
    type: 'Cap',
    tags: ['Brunei', 'Cap'],
    image: '/products/aku-anak-brunei-cap.png',
    emoji: '🧢',
    status: 'draft',
    links: [],
  },
  {
    id: 'aku-anak-brunei-mug',
    title: 'AKU ANAK BRUNEI — Mug',
    description: 'Mug putih/ceramic, sesuai hadiah & kegunaan harian.',
    section: 'aksesori',
    type: 'Mug',
    tags: ['Brunei', 'Mug'],
    image: '/products/aku-anak-brunei-mug.png',
    emoji: '☕',
    status: 'draft',
    links: [],
  },
  {
    id: 'aku-anak-brunei-phonecase',
    title: 'AKU ANAK BRUNEI — Phone Case',
    description: 'Phone case semua model popular. Design sama.',
    section: 'aksesori',
    type: 'Phone Case',
    tags: ['Brunei', 'Phone Case'],
    image: '/products/aku-anak-brunei-phonecase.png',
    emoji: '📱',
    status: 'draft',
    links: [],
  },
]

/** Senarai jenis produk unik dalam satu section (untuk filter) */
export function typesInSection(section: SectionId): string[] {
  return Array.from(new Set(products.filter((p) => p.section === section).map((p) => p.type)))
}

/** Bilangan produk dalam satu section */
export function countInSection(section: SectionId): number {
  return products.filter((p) => p.section === section).length
}
