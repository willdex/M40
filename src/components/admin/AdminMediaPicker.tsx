'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import './AdminMediaPicker.css'

interface MediaAsset {
  id: string
  filename: string
  originalName: string
  url: string
  category: string
  mimeType: string
  size: number
  alt: string | null
}

interface AdminMediaPickerProps {
  value?: string
  onChange: (url: string, media?: MediaAsset) => void
  category: 'homepage' | 'heroes' | 'services' | 'icons' | 'videos'
  accept?: string
  label?: string
  aspectRatio?: string
}

export default function AdminMediaPicker({ 
  value, 
  onChange, 
  category, 
  accept = 'image/*',
  label = 'Seleccionar multimedia',
  aspectRatio
}: AdminMediaPickerProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const [showLibrary, setShowLibrary] = useState(false)
  const [library, setLibrary] = useState<MediaAsset[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (showLibrary) {
      loadLibrary()
    }
  }, [showLibrary, category])

  const loadLibrary = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/media?category=${category}`)
      if (response.ok) {
        setLibrary(await response.json())
      }
    } catch (err) {
      console.error('Load library error:', err)
    } finally {
      setLoading(false)
    }
  }

  const uploadFile = async (file: File) => {
    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', category)

      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      onChange(data.url, data.media)
      setShowLibrary(false)
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

  const handleSelect = (media: MediaAsset) => {
    setSelectedMedia(media)
  }

  const handleConfirm = () => {
    if (selectedMedia) {
      onChange(selectedMedia.url, selectedMedia)
      setShowLibrary(false)
    }
  }

  const handleRemove = async () => {
    if (value) {
      try {
        await fetch(`/api/media?url=${value}`, { method: 'DELETE' })
        onChange('')
      } catch (err) {
        console.error('Delete failed:', err)
      }
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const isVideo = category === 'videos' || (value && value.match(/\.(mp4|webm)$/i))
  const isImage = accept.startsWith('image') && !isVideo

  return (
    <div className="media-picker">
      {label && <label className="media-picker__label">{label}</label>}
      
      {value && (
        <div className="media-picker__preview" style={aspectRatio ? { aspectRatio } : undefined}>
          {isVideo ? (
            <video src={value} controls className="media-picker__video" />
          ) : isImage ? (
            <Image 
              src={value} 
              alt="Preview" 
              fill
              className="media-picker__image"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <img src={value} alt="Preview" className="media-picker__image" style={{ objectFit: 'cover' }} />
          )}
          <div className="media-picker__preview-actions">
            <button 
              type="button"
              className="media-picker__btn media-picker__btn--change"
              onClick={() => setShowLibrary(true)}
            >
              Cambiar
            </button>
            <button 
              type="button"
              className="media-picker__btn media-picker__btn--remove"
              onClick={handleRemove}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {!value && (
        <div className="media-picker__dropzone-wrapper">
          <div 
            className={`media-picker__dropzone ${dragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
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
              className="media-picker__input"
            />
            
            {uploading ? (
              <div className="media-picker__spinner"></div>
            ) : (
              <>
                <div className="media-picker__icon">+</div>
                <span className="media-picker__text">{label}</span>
                <span className="media-picker__hint">
                  Arrastra o haz clic para subir
                </span>
              </>
            )}
          </div>
          
          <button 
            type="button"
            className="media-picker__library-btn"
            onClick={() => setShowLibrary(true)}
          >
            Buscar en biblioteca
          </button>
        </div>
      )}

      {error && <div className="media-picker__error">{error}</div>}

      {showLibrary && (
        <div className="media-picker__modal">
          <div className="media-picker__modal-content">
            <div className="media-picker__modal-header">
              <h3>Biblioteca de Medios</h3>
              <div className="media-picker__modal-actions">
                <label className="media-picker__upload-label">
                  <input 
                    type="file" 
                    accept={accept}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) uploadFile(file)
                    }}
                    className="media-picker__input"
                  />
                  <span className="media-picker__btn media-picker__btn--primary">Subir nuevo</span>
                </label>
                <button 
                  type="button"
                  className="media-picker__btn media-picker__btn--close"
                  onClick={() => setShowLibrary(false)}
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="media-picker__modal-body">
              {loading ? (
                <div className="media-picker__loading">Cargando...</div>
              ) : library.length === 0 ? (
                <div className="media-picker__empty">
                  No hay archivos en esta categoría.
                  <br />
                  Sube uno nuevo usando el botón de arriba.
                </div>
              ) : (
                <div className="media-picker__grid">
                  {library.map((media) => (
                    <div 
                      key={media.id}
                      className={`media-picker__item ${selectedMedia?.id === media.id ? 'selected' : ''}`}
                      onClick={() => handleSelect(media)}
                    >
                      {media.mimeType.startsWith('video') ? (
                        <video src={media.url} className="media-picker__item-video" />
                      ) : (
                        <Image 
                          src={media.url} 
                          alt={media.alt || media.originalName}
                          fill
                          className="media-picker__item-image"
                        />
                      )}
                      <div className="media-picker__item-info">
                        <span className="media-picker__item-name">{media.originalName}</span>
                        <span className="media-picker__item-size">{formatSize(media.size)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="media-picker__modal-footer">
              <button 
                type="button"
                className="media-picker__btn media-picker__btn--cancel"
                onClick={() => setShowLibrary(false)}
              >
                Cancelar
              </button>
              <button 
                type="button"
                className="media-picker__btn media-picker__btn--primary"
                disabled={!selectedMedia}
                onClick={handleConfirm}
              >
                Seleccionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}