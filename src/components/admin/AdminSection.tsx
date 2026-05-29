'use client'

import { useState } from 'react'
import './AdminSection.css'

interface AdminSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
  collapsible?: boolean
  defaultOpen?: boolean
}

export default function AdminSection({
  title,
  description,
  children,
  actions,
  collapsible = false,
  defaultOpen = true
}: AdminSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`admin-section ${isOpen ? 'admin-section--open' : ''}`}>
      <div className="admin-section__header" onClick={() => collapsible && setIsOpen(!isOpen)}>
        <div className="admin-section__header-content">
          <h3 className="admin-section__title">{title}</h3>
          {description && <p className="admin-section__description">{description}</p>}
        </div>
        <div className="admin-section__actions">
          {actions}
          {collapsible && (
            <span className="admin-section__toggle">
              {isOpen ? '−' : '+'}
            </span>
          )}
        </div>
      </div>
      {isOpen && <div className="admin-section__content">{children}</div>}
    </div>
  )
}