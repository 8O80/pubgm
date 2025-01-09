'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from '../contexts/LanguageContext'
import { X, HelpCircle } from 'lucide-react'
import DiscordButton from './DiscordButton'

const translations = {
  ar: {
    joinBattle: 'اكتشف الاسم الذي تريده ان كان متاح',
    enterName: 'أدخل الاسم الذي تبحث عنه في اللعبة',
    selectMap: 'اختر اخر سيزون دخل الاعب له ( ملاحظه اضغط على المساعده )',
    startJourney: 'وضع تنبيه',
    selectSeason: 'اختر اخر سيزون دخل الاعب له ( ملاحظه اضغط على المساعده )',
    seasonStatus: 'حالة الاسم',
    seasonDuration: 'اخر مرة تم دخول الحساب من',
    helpTitle: 'مساعدة',
    helpDescription: 'هذه الصور توضح كيفية العثور على آخر موسم لعب فيه اللاعب',
    closePopup: 'إغلاق',
    statusGood: 'متاح',
    statusBad: 'غير متاح',
    discordPopupTitle: 'انضم إلى مجتمعنا على ديسكورد',
    discordPopupDescription: 'قبل 10 دقائق من التحديث، سنرسل إعلانًا على ديسكورد. انضم إلينا الآن لتصلك الإشعارات!',
  
  },
  en: {
    joinBattle: 'Check if your desired name is available',
    enterName: 'Enter the name you are searching for in the game',
    selectMap: 'Choose the last season the player entered (note: click on help)',
    startJourney: 'Set an alert',
    selectSeason: 'Choose the last season the player entered (note: click on help)',
    seasonStatus: 'Name Status',
    seasonDuration: 'Last login time for the account',
    helpTitle: 'Help',
    helpDescription: 'These images show how to find the last season a player played',
    closePopup: 'Close',
    statusGood: 'Available',
    statusBad: 'Not Available',
    discordPopupTitle: 'Join Our Discord Community',
    discordPopupDescription: 'Before 10 minutes, we will send an announcement on our Discord. Join us now to stay notified!',
  

  },
  fr: {
    joinBattle: 'Vérifiez si le nom souhaité est disponible',
    enterName: 'Entrez le nom que vous recherchez dans le jeu',
    selectMap: 'Choisissez la dernière saison à laquelle le joueur a participé (note : cliquez sur aide)',
    startJourney: 'Définir une alerte',
    selectSeason: 'Choisissez la dernière saison à laquelle le joueur a participé (note : cliquez sur aide)',
    seasonStatus: 'Statut du Nom',
    seasonDuration: 'Dernière connexion du compte',
    helpTitle: 'Aide',
    helpDescription: 'Ces images montrent comment trouver la dernière saison jouée par un joueur',
    closePopup: 'Fermer',
    statusGood: 'Disponible',
    statusBad: 'Non Disponible',
    discordPopupTitle: 'Rejoignez Notre Communauté Discord',
    discordPopupDescription: 'Dans 10 minutes, nous enverrons une annonce sur notre Discord. Rejoignez-nous maintenant pour être notifié !',

  },
}


