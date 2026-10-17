import { useState } from 'react'
import {
  products,
  sections,
  typesInSection,
  countInSection,
  type Product,
  type SectionId,
} from '../data/products'

const statusStyle: Record<Product['status'], { label: string; cls: string; dot: string }> = {
  active: {
    label: 'Aktif',
    cls: 'bg-green-500/15 text-green-300 border-green-500/30',
    dot: 'bg-green-400',
  },
  draft: {
    label: 'Draf',
    cls: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    dot: 'bg-amber-400',
  },
  soldout: {
    label: 'Habis',
    cls: 'bg-red-500/15 text-red-300 border-red-500/30',
    dot: 'bg-red-400',
  },
}

function ProductImage({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false)

  if (failed || !product.image) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-cyan-500/20">
        <span className="text-5xl">{product.emoji ?? '🛍️'}</span>
      </div>
    )
  }

  return (
    <img
      src={product.image}
      alt={product.title}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  )
}

function ProductCard({ product }: { product: Product }) {
  const st = statusStyle[product.status]
  return (
    <div className="group relative flex flex-col bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.15] hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 transition-all duration-300">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-900">
        <ProductImage product={product} />
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border backdrop-blur-sm ${st.cls}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}></span>
          {st.label}
        </span>
        <span className="absolute top-3 right-3 text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-gray-200 backdrop-blur-sm">
          {product.type}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-semibold text-white mb-1">{product.title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">{product.description}</p>

        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.map((t) => (
              <span key={t} className="text-[11px] text-gray-500">
                #{t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-white/5">
          {product.links.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {product.links.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                    link.primary
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.platform}
                  {link.price && <span className="opacity-70">· {link.price}</span>}
                </a>
              ))}
            </div>
          ) : (
            <span className="text-xs text-gray-600 italic">Segera hadir</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MyKiraShop() {
  const [section, setSection] = useState<SectionId>('baju')
  const [query, setQuery] = useState('')
  const [type, setType] = useState('Semua')

  const activeSection = sections.find((s) => s.id === section)!
  const types = ['Semua', ...typesInSection(section)]

  const filtered = products.filter((p) => {
    if (p.section !== section) return false
    if (type !== 'Semua' && p.type !== type) return false
    const q = query.toLowerCase()
    return (
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    )
  })

  const resetFilters = () => {
    setType('Semua')
    setQuery('')
  }

  return (
    <div>
      {/* Sub-tabs: setiap satu = 1 laman */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSection(s.id)
                resetFilters()
              }}
              className={`min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                section === s.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>{s.emoji}</span>
              {s.label}
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                  section === s.id ? 'bg-white/20' : 'bg-white/10'
                }`}
              >
                {countInSection(s.id)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Section header */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
          {activeSection.emoji} {activeSection.label}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">{activeSection.tagline}</p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-4">
        <div className="relative flex items-center">
          <span className="absolute left-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder={`Cari dalam ${activeSection.label}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm text-base"
          />
        </div>
      </div>

      {/* Type filter */}
      {types.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`min-h-[40px] px-4 py-2 text-xs sm:text-sm rounded-full border transition-all duration-200 ${
                type === t
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <span className="text-4xl mb-4 block">🔍</span>
          <p className="text-gray-400">Tiada produk ditemui dalam {activeSection.label}</p>
        </div>
      )}

      {/* Footer note */}
      <p className="text-center text-xs text-gray-600 mt-10">
        MyKiraShop • POD &amp; dropship • Katalog sendiri, link platform boleh ditukar bila-bila
      </p>
    </div>
  )
}
