'use client'

import { useState, useEffect } from 'react'
import './AdminTextEditor.css'

interface AdminTextEditorProps {
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  type?: 'text' | 'textarea' | 'heading'
  maxLength?: number
  helperText?: string
}

export default function AdminTextEditor({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  maxLength,
  helperText
}: AdminTextEditorProps) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (newValue: string) => {
    if (maxLength && newValue.length > maxLength) return
    setLocalValue(newValue)
    onChange(newValue)
  }

  const handleBlur = () => {
    if (localValue !== value) {
      onBlur?.()
    }
  }

  return (
    <div className="admin-text-editor">
      <div className="admin-text-editor__header">
        <label className="admin-text-editor__label">{label}</label>
        {maxLength && (
          <span className="admin-text-editor__count">
            {localValue.length}/{maxLength}
          </span>
        )}
      </div>
      
      {type === 'textarea' ? (
        <textarea
          className="admin-text-editor__textarea"
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          rows={4}
        />
      ) : type === 'heading' ? (
        <input
          type="text"
          className="admin-text-editor__input admin-text-editor__input--heading"
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          className="admin-text-editor__input"
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
      )}
      
      {helperText && (
        <span className="admin-text-editor__helper">{helperText}</span>
      )}
    </div>
  )
}