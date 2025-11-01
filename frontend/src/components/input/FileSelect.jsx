import React, { useState, useRef } from 'react'
import { 
  Upload, 
  X, 
  File, 
  Image, 
  FileText, 
  Video,
  Music,
  Archive,
  AlertCircle,
  Check,
  Plus
} from 'lucide-react'

const FileSelect = ({ 
  onFilesChange, 
  acceptedTypes = "image/*,video/*,.pdf,.doc,.docx", 
  maxFiles = 5,
  maxSizeMB = 10,
  className = "",
  label = "Select Files"
}) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [errors, setErrors] = useState([])
  const fileInputRef = useRef(null)

  const getFileIcon = (fileType) => {
    if (!fileType) return File
    if (fileType.startsWith('image/')) return Image
    if (fileType.startsWith('video/')) return Video
    if (fileType.startsWith('audio/')) return Music
    if (fileType.includes('pdf')) return FileText
    if (fileType.includes('zip') || fileType.includes('rar')) return Archive
    return File
  }

  const getFileTypeColor = (fileType) => {
    if (!fileType) return 'text-gray-600 bg-gray-100'
    if (fileType.startsWith('image/')) return 'text-green-600 bg-green-100'
    if (fileType.startsWith('video/')) return 'text-blue-600 bg-blue-100'
    if (fileType.startsWith('audio/')) return 'text-purple-600 bg-purple-100'
    if (fileType.includes('pdf')) return 'text-red-600 bg-red-100'
    if (fileType.includes('zip') || fileType.includes('rar')) return 'text-yellow-600 bg-yellow-100'
    return 'text-gray-600 bg-gray-100'
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const validateFile = (file) => {
    const errors = []
    
    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      errors.push(`File "${file.name}" is too large. Maximum size is ${maxSizeMB}MB.`)
    }

    // Check file type (basic validation)
    const acceptedTypesArray = acceptedTypes.split(',').map(type => type.trim())
    const isValidType = acceptedTypesArray.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase())
      }
      if (type.includes('*')) {
        const baseType = type.split('/')[0]
        return file.type.startsWith(baseType)
      }
      return file.type === type
    })

    if (!isValidType) {
      errors.push(`File "${file.name}" is not a supported file type.`)
    }

    return errors
  }

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files)
    const newErrors = []

    // Check maximum files limit
    if (selectedFiles.length + fileArray.length > maxFiles) {
      newErrors.push(`You can only select up to ${maxFiles} files.`)
      setErrors(newErrors)
      return
    }

    const validFiles = []
    
    fileArray.forEach(file => {
      const fileErrors = validateFile(file)
      if (fileErrors.length === 0) {
        // Check if file already exists
        const isDuplicate = selectedFiles.some(existingFile => 
          existingFile.name === file.name && existingFile.size === file.size
        )
        
        if (!isDuplicate) {
          const fileWithId = {
            ...file,
            id: Math.random().toString(36).substr(2, 9),
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
          }
          validFiles.push(fileWithId)
        } else {
          newErrors.push(`File "${file.name}" is already selected.`)
        }
      } else {
        newErrors.push(...fileErrors)
      }
    })

    const updatedFiles = [...selectedFiles, ...validFiles]
    setSelectedFiles(updatedFiles)
    setErrors(newErrors)
    
    if (onFilesChange) {
      onFilesChange(updatedFiles)
    }
  }

  const removeFile = (fileId) => {
    const updatedFiles = selectedFiles.filter(file => {
      if (file.id === fileId && file.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return file.id !== fileId
    })
    
    setSelectedFiles(updatedFiles)
    setErrors([])
    
    if (onFilesChange) {
      onFilesChange(updatedFiles)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const clearAllFiles = () => {
    selectedFiles.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })
    setSelectedFiles([])
    setErrors([])
    
    if (onFilesChange) {
      onFilesChange([])
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* File Drop Zone */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-gradient-to-br from-slate-50 via-blue-50 to-yellow-50 hover:border-blue-400 hover:bg-blue-50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full opacity-5 -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 rounded-full opacity-5 translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          {selectedFiles.length === 0 ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-full">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Drop files here or click to browse
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Supports images, videos, documents and more
                </p>
                <p className="text-xs text-gray-500">
                  Maximum {maxFiles} files, {maxSizeMB}MB each
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-gradient-to-br from-green-100 to-blue-100 rounded-full">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-1">
                  {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
                </h3>
                <p className="text-sm text-gray-600">
                  Click to add more files or drag & drop
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mt-4 space-y-2">
          {errors.map((error, index) => (
            <div key={index} className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          ))}
        </div>
      )}

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-900">
              Selected Files ({selectedFiles.length}/{maxFiles})
            </h4>
            <button
              onClick={clearAllFiles}
              className="text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedFiles.map((file) => {
              const FileIcon = getFileIcon(file.type)
              const colorClasses = getFileTypeColor(file.type)
              
              return (
                <div
                  key={file.id}
                  className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3">
                    {/* File Preview or Icon */}
                    <div className="flex-shrink-0">
                      {file.preview ? (
                        <div className="relative">
                          <img
                            src={file.preview}
                            alt={file.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${colorClasses} flex items-center justify-center`}>
                            <FileIcon className="w-3 h-3" />
                          </div>
                        </div>
                      ) : (
                        <div className={`w-12 h-12 rounded-lg ${colorClasses} flex items-center justify-center`}>
                          <FileIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatFileSize(file.size)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFile(file.id)
                      }}
                      className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}

            {/* Add More Files Card */}
            {selectedFiles.length < maxFiles && (
              <div
                onClick={openFileDialog}
                className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 min-h-[80px]"
              >
                <div className="p-2 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-full mb-2">
                  <Plus className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Add More
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FileSelect