const seasons = [
  { "name": "S1", "start": "2018-03-19", "end": "2018-05-13", "status": "good", "year": 2018 },
  { "name": "S2", "start": "2018-05-14", "end": "2018-08-18", "status": "good", "year": 2018 },
  { "name": "S3", "start": "2018-08-19", "end": "2018-11-18", "status": "good", "year": 2018 },
  { "name": "S4", "start": "2018-11-19", "end": "2019-01-18", "status": "good", "year": 2019 },
  { "name": "S5", "start": "2019-01-19", "end": "2019-03-18", "status": "good", "year": 2019 },
  { "name": "S6", "start": "2019-03-19", "end": "2019-05-18", "status": "good", "year": 2019 },
  { "name": "S7", "start": "2019-05-19", "end": "2019-07-18", "status": "good", "year": 2019 },
  { "name": "S8", "start": "2019-07-19", "end": "2019-09-18", "status": "good", "year": 2019 },
  { "name": "S9", "start": "2019-09-19", "end": "2019-11-18", "status": "good", "year": 2019 },
  { "name": "S10", "start": "2019-11-19", "end": "2020-01-18", "status": "good", "year": 2020 },
  { "name": "S11", "start": "2020-01-19", "end": "2020-03-18", "status": "good", "year": 2020 },
  { "name": "S12", "start": "2020-03-19", "end": "2020-05-18", "status": "good", "year": 2020 },
  { "name": "S13", "start": "2020-05-19", "end": "2020-07-18", "status": "good", "year": 2020 },
  { "name": "S14", "start": "2020-07-19", "end": "2020-09-18", "status": "good", "year": 2020 },
  { "name": "S15", "start": "2020-09-19", "end": "2020-11-18", "status": "good", "year": 2020 },
  { "name": "S16", "start": "2020-11-19", "end": "2021-01-18", "status": "good", "year": 2021 },
  { "name": "S17", "start": "2021-01-19", "end": "2021-03-18", "status": "good", "year": 2021 },
  { "name": "S18", "start": "2021-03-19", "end": "2021-05-18", "status": "good", "year": 2021 },
  { "name": "S19", "start": "2021-05-19", "end": "2021-07-18", "status": "good", "year": 2021 },
  { "name": "C1S1", "start": "2021-07-19", "end": "2021-09-18", "status": "good", "year": 2021 },
  { "name": "C1S2", "start": "2021-09-19", "end": "2021-11-18", "status": "good", "year": 2021 },
  { "name": "C1S3", "start": "2021-11-19", "end": "2022-01-18", "status": "good", "year": 2022 },
  { "name": "C2S4", "start": "2022-01-19", "end": "2022-03-18", "status": "bad", "year": 2022 },
  { "name": "C2S5", "start": "2022-03-19", "end": "2022-05-18", "status": "bad", "year": 2022 },
  { "name": "C2S6", "start": "2022-05-19", "end": "2022-07-18", "status": "bad", "year": 2022 },
  { "name": "C3S7", "start": "2022-07-19", "end": "2022-09-18", "status": "bad", "year": 2022 },
  { "name": "C3S8", "start": "2022-09-19", "end": "2022-11-18", "status": "bad", "year": 2022 },
  { "name": "C3S9", "start": "2022-11-19", "end": "2023-01-18", "status": "bad", "year": 2023 },
  { "name": "C4S10", "start": "2023-01-19", "end": "2023-03-18", "status": "bad", "year": 2023 },
  { "name": "C4S11", "start": "2023-03-19", "end": "2023-05-18", "status": "bad", "year": 2023 },
  { "name": "C4S12", "start": "2023-05-19", "end": "2023-07-18", "status": "bad", "year": 2023 },
  { "name": "C5S13", "start": "2023-07-19", "end": "2023-09-18", "status": "bad", "year": 2023 },
  { "name": "C5S14", "start": "2023-09-19", "end": "2023-11-18", "status": "bad", "year": 2023 },
  { "name": "C5S15", "start": "2023-11-19", "end": "2024-01-18", "status": "bad", "year": 2023 },
  { "name": "C6S16", "start": "2024-01-19", "end": "2024-03-18", "status": "bad", "year": 2024 },
  { "name": "C6S17", "start": "2024-03-19", "end": "2024-05-18", "status": "bad", "year": 2024 },
  { "name": "C6S18", "start": "2024-05-19", "end": "2024-07-18", "status": "bad", "year": 2024 },
  { "name": "C7S19", "start": "2024-07-19", "end": "2024-09-18", "status": "bad", "year": 2024 },
  { "name": "C7S20", "start": "2024-09-19", "end": "2024-11-18", "status": "bad", "year": 2024 },
  { "name": "C7S21", "start": "2024-11-19", "end": "2025-01-18", "status": "bad", "year": 2024 }
]


