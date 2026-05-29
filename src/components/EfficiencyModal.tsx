'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './EfficiencyModal.css'

interface EfficiencyItem {
  id: string
  title: string
  shortDesc: string
  detailDesc: string
  image: string
  icon: string
  ctaText: string
  ctaLink: string
}

interface EfficiencyModalProps {
  item: EfficiencyItem | null
  onClose: () => void
}

export default function EfficiencyModal({ item, onClose }: EfficiencyModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (item && mounted) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [item, mounted])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  if (!mounted || !item) return null

  const modalContent = (
    <div 
      className={`efficiency-modal ${isVisible ? 'efficiency-modal--visible' : ''}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="efficiency-modal__content">
        <button 
          className="efficiency-modal__close"
          onClick={handleClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        {item.image && (
          <div className="efficiency-modal__image">
            <img src={item.image} alt={item.title} />
          </div>
        )}

        <div className="efficiency-modal__body">
          <h2 id="modal-title" className="efficiency-modal__title">
            {item.title}
          </h2>
          
          {item.shortDesc && (
            <p className="efficiency-modal__short">{item.shortDesc}</p>
          )}
          
          {item.detailDesc && (
            <div className="efficiency-modal__detail">
              {item.detailDesc.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}

          {item.ctaLink && (
            <a 
              href={item.ctaLink} 
              className="efficiency-modal__cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.ctaText || 'Ver más'}
            </a>
          )}
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
