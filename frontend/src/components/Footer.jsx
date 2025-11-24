// ...existing code...
import { images } from '@/assets/assets'
import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-900/10 text-gray-700 border-t border-gray-200 mt-10 px-2">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center md:items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
            <div className='flex items-center gap-x-2'>
                <img src={images.logo} className="h-6 md:h-7 w-6 md:w-7 object-contain" />
          <span className="text-lg font-Montserrat font-extrabold text-blue-700">Campus Vendor</span>
            </div>
          <span className="text-sm text-gray-600">Campus life. Simplified.</span>
        </div>

        <nav aria-label="Footer navigation" className="flex gap-6 flex-wrap justify-center text-gray-600 md:flex-1">
          <a className="text-sm hover:text-yellow-400 transition" href="/">Home</a>
          <a className="text-sm hover:text-yellow-400 transition" href="/vendors">Vendors</a>
          <a className="text-sm hover:text-yellow-400 transition" href="/about">About</a>
          <a className="text-sm hover:text-yellow-400 transition" href="/contact">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-cv-blue transition">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-cv-blue transition">
              <FaInstagram />
            </a>
            <a href="#" aria-label="GitHub" className="text-gray-600 hover:text-cv-blue transition">
              <FaFacebook />
            </a>
          </div>
        </div>
        
      </div>
          <div className="text-xs text-gray-600 text-center pt-1 mb-1 border-t border-gray-300">© {year} CampusVendor</div>

    </footer>
  )
}

export default Footer
// ...existing code...