function HelpPopup({ isOpen, onClose, lang }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-black/80 p-6 rounded-xl border border-[#FFC107]/20 max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#FFC107]">{translations[lang].helpTitle}</h2>
          <Button variant="ghost" onClick={onClose} className="text-[#FFC107] hover:text-[#FFD54F]">
            <X size={24} />
          </Button>
        </div>
        <p className="text-white mb-4">{translations[lang].helpDescription}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative w-full h-48 md:h-64">
            <Image src="/tem1.gif" alt="Help Image 1" layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
          <div className="relative w-full h-48 md:h-64">
            <Image src="/tem2.gif" alt="Help Image 2" layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DiscordPopup({ isOpen, onClose, lang }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-black/80 p-6 rounded-xl border border-[#FFC107]/20 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#FFC107]">{translations[lang].discordPopupTitle}</h2>
          <Button variant="ghost" onClick={onClose} className="text-[#FFC107] hover:text-[#FFD54F]">
            <X size={24} />
          </Button>
        </div>
        <p className="text-white mb-6">{translations[lang].discordPopupDescription}</p>
        <div className="flex justify-center">
          <DiscordButton />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MainContent() {
  const [name, setName] = useState('')
  const [showSelect, setShowSelect] = useState(false)
  const [selectedSeason, setSelectedSeason] = useState('')
  const [seasonInfo, setSeasonInfo] = useState<{ status: string; dateRange: string } | null>(null)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isDiscordPopupOpen, setIsDiscordPopupOpen] = useState(false)
  const { lang } = useLanguage()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setShowSelect(e.target.value.length > 0)
  }

  useEffect(() => {
    if (selectedSeason) {
      const season = seasons.find(s => s.name === selectedSeason)
      if (season) {
        setSeasonInfo({
          status: season.status,
          dateRange: `${season.start} to ${season.end}`
        })
      }
    }
  }, [selectedSeason])

  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 space-y-6"
      >
        <Card className="bg-black/30 backdrop-blur-md border-[#FFC107]/20 rounded-3xl overflow-hidden">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFC107] to-[#FF9800] leading-tight">
              {translations[lang].joinBattle}
            </h2>
            <div className="space-y-4">
              <Input
                placeholder={translations[lang].enterName}
                value={name}
                onChange={handleNameChange}
                className="bg-white/10 border-[#FFC107]/20 text-white placeholder-gray-400 focus:ring-[#FFC107] rounded-full py-6"
              />
              {showSelect && (
                <div className="flex items-center space-x-2">
                  <Select onValueChange={setSelectedSeason}>
                    <SelectTrigger className="w-full bg-white/10 border-[#FFC107]/20 text-white focus:ring-[#FFC107] rounded-full py-6">
                      <SelectValue placeholder={translations[lang].selectSeason} />
                    </SelectTrigger>
                    <SelectContent className="bg-black/80 backdrop-blur-md border-[#FFC107]/20 rounded-xl max-h-[300px] overflow-y-auto">
                      {seasons.map((season) => (
                        <SelectItem key={season.name} value={season.name} className="text-white hover:bg-[#FFC107]/20 rounded-lg">
                          {season.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsHelpOpen(true)}
                    className="bg-white/10 text-[#FFC107] hover:bg-[#FFC107]/20 rounded-full"
                  >
                    <HelpCircle size={24} />
                  </Button>
                </div>
              )}
              {seasonInfo && (
                <div className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-[#FFC107]/20">
                  <p className="text-lg font-semibold mb-2 text-white">
                    {translations[lang].seasonStatus}: <span className={seasonInfo.status === 'good' ? 'text-green-400' : 'text-red-400'}>
                      {translations[lang][seasonInfo.status === 'good' ? 'statusGood' : 'statusBad'].toUpperCase()}
                    </span>
                  </p>
                  <p className="text-sm text-[#FFC107]">
                    {translations[lang].seasonDuration}: {seasonInfo.dateRange}
                  </p>
                </div>
              )}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="w-full bg-gradient-to-r from-[#FFC107] to-[#FF9800] text-black hover:from-[#FFD54F] hover:to-[#FFA726] transition-all duration-300 text-lg font-semibold rounded-full py-6"
                  onClick={() => setIsDiscordPopupOpen(true)}
                >
                  {translations[lang].startJourney}
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 relative"
      >
        <div className="relative w-full h-[500px]">
        <Image
    src="/lray.png"
    alt="Something"
    width={600}
    height={800}
    objectFit="cover"  // or "contain"
  />
        </div>
      </motion.div>
      <AnimatePresence>
        <HelpPopup isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} lang={lang} />
        <DiscordPopup isOpen={isDiscordPopupOpen} onClose={() => setIsDiscordPopupOpen(false)} lang={lang} />
      </AnimatePresence>
    </div>
  )
}

