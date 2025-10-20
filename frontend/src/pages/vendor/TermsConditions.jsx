import React, { useState } from 'react'
import Button from '../../components/ui/Button'
import { CheckCircle, X, FileText, Shield, AlertTriangle } from 'lucide-react'

const TermsConditions = ({ onAccept, onCancel }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)

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

  return (
    <div className="">
      <div className=" max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 font-Montserrat">
              Vendor Terms & Conditions
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div 
          className="flex-1 overflow-y-auto p-6 space-y-6"
          onScroll={handleScroll}
        >
          {/* Introduction */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Welcome to Campus Vendor Platform
            </h3>
            <p className="text-gray-700 leading-relaxed">
              By registering as a vendor on our platform, you agree to comply with the following terms and conditions. 
              Please read these terms carefully as they govern your relationship with Campus Vendor and outline your 
              rights and responsibilities as a vendor partner.
            </p>
          </section>

          {/* Vendor Requirements */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">1. Vendor Requirements</h3>
            <div className="space-y-2 text-gray-700">
              <p>• You must be legally authorized to conduct business in your jurisdiction</p>
              <p>• All products and services must comply with local health and safety regulations</p>
              <p>• You must maintain valid business licenses and permits</p>
              <p>• Food vendors must have current food safety certifications</p>
              <p>• You agree to provide accurate and up-to-date business information</p>
            </div>
          </section>

          {/* Product Standards */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">2. Product Standards & Quality</h3>
            <div className="space-y-2 text-gray-700">
              <p>• All products must meet campus quality standards</p>
              <p>• Product descriptions must be accurate and not misleading</p>
              <p>• Pricing must be clearly displayed and honored</p>
              <p>• You are responsible for product quality and customer satisfaction</p>
              <p>• Expired or damaged products must be removed immediately</p>
            </div>
          </section>

          {/* Financial Terms */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">3. Financial Terms</h3>
            <div className="space-y-2 text-gray-700">
              <p>• Platform commission rates will be clearly communicated</p>
              <p>• Payments will be processed according to agreed schedules</p>
              <p>• You are responsible for your own tax obligations</p>
              <p>• Refund policies must be clearly stated to customers</p>
              <p>• Any disputes regarding payments will be handled through our resolution process</p>
            </div>
          </section>

          {/* Platform Rules */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">4. Platform Usage Rules</h3>
            <div className="space-y-2 text-gray-700">
              <p>• Maintain professional conduct with all customers and staff</p>
              <p>• Respond to customer inquiries in a timely manner</p>
              <p>• Keep your vendor profile and product listings updated</p>
              <p>• Report any technical issues or concerns promptly</p>
              <p>• Comply with campus operating hours and regulations</p>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              5. Prohibited Activities
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>• Sale of prohibited items (alcohol, tobacco, etc.)</p>
              <p>• Fraudulent or deceptive business practices</p>
              <p>• Harassment or discrimination against customers or staff</p>
              <p>• Violation of campus policies or local laws</p>
              <p>• Unauthorized use of campus branding or logos</p>
            </div>
          </section>

          {/* Liability & Insurance */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">6. Liability & Insurance</h3>
            <div className="space-y-2 text-gray-700">
              <p>• Vendors are responsible for their own liability insurance</p>
              <p>• Campus Vendor is not liable for vendor-related incidents</p>
              <p>• You indemnify the platform against claims related to your products/services</p>
              <p>• Report any incidents or accidents immediately</p>
            </div>
          </section>

          {/* Termination */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">7. Account Termination</h3>
            <div className="space-y-2 text-gray-700">
              <p>• Either party may terminate the agreement with 30 days notice</p>
              <p>• Immediate termination may occur for violations of these terms</p>
              <p>• Outstanding payments will be settled upon termination</p>
              <p>• You must remove all products and materials upon termination</p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">8. Contact & Support</h3>
            <div className="space-y-2 text-gray-700">
              <p>• For questions about these terms, contact: support@campusvendor.com</p>
              <p>• Business support hotline: 1-800-CAMPUS-V</p>
              <p>• Emergency contact: security@campus.edu</p>
            </div>
          </section>

          {/* Last Updated */}
          <section className="border-t pt-4 mt-6">
            <p className="text-sm text-gray-500">
              Last updated: October 20, 2025
            </p>
            <p className="text-sm text-gray-500">
              By accepting these terms, you acknowledge that you have read, understood, and agree to be bound by these conditions.
            </p>
          </section>
        </div>

        {/* Footer with Accept/Cancel */}
        <div className="border-t border-gray-200 p-6 space-y-4">
          {/* Scroll Indicator */}
          {!hasScrolledToBottom && (
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">Please scroll through the entire document to continue</span>
            </div>
          )}

          {/* Acceptance Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="accept-terms"
              checked={isAccepted}
              onChange={handleAcceptChange}
              disabled={!hasScrolledToBottom}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
            />
            <label 
              htmlFor="accept-terms" 
              className={`text-sm leading-relaxed ${!hasScrolledToBottom ? 'text-gray-400' : 'text-gray-700'}`}
            >
              I have read and agree to the Terms and Conditions. I understand my responsibilities as a vendor 
              and agree to comply with all platform rules and regulations.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onCancel}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAccept}
              disabled={!isAccepted || !hasScrolledToBottom}
              Icon={CheckCircle}
              iconType="icon-left"
              className="px-6"
            >
              Accept & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsConditions