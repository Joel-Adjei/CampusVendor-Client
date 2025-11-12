import React, { useState} from 'react'

const Switch = ({
  checked,
  onChange,
  defaultChecked = false,
  disabled = false,
  size = "medium",
  variant = "primary",
  label,
  description,
  className = "",
  id
}) => {
  // Determine if this is a controlled or uncontrolled component
  const isControlled = checked !== undefined
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  
  // Use controlled value if provided, otherwise use internal state
  const isChecked = isControlled ? checked : internalChecked

  const handleToggle = () => {
    if (disabled) return
    
    const newValue = !isChecked
    
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalChecked(newValue)
    }
    
    // Always call onChange if provided
    if (onChange) {
      onChange(newValue)
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return {
          switch: "w-10 h-5",
          thumb: "w-4 h-4",
          translate: "translate-x-5"
        }
      case "large":
        return {
          switch: "w-16 h-8",
          thumb: "w-7 h-7",
          translate: "translate-x-8"
        }
      default: // medium
        return {
          switch: "w-12 h-6",
          thumb: "w-5 h-5",
          translate: "translate-x-6"
        }
    }
  }

  const getVariantClasses = () => {
    if (disabled) {
      return {
        background: isChecked ? "bg-gray-300" : "bg-gray-200",
        thumb: "bg-gray-400"
      }
    }

    switch (variant) {
      case "secondary":
        return {
          background: isChecked 
            ? "bg-gradient-to-r from-yellow-400 to-orange-500" 
            : "bg-gray-300",
          thumb: "bg-white shadow-lg"
        }
      case "success":
        return {
          background: isChecked 
            ? "bg-gradient-to-r from-green-500 to-green-600" 
            : "bg-gray-300",
          thumb: "bg-white shadow-lg"
        }
      case "warning":
        return {
          background: isChecked 
            ? "bg-gradient-to-r from-yellow-500 to-amber-500" 
            : "bg-gray-300",
          thumb: "bg-white shadow-lg"
        }
      default: // primary
        return {
          background: isChecked 
            ? "bg-gradient-to-r from-blue-600 to-blue-400" 
            : "bg-gray-300",
          thumb: "bg-white shadow-lg"
        }
    }
  }

  const sizeClasses = getSizeClasses()
  const variantClasses = getVariantClasses()

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Hidden Input for Accessibility */}
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={handleToggle}
          disabled={disabled}
          className="sr-only"
          aria-describedby={description ? `${id}-description` : undefined}
        />
        
        {/* Switch Background */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={`
            ${sizeClasses.switch}
            ${variantClasses.background}
            relative inline-flex items-center rounded-full 
            transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-4 focus:ring-blue-200
            ${disabled 
              ? 'cursor-not-allowed opacity-50' 
              : 'cursor-pointer hover:shadow-lg transform hover:scale-105'
            }
          `}
          role="switch"
          aria-checked={isChecked}
          aria-labelledby={label ? `${id}-label` : undefined}
        >
          {/* Switch Thumb */}
          <span
            className={`
              ${sizeClasses.thumb}
              ${variantClasses.thumb}
              ${isChecked ? sizeClasses.translate : 'translate-x-0.5'}
              inline-block rounded-full
              transition-all duration-300 ease-in-out
              transform
            `}
          >
            {/* Inner glow effect */}
            <span className={`
              absolute inset-0 rounded-full
              ${isChecked && !disabled ? 'bg-gradient-to-br from-white/20 to-transparent' : ''}
            `} />
          </span>
        </button>

        {/* Active State Ring */}
        {isChecked && !disabled && (
          <div className={`
            absolute inset-0 rounded-full
            ${variant === 'primary' ? 'bg-blue-400' : 
              variant === 'secondary' ? 'bg-yellow-400' :
              variant === 'success' ? 'bg-green-400' :
              'bg-amber-400'}
            opacity-20 scale-110 animate-pulse
          `} />
        )}
      </div>

      {/* Label and Description */}
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              id={`${id}-label`}
              htmlFor={id}
              className={`
                text-sm font-medium text-gray-900
                ${disabled ? 'text-gray-400' : 'cursor-pointer'}
              `}
            >
              {label}
            </label>
          )}
          {description && (
            <p
              id={`${id}-description`}
              className={`text-xs ${disabled ? 'text-gray-400' : 'text-gray-500'}`}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default Switch