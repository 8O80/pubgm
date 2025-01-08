'use client'

import { useCountdown } from '../hooks/useCountdown'
import { useLanguage } from '../contexts/LanguageContext'
import { motion } from 'framer-motion'

const translations = {
  ar: {
    nextSeason: 'يبدأ الموسم القادم في',
    days: 'أيام',
    hours: 'ساعات',
    minutes: 'دقائق',
    seconds: 'ثواني',
  },
  en: {
    nextSeason: 'Next Season Starts In',
    days: 'days',
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',
  },
  fr: {
    nextSeason: 'La Prochaine Saison Commence Dans',
    days: 'jours',
    hours: 'heures',
    minutes: 'minutes',
    seconds: 'secondes',
  },
}

export default function Countdown() {
  const targetDate = new Date('2025-01-15T00:00:00Z')
  const timeLeft = useCountdown(targetDate)
  const { lang } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12 bg-black/30 backdrop-blur-md"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FFC107] to-[#FF9800]">
          {translations[lang].nextSeason}
        </h2>
        <div className="flex justify-center space-x-4">
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <motion.div
              key={unit}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg w-32 border border-[#FFC107]/20"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="text-5xl font-bold text-[#FFC107] mb-2 text-center"
              >
                {value.toString().padStart(2, '0')}
              </motion.div>
              <div className="text-sm uppercase text-gray-300 text-center">{translations[lang][unit]}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

