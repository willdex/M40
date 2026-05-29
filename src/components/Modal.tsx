'use client'

import { useEffect, useRef, useCallback } from 'react'
import './Modal.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEscape) {
      onClose()
    }
  }, [closeOnEscape, onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscape])

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose()
    }
  }

  return (
    <div 
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div 
        ref={modalRef}
        className={`modal modal--${size}`}
        tabIndex={-1}
      >
        {(title || showCloseButton) && (
          <div className="modal__header">
            {title && (
              <h2 id="modal-title" className="modal__title">{title}</h2>
            )}
            {showCloseButton && (
              <button 
                className="modal__close"
                onClick={onClose}
                aria-label="Cerrar modal"
              >
                ×
              </button>
            )}
          </div>
        )}
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  )
}

interface ServiceModalContent {
  title: string
  description: string
  image: string
  href?: string
}

interface ModalServiceProps {
  service: ServiceModalContent
  onClose: () => void
}

export function ServiceModal({ service, onClose }: ModalServiceProps) {
  return (
    <div className="modal-service">
      {service.image && (
        <div className="modal-service__image-container">
          <img 
            src={service.image} 
            alt={service.title}
            className="modal-service__image"
          />
        </div>
      )}
      <div className="modal-service__content">
        <h3 className="modal-service__title">{service.title}</h3>
        <p className="modal-service__description">{service.description}</p>
        {service.href && (
          <a 
            href={service.href} 
            className="modal-service__cta"
            onClick={onClose}
          >
            Conocer más
          </a>
        )}
      </div>
    </div>
  )
}

interface ModalAmenityProps {
  amenity: {
    title: string
    description: string
    icon: string
  }
  onClose: () => void
}

export function AmenityModal({ amenity, onClose }: ModalAmenityProps) {
  return (
    <div className="modal-amenity">
      {amenity.icon && (
        <div className="modal-amenity__icon-container">
          <img 
            src={amenity.icon} 
            alt={amenity.title}
            className="modal-amenity__icon"
          />
        </div>
      )}
      <div className="modal-amenity__content">
        <h3 className="modal-amenity__title">{amenity.title}</h3>
        <p className="modal-amenity__description">{amenity.description}</p>
      </div>
    </div>
  )
}