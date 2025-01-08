'use client'

import { useState } from 'react'
import Navbar from './components/Navbar'
import MainContent from './components/MainContent'
import Countdown from './components/Countdown'
import Footer from './components/Footer'
import { LanguageProvider } from './contexts/LanguageContext'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <LanguageProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-[#2C2C2C] text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <MainContent />
          </main>
          <Countdown />
          <Footer />
        </div>
      </motion.div>
    </LanguageProvider>
  )
}

