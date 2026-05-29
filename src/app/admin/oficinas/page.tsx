'use client'

import { useState, useEffect } from 'react'
import AdminMediaPicker from '@/components/admin/AdminMediaPicker'
import './oficinas-editor.css'

interface OficinasHero {
  id?: string
  image: string
  title: string
}

interface OficinasSection {
  id?: string
  title: string
  text: string
  image: string
  imageAlt: string
  reverse: boolean
  order: number
  active: boolean
}

export default function OficinasEditor() {
  const [hero, setHero] = useState<OficinasHero>({ image: '', title: 'OFICINAS' })
  const [sections, setSections] = useState<OficinasSection[]>([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const response = await fetch('/api/content/oficinas')
      if (response.ok) {
        const data = await response.json()
        setHero({ id: data.hero?.id, image: data.hero?.image || '', title: data.hero?.title || 'OFICINAS' })
        setSections(data.sections || [])
      }
    } catch (error) {
      console.error('Load error:', error)
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/content/oficinas', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hero, sections })
      })
      if (!response.ok) throw new Error('Failed to save')
      showMessage('Cambios guardados correctamente')
    } catch (error) {
      showMessage('Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const addSection = () => {
    setSections(prev => [...prev, {
      title: '',
      text: '',
      image: '',
      imageAlt: '',
      reverse: false,
      order: prev.length,
      active: true
    }])
  }

  const updateSection = (index: number, field: keyof OficinasSection, value: unknown) => {
    setSections(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s))
  }

  const deleteSection = async (index: number) => {
    const section = sections[index]
    if (!confirm('¿Eliminar esta sección?')) return
    if (section.id) {
      try {
        await fetch(`/api/content/oficinas?sectionId=${section.id}`, { method: 'DELETE' })
      } catch (error) {
        console.error('Delete error:', error)
      }
    }
    setSections(prev => prev.filter((_, i) => i !== index))
    showMessage('Sección eliminada')
  }

  if (loading) {
    return (
      <div className="oficinas-editor">
        <div className="oficinas-editor__loading">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="oficinas-editor">
      <div className="oficinas-editor__header">
        <h1>Gestión de Oficinas</h1>
        <p>Edita el contenido de la página de Oficinas</p>
        {message && <div className="oficinas-editor__message">{message}</div>}
        {saving && <div className="oficinas-editor__saving">Guardando...</div>}
      </div>

      <div className="oficinas-editor__section">
        <div className="oficinas-editor__card">
          <h3>Hero Principal</h3>
          <div className="oficinas-editor__field">
            <label>Imagen Hero</label>
            <AdminMediaPicker
              value={hero.image}
              onChange={(url) => setHero(prev => ({ ...prev, image: url }))}
              category="oficinas"
              accept="image/*"
            />
          </div>
          <div className="oficinas-editor__field">
            <label>Título</label>
            <input
              type="text"
              value={hero.title}
              onChange={(e) => setHero(prev => ({ ...prev, title: e.target.value }))}
              placeholder="OFICINAS"
            />
          </div>
        </div>

        <div className="oficinas-editor__card">
          <div className="oficinas-editor__card-header">
            <h3>Secciones de Contenido</h3>
            <button className="oficinas-editor__btn oficinas-editor__btn--add" onClick={addSection}>
              + Agregar Sección
            </button>
          </div>

          {sections.length === 0 ? (
            <div className="oficinas-editor__empty">
              No hay secciones. Agrega una nueva.
            </div>
          ) : (
            <div className="oficinas-editor__list">
              {sections.map((section, index) => (
                <div key={section.id || `new-${index}`} className="oficinas-section-editor">
                  <div className="oficinas-section-editor__header">
                    <span>Sección {index + 1}</span>
                    <button
                      className="oficinas-section-editor__delete"
                      onClick={() => deleteSection(index)}
                    >
                      ×
                    </button>
                  </div>

                  <div className="oficinas-section-editor__row">
                    <div className="oficinas-section-editor__image">
                      <AdminMediaPicker
                        label="Imagen"
                        value={section.image}
                        onChange={(url) => updateSection(index, 'image', url)}
                        category="oficinas"
                        accept="image/*"
                      />
                    </div>
                    <div className="oficinas-section-editor__fields">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(index, 'title', e.target.value)}
                        placeholder="Título de la sección"
                        className="oficinas-section-editor__title"
                      />
                      <textarea
                        value={section.text}
                        onChange={(e) => updateSection(index, 'text', e.target.value)}
                        placeholder="Contenido de la sección"
                        rows={4}
                        className="oficinas-section-editor__text"
                      />
                      <input
                        type="text"
                        value={section.imageAlt}
                        onChange={(e) => updateSection(index, 'imageAlt', e.target.value)}
                        placeholder="Texto alternativo de imagen"
                        className="oficinas-section-editor__alt"
                      />
                      <div className="oficinas-section-editor__meta">
                        <label className="oficinas-section-editor__reverse">
                          <input
                            type="checkbox"
                            checked={section.reverse}
                            onChange={(e) => updateSection(index, 'reverse', e.target.checked)}
                          />
                          Imagen a la derecha
                        </label>
                        <div className="oficinas-section-editor__order">
                          <label>Orden</label>
                          <input
                            type="number"
                            value={section.order}
                            onChange={(e) => updateSection(index, 'order', parseInt(e.target.value) || 0)}
                            min="0"
                          />
                        </div>
                        <label className="oficinas-section-editor__active">
                          <input
                            type="checkbox"
                            checked={section.active}
                            onChange={(e) => updateSection(index, 'active', e.target.checked)}
                          />
                          Activo
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="oficinas-editor__actions">
          <button
            className="oficinas-editor__btn oficinas-editor__btn--save"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}
