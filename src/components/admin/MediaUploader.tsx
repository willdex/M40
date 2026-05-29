'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import './MediaUploader.css'

interface MediaUploaderProps {
  value?: string
  onChange: (url: string) => void
  category: 'homepage' | 'heroes' | 'services' | 'icons' | 'videos'
  accept?: string
  preview?: boolean
  label?: string
}

export default function MediaUploader({ 
  value, 
  onChange, 
  category, 
  accept = 'image/*',
  preview = true,
  label = 'Subir archivo'
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File) => {
    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', category)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      onChange(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      uploadFile(file)
    }
  }, [category, onChange])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadFile(file)
    }
  }

  const handleRemove = async () => {
    if (value) {
      try {
        await fetch(`/api/upload?url=${value}`, { method: 'DELETE' })
        onChange('')
      } catch (err) {
        console.error('Delete failed:', err)
      }
    }
  }

  return (
    <div className="media-uploader">
      {label && <label className="media-uploader__label">{label}</label>}
      
      {preview && value && (
        <div className="media-uploader__preview">
          {category === 'videos' ? (
            <video src={value} controls className="media-uploader__video" />
          ) : (
            <Image 
              src={value} 
              alt="Preview" 
              width={200} 
              height={150}
              className="media-uploader__image" 
            />
          )}
          <button 
            type="button" 
            className="media-uploader__remove"
            onClick={handleRemove}
          >
            ×
          </button>
        </div>
      )}

      {!value && (
        <div 
          className={`media-uploader__dropzone ${dragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input 
            ref={inputRef}
            type="file" 
            accept={accept}
            onChange={handleChange}
            className="media-uploader__input"
          />
          
          {uploading ? (
            <div className="media-uploader__spinner"></div>
          ) : (
            <>
              <div className="media-uploader__icon">+</div>
              <span className="media-uploader__text">{label}</span>
              <span className="media-uploader__hint">
                Arrastra un archivo o haz clic para seleccionar
              </span>
            </>
          )}
        </div>
      )}

      {error && <div className="media-uploader__error">{error}</div>}
    </div>
  )
}