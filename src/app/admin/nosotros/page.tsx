'use client'

import { useState, useEffect } from 'react'
import AdminMediaPicker from '@/components/admin/AdminMediaPicker'
import './nosotros-editor.css'

interface ContentBlock {
  id: string
  title: string
  text: string
  image: string
  imageAlt: string
  reverse: boolean
}

interface Feature {
  id: string
  icon: string
  title: string
  description: string
  sectionTitle?: string
}

interface EfficiencyItem {
  id: string
  title: string
  shortDesc: string
  detailDesc: string
  image: string
  icon: string
  ctaText: string
  ctaLink: string
  order: number
  active: boolean
}

export default function NosotrosEditor() {
  const [heroImage, setHeroImage] = useState('')
  const [heroAlt, setHeroAlt] = useState('')
  const [featuresTitle, setFeaturesTitle] = useState('')
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
  const [features, setFeatures] = useState<Feature[]>([])
  const [efficiencyItems, setEfficiencyItems] = useState<EfficiencyItem[]>([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'content' | 'features' | 'efficiency'>('content')

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const [heroRes, blocksRes, featuresRes] = await Promise.all([
        fetch('/api/content/nosotros'),
        fetch('/api/content/nosotros-content?page=nosotros'),
        fetch('/api/content/nosotros-content?page=nosotros')
      ])

      if (heroRes.ok) {
        const data = await heroRes.json()
        setHeroImage(data.hero?.image || '')
        setHeroAlt(data.hero?.alt || '')
        setFeaturesTitle(data.featuresTitle || '')
      }

      if (blocksRes.ok) {
        const data = await blocksRes.json()
        setContentBlocks(data.contentBlocks || [])
      }

      if (featuresRes.ok) {
        const data = await featuresRes.json()
        setFeatures(data.features || [])
      }

      const efficiencyRes = await fetch('/api/content/efficiency')
      if (efficiencyRes.ok) {
        const data = await efficiencyRes.json()
        setEfficiencyItems(data || [])
      }
    } catch (error) {
      console.error('Load error:', error)
      showMessage('Error al cargar contenido')
    }
  }

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const updateMeta = async (key: string, value: string) => {
    try {
      const response = await fetch('/api/content/nosotros', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value })
      })
      return response.ok
    } catch {
      return false
    }
  }

  const handleSaveHero = async () => {
    setSaving(true)
    try {
      await Promise.all([
        updateMeta('nosotros_heroImage', heroImage),
        updateMeta('nosotros_heroAlt', heroAlt)
      ])
      showMessage('Hero guardado')
    } catch {
      showMessage('Error al guardar hero')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveFeaturesTitle = async () => {
    setSaving(true)
    try {
      await updateMeta('nosotros_featuresTitle', featuresTitle)
      showMessage('Título guardado')
    } catch {
      showMessage('Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleBlockChange = (index: number, field: keyof ContentBlock, value: string | boolean) => {
    setContentBlocks(prev => prev.map((block, i) => 
      i === index ? { ...block, [field]: value } : block
    ))
  }

  const handleBlockSave = async (index: number) => {
    const block = contentBlocks[index]
    try {
      const response = await fetch('/api/content/nosotros-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contentBlock', data: block })
      })
      if (response.ok) {
        showMessage('Bloque guardado')
      } else {
        showMessage('Error al guardar')
      }
    } catch {
      showMessage('Error al guardar bloque')
    }
  }

  const handleBlockDelete = async (id: string, index: number) => {
    if (!confirm('¿Eliminar este bloque?')) return
    try {
      const response = await fetch(`/api/content/nosotros-content?type=contentBlock&id=${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setContentBlocks(prev => prev.filter((_, i) => i !== index))
        showMessage('Bloque eliminado')
      }
    } catch {
      showMessage('Error al eliminar')
    }
  }

  const handleFeatureChange = (index: number, field: keyof Feature, value: string) => {
    setFeatures(prev => prev.map((f, i) => 
      i === index ? { ...f, [field]: value } : f
    ))
  }

  const handleFeatureSave = async (index: number) => {
    const feature = features[index]
    try {
      const response = await fetch('/api/content/nosotros-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'feature', data: feature })
      })
      if (response.ok) {
        showMessage('Feature guardada')
      } else {
        showMessage('Error al guardar')
      }
    } catch {
      showMessage('Error al guardar feature')
    }
  }

  const handleFeatureDelete = async (id: string, index: number) => {
    if (!confirm('¿Eliminar esta feature?')) return
    try {
      const response = await fetch(`/api/content/nosotros-content?type=feature&id=${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setFeatures(prev => prev.filter((_, i) => i !== index))
        showMessage('Feature eliminada')
      }
    } catch {
      showMessage('Error al eliminar')
    }
  }

  const addNewBlock = () => {
    setContentBlocks(prev => [...prev, {
      id: '',
      title: '',
      text: '',
      image: '',
      imageAlt: '',
      reverse: false
    }])
  }

  const addNewFeature = () => {
    setFeatures(prev => [...prev, {
      id: '',
      icon: '',
      title: '',
      description: ''
    }])
  }

  const handleEfficiencyChange = (index: number, field: keyof EfficiencyItem, value: string | boolean | number) => {
    setEfficiencyItems(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ))
  }

  const handleEfficiencySave = async (index: number) => {
    const item = efficiencyItems[index]
    setSaving(true)
    try {
      const method = item.id ? 'PUT' : 'POST'
      const response = await fetch('/api/content/efficiency', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
      if (response.ok) {
        const result = await response.json()
        if (!item.id && result.data?.id) {
          setEfficiencyItems(prev => prev.map((e, i) => i === index ? { ...e, id: result.data.id } : e))
        }
        showMessage('Item guardado')
      } else {
        showMessage('Error al guardar')
      }
    } catch {
      showMessage('Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleEfficiencyDelete = async (id: string, index: number) => {
    if (!confirm('¿Eliminar este item?')) return
    try {
      const response = await fetch(`/api/content/efficiency?id=${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setEfficiencyItems(prev => prev.filter((_, i) => i !== index))
        showMessage('Item eliminado')
      }
    } catch {
      showMessage('Error al eliminar')
    }
  }

  const addNewEfficiencyItem = () => {
    setEfficiencyItems(prev => [...prev, {
      id: '',
      title: '',
      shortDesc: '',
      detailDesc: '',
      image: '',
      icon: '',
      ctaText: 'Ver más',
      ctaLink: '',
      order: prev.length,
      active: true
    }])
  }

  return (
    <div className="nosotros-editor">
      <div className="nosotros-editor__header">
        <h1>Gestión de Nosotros</h1>
        <p>Edita el contenido de la página Nosotros</p>
        {message && <div className="nosotros-editor__message">{message}</div>}
        {saving && <div className="nosotros-editor__saving">Guardando...</div>}
      </div>

      <div className="nosotros-editor__tabs">
        <button 
          className={`nosotros-editor__tab ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          Contenido ({contentBlocks.length})
        </button>
        <button
          className={`nosotros-editor__tab ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => setActiveTab('features')}
        >
          Features ({features.length})
        </button>
        <button
          className={`nosotros-editor__tab ${activeTab === 'efficiency' ? 'active' : ''}`}
          onClick={() => setActiveTab('efficiency')}
        >
          Eficiencia ({efficiencyItems.length})
        </button>
      </div>

      {activeTab === 'content' && (
        <div className="nosotros-editor__section">
          <div className="nosotros-editor__card">
            <h3>Hero</h3>
            <div className="nosotros-editor__field">
              <label>Imagen Hero</label>
              <AdminMediaPicker
                label=""
                value={heroImage}
                onChange={(url) => setHeroImage(url)}
                category="heroes"
                accept="image/*"
              />
            </div>
            <div className="nosotros-editor__field">
              <label>Alt Text</label>
              <input
                type="text"
                value={heroAlt}
                onChange={(e) => setHeroAlt(e.target.value)}
                placeholder="Nosotros"
              />
            </div>
            <button 
              className="nosotros-editor__btn nosotros-editor__btn--save"
              onClick={handleSaveHero}
              disabled={saving}
            >
              Guardar Hero
            </button>
          </div>

          <div className="nosotros-editor__card">
            <div className="nosotros-editor__card-header">
              <h3>Bloques de Contenido</h3>
              <button className="nosotros-editor__btn nosotros-editor__btn--add" onClick={addNewBlock}>
                + Agregar Bloque
              </button>
            </div>

            {contentBlocks.length === 0 ? (
              <div className="nosotros-editor__empty">
                No hay bloques. Agrega uno nuevo.
              </div>
            ) : (
              <div className="nosotros-editor__list">
                {contentBlocks.map((block, index) => (
                  <div key={block.id || `new-${index}`} className="content-block-editor">
                    <div className="content-block-editor__row">
                      <div className="content-block-editor__media">
                        <AdminMediaPicker
                          label="Imagen"
                          value={block.image}
                          onChange={(url) => handleBlockChange(index, 'image', url)}
                          category="nosotros"
                          accept="image/*"
                        />
                      </div>
                      <div className="content-block-editor__fields">
                        <input
                          type="text"
                          value={block.title}
                          onChange={(e) => handleBlockChange(index, 'title', e.target.value)}
                          placeholder="Título del bloque"
                          className="content-block-editor__title"
                        />
                        <textarea
                          value={block.text}
                          onChange={(e) => handleBlockChange(index, 'text', e.target.value)}
                          placeholder="Contenido del bloque"
                          rows={4}
                          className="content-block-editor__text"
                        />
                        <input
                          type="text"
                          value={block.imageAlt}
                          onChange={(e) => handleBlockChange(index, 'imageAlt', e.target.value)}
                          placeholder="Alt text de imagen"
                          className="content-block-editor__alt"
                        />
                        <label className="content-block-editor__reverse">
                          <input
                            type="checkbox"
                            checked={block.reverse}
                            onChange={(e) => handleBlockChange(index, 'reverse', e.target.checked)}
                          />
                          Imagen a la derecha
                        </label>
                        <div className="content-block-editor__actions">
                          <button 
                            className="nosotros-editor__btn nosotros-editor__btn--save"
                            onClick={() => handleBlockSave(index)}
                          >
                            Guardar
                          </button>
                          {block.id && (
                            <button 
                              className="nosotros-editor__btn nosotros-editor__btn--delete"
                              onClick={() => handleBlockDelete(block.id, index)}
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <div className="nosotros-editor__section">
          <div className="nosotros-editor__card">
            <h3>Título de Features</h3>
            <div className="nosotros-editor__field">
              <input
                type="text"
                value={featuresTitle}
                onChange={(e) => setFeaturesTitle(e.target.value)}
                placeholder="DISEÑO PENSADO EN EL AHORRO"
              />
            </div>
            <button 
              className="nosotros-editor__btn nosotros-editor__btn--save"
              onClick={handleSaveFeaturesTitle}
              disabled={saving}
            >
              Guardar Título
            </button>
          </div>

          <div className="nosotros-editor__card">
            <div className="nosotros-editor__card-header">
              <h3>Features</h3>
              <button className="nosotros-editor__btn nosotros-editor__btn--add" onClick={addNewFeature}>
                + Agregar Feature
              </button>
            </div>

            {features.length === 0 ? (
              <div className="nosotros-editor__empty">
                No hay features. Agrega una nueva.
              </div>
            ) : (
              <div className="nosotros-editor__list">
                {features.map((feature, index) => (
                  <div key={feature.id || `new-${index}`} className="feature-editor">
                    <div className="feature-editor__row">
                      <div className="feature-editor__icon">
                        <AdminMediaPicker
                          label="Icono"
                          value={feature.icon}
                          onChange={(url) => handleFeatureChange(index, 'icon', url)}
                          category="icons"
                          accept="image/*"
                        />
                      </div>
                      <div className="feature-editor__fields">
                        <input
                          type="text"
                          value={feature.title}
                          onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                          placeholder="Título de la feature"
                          className="feature-editor__title"
                        />
                        <input
                          type="text"
                          value={feature.description}
                          onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                          placeholder="Descripción"
                          className="feature-editor__description"
                        />
                        <div className="feature-editor__actions">
                          <button 
                            className="nosotros-editor__btn nosotros-editor__btn--save"
                            onClick={() => handleFeatureSave(index)}
                          >
                            Guardar
                          </button>
                          {feature.id && (
                            <button 
                              className="nosotros-editor__btn nosotros-editor__btn--delete"
                              onClick={() => handleFeatureDelete(feature.id, index)}
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'efficiency' && (
        <div className="nosotros-editor__section">
          <div className="nosotros-editor__card">
            <div className="nosotros-editor__card-header">
              <h3>Items de Eficiencia (Popups)</h3>
              <button className="nosotros-editor__btn nosotros-editor__btn--add" onClick={addNewEfficiencyItem}>
                + Agregar Item
              </button>
            </div>

            <p style={{ color: '#666', marginBottom: '20px', fontSize: '0.9rem' }}>
              Estos items se muestran al hacer click en "Ver" en las cards de la sección "Diseño pensado en el ahorro".
              Cada item corresponde a una card en orden.
            </p>

            {efficiencyItems.length === 0 ? (
              <div className="nosotros-editor__empty">
                No hay items. Agrega uno nuevo.
              </div>
            ) : (
              <div className="nosotros-editor__list">
                {efficiencyItems.map((item, index) => (
                  <div key={item.id || `new-${index}`} className="efficiency-editor">
                    <div className="efficiency-editor__row">
                      <div className="efficiency-editor__images">
                        <AdminMediaPicker
                          label="Icono"
                          value={item.icon}
                          onChange={(url) => handleEfficiencyChange(index, 'icon', url)}
                          category="icons"
                          accept="image/*"
                        />
                        <AdminMediaPicker
                          label="Imagen Popup"
                          value={item.image}
                          onChange={(url) => handleEfficiencyChange(index, 'image', url)}
                          category="nosotros"
                          accept="image/*"
                        />
                      </div>
                      <div className="efficiency-editor__fields">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleEfficiencyChange(index, 'title', e.target.value)}
                          placeholder="Título del popup"
                          className="efficiency-editor__title"
                        />
                        <textarea
                          value={item.shortDesc}
                          onChange={(e) => handleEfficiencyChange(index, 'shortDesc', e.target.value)}
                          placeholder="Descripción corta (opcional)"
                          rows={2}
                          className="efficiency-editor__short"
                        />
                        <textarea
                          value={item.detailDesc}
                          onChange={(e) => handleEfficiencyChange(index, 'detailDesc', e.target.value)}
                          placeholder="Descripción detallada del popup (puede usar saltos de línea)"
                          rows={4}
                          className="efficiency-editor__detail"
                        />
                        <div className="efficiency-editor__cta-row">
                          <input
                            type="text"
                            value={item.ctaText}
                            onChange={(e) => handleEfficiencyChange(index, 'ctaText', e.target.value)}
                            placeholder="Texto del botón"
                            className="efficiency-editor__cta-text"
                          />
                          <input
                            type="text"
                            value={item.ctaLink}
                            onChange={(e) => handleEfficiencyChange(index, 'ctaLink', e.target.value)}
                            placeholder="Link del botón (opcional)"
                            className="efficiency-editor__cta-link"
                          />
                        </div>
                        <div className="efficiency-editor__order">
                          <label>Orden</label>
                          <input
                            type="number"
                            value={item.order}
                            onChange={(e) => handleEfficiencyChange(index, 'order', parseInt(e.target.value) || 0)}
                            min="0"
                            className="efficiency-editor__order-input"
                          />
                        </div>
                        <div className="efficiency-editor__actions">
                          <button
                            className="nosotros-editor__btn nosotros-editor__btn--save"
                            onClick={() => handleEfficiencySave(index)}
                            disabled={saving}
                          >
                            Guardar
                          </button>
                          {item.id && (
                            <button
                              className="nosotros-editor__btn nosotros-editor__btn--delete"
                              onClick={() => handleEfficiencyDelete(item.id, index)}
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
