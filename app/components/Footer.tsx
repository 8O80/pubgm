import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black/30 backdrop-blur-md text-white py-6 border-t border-[#FFC107]/20"
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm mb-2">
          This website is not associated with PUBG MOBILE.
        </p>
        <p className="text-sm flex items-center justify-center">
          Made with 
          <motion.span
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="inline-block mx-1"
          >
            <Heart className="inline-block w-4 h-4 text-[#FFC107]" />
          </motion.span>
          By RRR
        </p>
      </div>
    </motion.footer>
  )
}

