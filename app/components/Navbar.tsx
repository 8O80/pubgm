'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MenuIcon, X, Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const languages = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

const translations = {
  ar: {
    events: 'الأحداث',
    shop: 'المتجر',
    leaderboard: 'مابات واو',
    login: 'تسجيل الدخول',
  },
  en: {
    events: 'Events',
    shop: 'Soon',
    leaderboard: 'Wow maps',
    login: 'Login',
  },
  fr: {
    events: 'Événements',
    shop: 'Soon',
    leaderboard: 'Wow Maps',
    login: 'Connexion',
  },
}

export default function Navbar() {
  const { lang, setLang } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-[#FFC107]/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFC107] to-[#FF9800] tracking-wider"
          >
            PUBG MOBILE Names 2025
          </motion.div>
          <div className="hidden md:flex space-x-4">
            {['events', 'shop', 'leaderboard'].map((item) => (
              <motion.div key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" className="text-white hover:text-[#FFC107] transition-all duration-300 bg-white/10 backdrop-blur-sm rounded-full px-6">
                  {translations[lang][item]}
                </Button>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border-[#FFC107] text-[#FFC107] hover:bg-[#FFC107] hover:text-black transition-all duration-300 rounded-full px-6">
                {translations[lang].login}
              </Button>
            </motion.div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" className="p-2 bg-white/10 backdrop-blur-sm rounded-full">
                    <Globe className="w-5 h-5 text-[#FFC107]" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/80 backdrop-blur-md border border-[#FFC107]/20 rounded-xl">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => setLang(language.code)}
                    className="text-white hover:bg-[#FFC107]/20 hover:text-[#FFC107] cursor-pointer rounded-lg transition-all duration-300"
                  >
                    <span className="mr-2">{language.flag}</span>
                    {language.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" className="md:hidden text-[#FFC107] p-2 bg-white/10 backdrop-blur-sm rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <MenuIcon />}
              </Button>
            </motion.div>
          </div>
        </div>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4"
          >
            {['events', 'shop', 'leaderboard'].map((item) => (
              <Button key={item} variant="ghost" className="w-full text-left text-white hover:text-[#FFC107] transition-all duration-300 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-2">
                {translations[lang][item]}
              </Button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

