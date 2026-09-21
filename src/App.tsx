import { useState, useEffect, FormEvent } from 'react'

interface ToolCard {
  id: number
  title: string
  description: string
  url: string
  icon: string
  gradient: string
  tag: string
}

const tools: ToolCard[] = [
  {
    id: 1,
    title: 'Audio Studio',
    description: 'Platform audio processing & conversion tool',
    url: 'https://audio2.mykira.workers.dev/',
    icon: '🎵',
    gradient: 'from-purple-500 via-violet-500 to-fuchsia-500',
    tag: 'Audio'
  },
  {
    id: 2,
    title: 'Kira Enterprise V5',
    description: 'Sistem pengiraan enterprise versi mobile',
    url: 'https://kiraenterprisev5-3.mykira.workers.dev/?v=mobile2',
    icon: '📱',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    tag: 'Mobile'
  },
  {
    id: 3,
    title: 'Kira Enterprise',
    description: 'Sistem pengiraan enterprise penuh',
    url: 'https://kiraenterprise.mykira.workers.dev/',
    icon: '🏢',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    tag: 'Enterprise'
  },
  {
    id: 4,
    title: 'Kira Calculator',
    description: 'Kalkulator pintar & alat pengiraan',
    url: 'https://kira.mykira.workers.dev/',
    icon: '🧮',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    tag: 'Calculator'
  },
  {
    id: 5,
    title: 'EPANet Web',
    description: 'Simulasi rangkaian pengagihan air',
    url: 'https://epanet-web.mykira.workers.dev/',
    icon: '💧',
    gradient: 'from-rose-500 via-pink-500 to-red-500',
    tag: 'Engineering'
  },
  {
    id: 6,
    title: 'KiraBina',
    description: 'Alat pembinaan & pembangun pintar',
    url: 'https://kirabina.mykira.workers.dev/',
    icon: '🏗️',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    tag: 'Builder'
  },
  {
    id: 7,
    title: 'e-Invois Sabah',
    description: 'Jana invois patuh LHDN, PDF & kongsi WhatsApp',
    url: 'https://e-invois.mykira.workers.dev/',
    icon: '📄',
    gradient: 'from-sky-500 via-blue-500 to-cyan-500',
    tag: 'Invois'
  }
]

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [duckQuery, setDuckQuery] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  const quickSearches = [
    { icon: '📰', label: 'Berita', query: 'berita terkini hari ini' },
    { icon: '🌤️', label: 'Cuaca', query: 'cuaca Malaysia hari ini' },
    { icon: '💻', label: 'Tech', query: 'teknologi terbaru 2026' },
    { icon: '📚', label: 'Belajar', query: 'tutorial programming' },
    { icon: '🎬', label: 'Hiburan', query: 'filem popular 2026' },
  ]

  const handleDuckSearch = (e: FormEvent) => {
    e.preventDefault()
    if (duckQuery.trim()) {
      window.open(`https://duckduckgo.com/?q=${encodeURIComponent(duckQuery.trim())}`, '_blank')
    }
  }

  useEffect(() => {
    setIsLoaded(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.tag.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ms-MY', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ms-MY', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Header */}
        <header className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          {/* Logo */}
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                <span className="text-3xl sm:text-4xl">🌐</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-950 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-2">
            MyGate
          </h1>
          <p className="text-sm sm:text-base text-gray-400 font-mono">
            mygate.mykira.workers.dev
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Dynamic Gateway • Hubungkan Semua Alat Anda
          </p>

          {/* Time Display */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs sm:text-sm text-gray-300 font-mono">
              {formatTime(currentTime)}
            </span>
            <span className="text-xs text-gray-500 hidden sm:inline">• {formatDate(currentTime)}</span>
          </div>
        </header>

        {/* Search Bar */}
        <div className={`max-w-md mx-auto mb-8 sm:mb-10 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Cari alat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Kosongkan carian"
                  className="absolute right-1 flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] text-gray-400 hover:text-white active:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`flex justify-center gap-4 sm:gap-8 mb-8 sm:mb-10 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">{tools.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Alat</div>
          </div>
          <div className="w-px h-12 bg-white/10"></div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-400">Online</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Status</div>
          </div>
          <div className="w-px h-12 bg-white/10"></div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-400">24/7</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Uptime</div>
          </div>
        </div>

        {/* DuckDuckGo Search Section */}
        <div className={`max-w-2xl mx-auto mb-8 sm:mb-12 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 rounded-3xl blur-2xl"></div>
            
            <div className="relative p-5 sm:p-6 bg-white/[0.03] border border-white/[0.08] rounded-3xl backdrop-blur-sm">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <span className="text-lg">🦆</span>
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-white">Carian DuckDuckGo</h2>
                  <p className="text-xs text-gray-500">Cari apa sahaja di internet</p>
                </div>
              </div>

              {/* Search Form */}
              <form onSubmit={handleDuckSearch} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-4 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Taip carian anda di sini..."
                      value={duckQuery}
                      onChange={(e) => setDuckQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex-shrink-0 px-5 py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 rounded-2xl text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span className="hidden sm:inline">Cari</span>
                  </button>
                </div>
              </form>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-2 mt-4">
                {quickSearches.map((qs, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDuckQuery(qs.query)
                      window.open(`https://duckduckgo.com/?q=${encodeURIComponent(qs.query)}`, '_blank')
                    }}
                    className="min-h-[44px] px-4 py-2.5 text-xs sm:text-sm rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 active:bg-white/15 hover:border-white/20 transition-all duration-200"
                  >
                    {qs.icon} {qs.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tool Cards Section Title */}
        <div className={`text-center mb-6 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Alat Tersedia</span>
          </div>
        </div>

        {/* Tool Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTools.map((tool, index) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative block transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Card */}
              <div className="relative h-full p-5 sm:p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.15] active:bg-white/[0.08] active:border-white/[0.2] active:scale-[0.98] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
                {/* Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full bg-gradient-to-r ${tool.gradient} bg-opacity-20 text-white/80`}>
                    {tool.tag}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{tool.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-white transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {tool.description}
                </p>

                {/* URL preview */}
                <div className="mt-4 pt-3 border-t border-white/5">
                  <p className="text-xs text-gray-600 font-mono truncate group-hover:text-gray-400 transition-colors">
                    {new URL(tool.url).hostname}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* No results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl mb-4 block">🔍</span>
            <p className="text-gray-400">Tiada alat ditemui untuk "{searchQuery}"</p>
          </div>
        )}

        {/* Footer */}
        <footer className={`mt-12 sm:mt-16 text-center transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="text-xs text-gray-500">Powered by</span>
            <span className="text-xs font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">mykira</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-400">2026</span>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            © 2026 MyGate Dynamic Gateway
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
