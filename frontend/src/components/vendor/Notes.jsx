import React from 'react'
import { BlurFade } from '../ui/blur-fade'
import Button from '../ui/custom/Button'
import { CheckCircle, Clock, Mail, FileText, ArrowRight } from 'lucide-react'
import { images } from '@/assets/assets'
import {  useNavigate } from 'react-router-dom'

const Notes = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden font-Montserrat">
      {/* Background Illustrations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-25 animate-bounce delay-500"></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-purple-100 to-transparent rounded-full blur-3xl opacity-30"></div>
        
        {/* Company logo as watermark */}
        <div className="absolute bottom-10 right-10 opacity-5">
          <img src={images.logo} alt="CV Logo" className="w-48 h-48 object-contain" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="max-w-2xl w-full">
          <BlurFade delay={0.2} duration={0.6}>
            {/* Success Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Mail className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.4} duration={0.6}>
            {/* Main Message */}
            <div className="text-center ">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                Submission Successful! 🎉
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Your vendor information has been successfully submitted
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.6} duration={0.6}>
            {/* Status Card */}
            <div className=" border border-white/50 p-5 mb-6">
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-3 bg-blue-50 px-6 py-3 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-400 animate-spin" />
                  <span className="text-blue-700 font-semibold">Pending Admin Approval</span>
                </div>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.8} duration={0.6}>
            {/* Additional Info */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-4 text-white text-center shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Expected Timeline</h3>
              <p className="mb-4 opacity-90">
                Most applications are reviewed within <strong className='text-yellow-200'>2-3 business days</strong>. 
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={1.0} duration={0.6}>
            {/* Action Button */}
            <div className="flex justify-center mt-8">
              <Button 
                variant="secondary" 
                Icon={ArrowRight}
                iconType="icon-right"
                onClick={()=> navigate("/" , { replace: true })}
                className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Return to Home
              </Button>
            </div>
          </BlurFade>

          <BlurFade delay={1.2} duration={0.6}>
            {/* Support Info */}
            <div className="text-center mt-8 text-gray-500">
              <p className="text-sm">
                Questions? Contact our support team at{' '}
                <a href="mailto:support@campusvendor.com" className="text-blue-600 hover:underline">
                  support@campusvendor.com
                </a>
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  )
}

export default Notes