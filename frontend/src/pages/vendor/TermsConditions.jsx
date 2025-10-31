import React, { useState } from 'react'
import Button from "@/components/ui/custom/Button";
import { CheckCircle, X, FileText, Shield, AlertTriangle, Users, DollarSign, Clock, Phone, Mail, Building, Star, Lock } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const TermsConditions = ({ onAccept, onCancel }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setHasScrolledToBottom(true)
    }
  }

  const handleAcceptChange = (e) => {
    setIsAccepted(e.target.checked)
  }

  const handleAccept = () => {
    if (isAccepted && hasScrolledToBottom) {
      onAccept()
    }
  }

  const sections = [
    { icon: Shield, title: "Welcome to Campus Vendor Platform", color: "text-blue-600" },
    { icon: Users, title: "1. Vendor Requirements", color: "text-blue-500" },
    { icon: Star, title: "2. Product Standards & Quality", color: "text-yellow-500" },
    { icon: DollarSign, title: "3. Financial Terms", color: "text-green-500" },
    { icon: Building, title: "4. Platform Usage Rules", color: "text-purple-500" },
    { icon: AlertTriangle, title: "5. Prohibited Activities", color: "text-red-500" },
    { icon: Lock, title: "6. Liability & Insurance", color: "text-indigo-500" },
    { icon: Clock, title: "7. Account Termination", color: "text-orange-500" },
    { icon: Phone, title: "8. Contact & Support", color: "text-teal-500" }
  ]

  return (
    <div className="min-h-screen">
      <div className="max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-blue-900 to-blue-600 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 text-6xl">📋</div>
            <div className="absolute bottom-4 left-4 text-4xl">⚖️</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-5">🤝</div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-Montserrat">
                  Vendor Terms & Conditions
                </h2>
                <p className="text-blue-100 text-sm">Campus Vendor Platform Agreement</p>
              </div>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCancel}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-yellow-50 border-b">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${hasScrolledToBottom ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className={hasScrolledToBottom ? 'text-green-600' : 'text-gray-500'}>
                Document Read
              </span>
            </div>
            <div className="w-px h-4 bg-gray-300 mx-2" />
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isAccepted ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className={isAccepted ? 'text-green-600' : 'text-gray-500'}>
                Terms Accepted
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div 
          className="flex-1 overflow-y-auto p-6 space-y-8"
          onScroll={handleScroll}
        >
          {/* Introduction */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Welcome to Campus Vendor Platform
              </h3>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <p className="text-gray-700 leading-relaxed">
                By registering as a vendor on our platform, you agree to comply with the following terms and conditions. 
                Please read these terms carefully as they govern your relationship with Campus Vendor and outline your 
                rights and responsibilities as a vendor partner.
              </p>
            </div>
          </motion.section>

          {/* Vendor Requirements */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center text-white">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">1. Vendor Requirements</h3>
            </div>
            <div className="grid gap-3">
              {[
                "You must be legally authorized to conduct business in your jurisdiction",
                "All products and services must comply with local health and safety regulations",
                "You must maintain valid business licenses and permits",
                "Food vendors must have current food safety certifications",
                "You agree to provide accurate and up-to-date business information"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Product Standards */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-white">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">2. Product Standards & Quality</h3>
            </div>
            <div className="grid gap-3">
              {[
                "All products must meet campus quality standards",
                "Product descriptions must be accurate and not misleading",
                "Pricing must be clearly displayed and honored",
                "You are responsible for product quality and customer satisfaction",
                "Expired or damaged products must be removed immediately"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Financial Terms */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">3. Financial Terms</h3>
            </div>
            <div className="grid gap-3">
              {[
                "Platform commission rates will be clearly communicated",
                "Payments will be processed according to agreed schedules",
                "You are responsible for your own tax obligations",
                "Refund policies must be clearly stated to customers",
                "Any disputes regarding payments will be handled through our resolution process"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Platform Rules */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">4. Platform Usage Rules</h3>
            </div>
            <div className="grid gap-3">
              {[
                "Maintain professional conduct with all customers and staff",
                "Respond to customer inquiries in a timely manner",
                "Keep your vendor profile and product listings updated",
                "Report any technical issues or concerns promptly",
                "Comply with campus operating hours and regulations"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Prohibited Activities */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">5. Prohibited Activities</h3>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border border-red-200">
              <div className="grid gap-3">
                {[
                  "Sale of prohibited items (alcohol, tobacco, etc.)",
                  "Fraudulent or deceptive business practices",
                  "Harassment or discrimination against customers or staff",
                  "Violation of campus policies or local laws",
                  "Unauthorized use of campus branding or logos"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <p className="text-gray-700">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Remaining sections with similar styling... */}
          {/* Liability & Insurance */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">6. Liability & Insurance</h3>
            </div>
            <div className="grid gap-3">
              {[
                "Vendors are responsible for their own liability insurance",
                "Campus Vendor is not liable for vendor-related incidents",
                "You indemnify the platform against claims related to your products/services",
                "Report any incidents or accidents immediately"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="flex items-start gap-3 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Termination */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">7. Account Termination</h3>
            </div>
            <div className="grid gap-3">
              {[
                "Either party may terminate the agreement with 30 days notice",
                "Immediate termination may occur for violations of these terms",
                "Outstanding payments will be settled upon termination",
                "You must remove all products and materials upon termination"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="flex items-start gap-3 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">8. Contact & Support</h3>
            </div>
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200">
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700">support@campusvendor.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700">1-800-CAMPUS-V</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">Emergency: security@campus.edu</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Last Updated */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="border-t pt-6 mt-8 bg-gray-50 p-6 rounded-xl"
          >
            <p className="text-sm text-gray-500 mb-2">
              Last updated: October 24, 2025
            </p>
            <p className="text-sm text-gray-600">
              By accepting these terms, you acknowledge that you have read, understood, and agree to be bound by these conditions.
            </p>
          </motion.section>
        </div>

        {/* Footer with Accept/Cancel */}
        <div className="border-t border-gray-200 p-6 space-y-4 bg-gradient-to-r from-gray-50 to-blue-50">

          {/* Acceptance Checkbox */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // transition={{ delay: 1 }}
            className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200"
          >
            <input
              type="checkbox"
              id="accept-terms"
              checked={isAccepted}
              onChange={handleAcceptChange}
              disabled={!hasScrolledToBottom}
              className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
            />
            <label 
              htmlFor="accept-terms" 
              className={`text-sm leading-relaxed ${!hasScrolledToBottom ? 'text-gray-400' : 'text-gray-700'}`}
            >
              <span className="font-medium">I have read and agree to the Terms and Conditions.</span>
              <br />
              I understand my responsibilities as a vendor and agree to comply with all platform rules and regulations.
            </label>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onCancel}
              className="px-8"
            >
              Cancel
            </Button>
            <motion.div
              whileHover={{ scale: isAccepted && hasScrolledToBottom ? 1.02 : 1 }}
              whileTap={{ scale: isAccepted && hasScrolledToBottom ? 0.98 : 1 }}
            >
              <Button
                variant="primary"
                type={"submit"}
                onClick={handleAccept}
                disabled={!isAccepted || !hasScrolledToBottom}
                Icon={CheckCircle}
                iconType="icon-left"
                className="px-8"
              >
                Accept & Continue
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsConditions