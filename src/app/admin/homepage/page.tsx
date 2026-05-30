'use client'

import { useState, useEffect } from 'react'
import AdminMediaPicker from '@/components/admin/AdminMediaPicker'
import './homepage-editor.css'

interface HeroContent {
  heroTitle: string
  heroSubtitle: string
  heroVideo: string
  heroPoster: string
  contactPhone: string
}

interface Service {
  id: string
  title: string
  description: string
  image: string
  href: string
  order: number
  active: boolean
}

interface Amenity {
  id: string
  title: string
  description: string
  icon: string
  order: number
  active: boolean
}

interface EditorialSection {
  id: string
  type: 'lifestyle' | 'community'
  title: string
  subtitle: string
  paragraph: string
  image: string
  images: string
  active: boolean
  order: number
}

export default function HomepageEditor() {
  const [hero, setHero] = useState<HeroContent>({
    heroTitle: '',
    heroSubtitle: '',
    heroVideo: '',
    heroPoster: '',
    contactPhone: ''
  })
  const [services, setServices] = useState<Service[]>([])
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [editorials, setEditorials] = useState<EditorialSection[]>([])
  const [featuresTitle, setFeaturesTitle] = useState('')
  const [amenitiesTitle, setAmenitiesTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'hero' | 'services' | 'amenities' | 'editorial'>('hero')

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const [contentRes, servicesRes, amenitiesRes, editorialsRes] = await Promise.all([
        fetch('/api/content/homepage'),
        fetch('/api/content/services'),
        fetch('/api/content/amenities'),
        fetch('/api/content/homepage-editorial')
      ])

      if (contentRes.ok) {
        const data = await contentRes.json()
        setHero({
          heroTitle: data.homepage?.homepage_heroTitle || '',
          heroSubtitle: data.homepage?.homepage_heroSubtitle || '',
          heroVideo: data.homepage?.homepage_heroVideo || '',
          heroPoster: data.homepage?.homepage_heroPoster || '',
          contactPhone: data.homepage?.homepage_contactPhone || ''
        })
        setFeaturesTitle(data.homepage?.homepage_featuresTitle || '')
        setAmenitiesTitle(data.homepage?.homepage_amenitiesTitle || '')
      }

      if (servicesRes.ok) {
        setServices(await servicesRes.json())
      }

      if (amenitiesRes.ok) {
        setAmenities(await amenitiesRes.json())
      }

      if (editorialsRes.ok) {
        setEditorials(await editorialsRes.json())
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

  const updateContent = async (key: string, value: string) => {
    setSaving(true)
    try {
      const response = await fetch('/api/content/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value })
      })
      if (!response.ok) throw new Error('Failed to save')
    } catch (error) {
      showMessage('Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleHeroChange = (field: keyof HeroContent, value: string) => {
    setHero(prev => ({ ...prev, [field]: value }))
  }

  const handleHeroBlur = (field: keyof HeroContent) => {
    updateContent(`homepage_${field}`, hero[field])
    showMessage('Cambios guardados')
  }

  const handleServiceSave = async (service: Service) => {
    try {
      const method = services.find(s => s.id === service.id) ? 'PUT' : 'POST'
      const response = await fetch('/api/content/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service)
      })
      if (response.ok) {
        loadContent()
        showMessage('Servicio guardado')
      }
    } catch (error) {
      showMessage('Error al guardar servicio')
    }
  }

  const handleServiceDelete = async (id: string) => {
    if (!confirm('¿Eliminar este servicio?')) return
    try {
      const response = await fetch(`/api/content/services?id=${id}`, { method: 'DELETE' })
      if (response.ok) {
        loadContent()
        showMessage('Servicio eliminado')
      }
    } catch (error) {
      showMessage('Error al eliminar servicio')
    }
  }

  const handleAmenitySave = async (amenity: Amenity) => {
    try {
      const method = amenities.find(a => a.id === amenity.id) ? 'PUT' : 'POST'
      const response = await fetch('/api/content/amenities', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(amenity)
      })
      if (response.ok) {
        loadContent()
        showMessage('Amenidad guardada')
      }
    } catch (error) {
      showMessage('Error al guardar amenidad')
    }
  }

  const handleAmenityDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta amenidad?')) return
    try {
      const response = await fetch(`/api/content/amenities?id=${id}`, { method: 'DELETE' })
      if (response.ok) {
        loadContent()
        showMessage('Amenidad eliminada')
      }
    } catch (error) {
      showMessage('Error al eliminar amenidad')
    }
  }

  const addNewService = () => {
    setServices(prev => [...prev, {
      id: '',
      title: '',
      description: '',
      image: '',
      href: '',
      order: prev.length,
      active: true
    }])
  }

  const addNewAmenity = () => {
    setAmenities(prev => [...prev, {
      id: '',
      title: '',
      description: '',
      icon: '',
      order: prev.length,
      active: true
    }])
  }

  const handleEditorialSave = async (editorial: EditorialSection) => {
    try {
      const method = editorials.find(e => e.id === editorial.id) ? 'PUT' : 'POST'
      const response = await fetch('/api/content/homepage-editorial', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editorial)
      })
      if (response.ok) {
        loadContent()
        showMessage('Sección editorial guardada')
      }
    } catch (error) {
      showMessage('Error al guardar sección editorial')
    }
  }

  const handleEditorialDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta sección editorial?')) return
    try {
      const response = await fetch(`/api/content/homepage-editorial?id=${id}`, { method: 'DELETE' })
      if (response.ok) {
        loadContent()
        showMessage('Sección editorial eliminada')
      }
    } catch (error) {
      showMessage('Error al eliminar sección editorial')
    }
  }

  const addNewEditorial = (type: 'lifestyle' | 'community') => {
    const newEditorial: EditorialSection = {
      id: '',
      type,
      title: '',
      subtitle: '',
      paragraph: '',
      image: '',
      images: '[]',
      order: editorials.filter(e => e.type === type).length,
      active: true
    }
    setEditorials(prev => [...prev, newEditorial])
  }

  return (
    <div className="homepage-editor">
      <div className="homepage-editor__header">
        <h1>Gestión de Homepage</h1>
        <p>Edita el contenido de la página principal</p>
        {message && <div className="homepage-editor__message">{message}</div>}
        {saving && <div className="homepage-editor__saving">Guardando...</div>}
      </div>

      <div className="homepage-editor__tabs">
        <button 
          className={`homepage-editor__tab ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          Hero
        </button>
        <button 
          className={`homepage-editor__tab ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Servicios ({services.length})
        </button>
        <button 
          className={`homepage-editor__tab ${activeTab === 'amenities' ? 'active' : ''}`}
          onClick={() => setActiveTab('amenities')}
        >
          Amenidades ({amenities.length})
        </button>
        <button
          className={`homepage-editor__tab ${activeTab === 'editorial' ? 'active' : ''}`}
          onClick={() => setActiveTab('editorial')}
        >
          Editorial ({editorials.length})
        </button>
      </div>

      {activeTab === 'hero' && (
        <div className="homepage-editor__section">
          <div className="homepage-editor__card">
            <h3>Media Hero</h3>
            <div className="homepage-editor__media-grid">
              <div className="homepage-editor__field">
                <label>Video Hero</label>
                <div className="homepage-editor__static-video">
                  <video src="/static-assets/2024/09/Hyperlapse-Manzana-40.mp4" controls style={{ maxWidth: '200px' }} />
                  <p className="homepage-editor__video-note">
                    El video hero es estático en producción. Para cambiarlo, actualiza el código fuente.
                  </p>
                </div>
              </div>
              <AdminMediaPicker
                label="Poster Hero"
                value={hero.heroPoster}
                onChange={(url) => handleHeroChange('heroPoster', url)}
                category="homepage"
                accept="image/*"
              />
            </div>
          </div>

          <div className="homepage-editor__card">
            <h3>Contenido Hero</h3>
            <div className="homepage-editor__field">
              <label>Título Principal</label>
              <input
                type="text"
                value={hero.heroTitle}
                onChange={(e) => handleHeroChange('heroTitle', e.target.value)}
                placeholder="LA PLAZA EMPRESARIAL MÁS IMPORTANTE DEL PAÍS."
              />
            </div>
            <div className="homepage-editor__field">
              <label>Subtítulo</label>
              <textarea
                value={hero.heroSubtitle}
                onChange={(e) => handleHeroChange('heroSubtitle', e.target.value)}
                placeholder="Un ecosistema de posibilidades..."
                rows={3}
              />
            </div>
            <div className="homepage-editor__field">
              <label>Teléfono de Contacto</label>
              <input
                type="text"
                value={hero.contactPhone}
                onChange={(e) => handleHeroChange('contactPhone', e.target.value)}
                placeholder="+591 71369822"
              />
            </div>
          </div>

          <div className="homepage-editor__card">
            <h3>Títulos de Secciones</h3>
            <div className="homepage-editor__field">
              <label>Título de Servicios</label>
              <input
                type="text"
                value={featuresTitle}
                onChange={(e) => setFeaturesTitle(e.target.value)}
                placeholder="UN ECOSISTEMA DE POSIBILIDADES..."
              />
            </div>
            <div className="homepage-editor__field">
              <label>Título de Amenidades</label>
              <input
                type="text"
                value={amenitiesTitle}
                onChange={(e) => setAmenitiesTitle(e.target.value)}
                placeholder="UNA PLAZA EMPRESARIAL ÚNICA"
              />
            </div>
          </div>

          <div className="homepage-editor__actions">
            <button 
              className="homepage-editor__btn homepage-editor__btn--save"
              onClick={async () => {
                setSaving(true)
                try {
                  await Promise.all([
                    updateContent('homepage_heroVideo', hero.heroVideo),
                    updateContent('homepage_heroPoster', hero.heroPoster),
                    updateContent('homepage_heroTitle', hero.heroTitle),
                    updateContent('homepage_heroSubtitle', hero.heroSubtitle),
                    updateContent('homepage_contactPhone', hero.contactPhone),
                    updateContent('homepage_featuresTitle', featuresTitle),
                    updateContent('homepage_amenitiesTitle', amenitiesTitle),
                  ])
                  showMessage('Cambios guardados')
                } catch {
                  showMessage('Error al guardar')
                } finally {
                  setSaving(false)
                }
              }}
              disabled={saving}
            >
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="homepage-editor__section">
          <div className="homepage-editor__card">
            <div className="homepage-editor__card-header">
              <h3>Servicios</h3>
              <button className="homepage-editor__btn homepage-editor__btn--add" onClick={addNewService}>
                + Agregar Servicio
              </button>
            </div>

              {services.length === 0 ? (
              <div className="homepage-editor__empty">
                No hay servicios. Agrega uno nuevo.
              </div>
            ) : (
              <div className="homepage-editor__list">
                {services.map((service, index) => (
                  <ServiceEditor 
                    key={service.id || `new-${index}`}
                    service={service}
                    onChange={(updated) => {
                      setServices(prev => prev.map((s, i) => i === index ? updated : s))
                    }}
                    onSave={() => {
                      const currentService = services[index]
                      handleServiceSave(currentService)
                    }}
                    onDelete={() => service.id && handleServiceDelete(service.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'amenities' && (
        <div className="homepage-editor__section">
          <div className="homepage-editor__card">
            <div className="homepage-editor__card-header">
              <h3>Amenidades</h3>
              <button className="homepage-editor__btn homepage-editor__btn--add" onClick={addNewAmenity}>
                + Agregar Amenidad
              </button>
            </div>

            {amenities.length === 0 ? (
              <div className="homepage-editor__empty">
                No hay amenidades. Agrega una nueva.
              </div>
            ) : (
              <div className="homepage-editor__list">
                {amenities.map((amenity, index) => (
                  <AmenityEditor 
                    key={amenity.id || `new-${index}`}
                    amenity={amenity}
                    onChange={(updated) => {
                      setAmenities(prev => prev.map((a, i) => i === index ? updated : a))
                    }}
                    onSave={() => {
                      const currentAmenity = amenities[index]
                      handleAmenitySave(currentAmenity)
                    }}
                    onDelete={() => amenity.id && handleAmenityDelete(amenity.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'editorial' && (
        <div className="homepage-editor__section">
          <div className="homepage-editor__card">
            <div className="homepage-editor__card-header">
              <h3>Secciones Editoriales</h3>
              <div className="homepage-editor__actions-inline">
                <button className="homepage-editor__btn homepage-editor__btn--add" onClick={() => addNewEditorial('lifestyle')}>
                  + Lifestyle
                </button>
                <button className="homepage-editor__btn homepage-editor__btn--add" onClick={() => addNewEditorial('community')}>
                  + Community
                </button>
              </div>
            </div>

            {editorials.length === 0 ? (
              <div className="homepage-editor__empty">
                No hay secciones editoriales. Agrega una nueva.
              </div>
            ) : (
              <div className="homepage-editor__list">
                {editorials.map((editorial, index) => (
                  <EditorialEditor
                    key={editorial.id || `new-${index}`}
                    editorial={editorial}
                    onChange={(updated) => {
                      setEditorials(prev => prev.map((e, i) => i === index ? updated : e))
                    }}
                    onSave={() => {
                      const currentEditorial = editorials[index]
                      handleEditorialSave(currentEditorial)
                    }}
                    onDelete={() => editorial.id && handleEditorialDelete(editorial.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ServiceEditor({ 
  service, 
  onChange, 
  onSave, 
  onDelete 
}: { 
  service: Service
  onChange: (s: Service) => void
  onSave: () => void
  onDelete: () => void
}) {
  return (
    <div className="service-editor">
      <div className="service-editor__row">
        <div className="service-editor__media">
          <AdminMediaPicker
            label="Imagen"
            value={service.image}
            onChange={(url) => onChange({ ...service, image: url })}
            category="services"
            accept="image/*"
            aspectRatio="4/3"
          />
        </div>
        <div className="service-editor__fields">
          <input
            type="text"
            value={service.title}
            onChange={(e) => onChange({ ...service, title: e.target.value })}
            placeholder="Título del servicio"
            className="service-editor__title"
          />
          <input
            type="text"
            value={service.description}
            onChange={(e) => onChange({ ...service, description: e.target.value })}
            placeholder="Descripción breve"
            className="service-editor__description"
          />
          <input
            type="text"
            value={service.href}
            onChange={(e) => onChange({ ...service, href: e.target.value })}
            placeholder="/pagina-destino"
            className="service-editor__href"
          />
          <div className="service-editor__actions">
            <button className="homepage-editor__btn homepage-editor__btn--save" onClick={onSave}>
              Guardar
            </button>
            {service.id && (
              <button className="homepage-editor__btn homepage-editor__btn--delete" onClick={onDelete}>
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function AmenityEditor({
  amenity,
  onChange,
  onSave,
  onDelete
}: {
  amenity: Amenity
  onChange: (a: Amenity) => void
  onSave: () => void
  onDelete: () => void
}) {
  return (
    <div className="amenity-editor">
      <div className="amenity-editor__row">
        <div className="amenity-editor__icon">
          <AdminMediaPicker
            label="Icono"
            value={amenity.icon}
            onChange={(url) => onChange({ ...amenity, icon: url })}
            category="icons"
            accept="image/png,image/svg+xml,image/webp"
          />
        </div>
        <div className="amenity-editor__fields">
          <input
            type="text"
            value={amenity.title}
            onChange={(e) => onChange({ ...amenity, title: e.target.value })}
            placeholder="Título de la amenidad"
            className="amenity-editor__title"
          />
          <textarea
            value={amenity.description}
            onChange={(e) => onChange({ ...amenity, description: e.target.value })}
            placeholder="Descripción de la amenidad"
            rows={2}
            className="amenity-editor__description"
          />
          <div className="amenity-editor__meta">
            <div className="amenity-editor__order">
              <label>Orden</label>
              <input
                type="number"
                value={amenity.order || 0}
                onChange={(e) => onChange({ ...amenity, order: parseInt(e.target.value) || 0 })}
                min="0"
                className="amenity-editor__order-input"
              />
            </div>
            <label className="amenity-editor__active">
              <input
                type="checkbox"
                checked={amenity.active !== false}
                onChange={(e) => onChange({ ...amenity, active: e.target.checked })}
              />
              Activo
            </label>
          </div>
          <div className="amenity-editor__actions">
            <button className="homepage-editor__btn homepage-editor__btn--save" onClick={onSave}>
              Guardar
            </button>
            {amenity.id && (
              <button className="homepage-editor__btn homepage-editor__btn--delete" onClick={onDelete}>
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function EditorialEditor({
  editorial,
  onChange,
  onSave,
  onDelete
}: {
  editorial: EditorialSection
  onChange: (e: EditorialSection) => void
  onSave: () => void
  onDelete: () => void
}) {
  const isLifestyle = editorial.type === 'lifestyle'

  return (
    <div className="editorial-editor">
      <div className="editorial-editor__header">
        <span className="editorial-editor__type">
          {isLifestyle ? 'Lifestyle' : 'Community'}
        </span>
      </div>
      <div className="editorial-editor__row">
        {isLifestyle ? (
          <div className="editorial-editor__media">
            <AdminMediaPicker
              label="Imagen principal"
              value={editorial.image}
              onChange={(url) => onChange({ ...editorial, image: url })}
              category="editorial"
              accept="image/*"
              aspectRatio="3/4"
            />
          </div>
        ) : (
          <div className="editorial-editor__gallery">
            <AdminMediaPicker
              label="Imagen 1"
              value={JSON.parse(editorial.images || '[]')[0] || ''}
              onChange={(url) => {
                const imgs = JSON.parse(editorial.images || '[]')
                imgs[0] = url
                onChange({ ...editorial, images: JSON.stringify(imgs) })
              }}
              category="editorial"
              accept="image/*"
              aspectRatio="4/3"
            />
            <AdminMediaPicker
              label="Imagen 2"
              value={JSON.parse(editorial.images || '[]')[1] || ''}
              onChange={(url) => {
                const imgs = JSON.parse(editorial.images || '[]')
                imgs[1] = url
                onChange({ ...editorial, images: JSON.stringify(imgs) })
              }}
              category="editorial"
              accept="image/*"
              aspectRatio="4/3"
            />
            <AdminMediaPicker
              label="Imagen 3"
              value={JSON.parse(editorial.images || '[]')[2] || ''}
              onChange={(url) => {
                const imgs = JSON.parse(editorial.images || '[]')
                imgs[2] = url
                onChange({ ...editorial, images: JSON.stringify(imgs) })
              }}
              category="editorial"
              accept="image/*"
              aspectRatio="4/3"
            />
          </div>
        )}
        <div className="editorial-editor__fields">
          <input
            type="text"
            value={editorial.title}
            onChange={(e) => onChange({ ...editorial, title: e.target.value })}
            placeholder="Título de la sección"
            className="editorial-editor__title"
          />
          <input
            type="text"
            value={editorial.subtitle}
            onChange={(e) => onChange({ ...editorial, subtitle: e.target.value })}
            placeholder="Subtítulo"
            className="editorial-editor__subtitle"
          />
          <textarea
            value={editorial.paragraph}
            onChange={(e) => onChange({ ...editorial, paragraph: e.target.value })}
            placeholder="Párrafo descriptivo"
            rows={3}
            className="editorial-editor__paragraph"
          />
          <div className="editorial-editor__meta">
            <div className="editorial-editor__order">
              <label>Orden</label>
              <input
                type="number"
                value={editorial.order || 0}
                onChange={(e) => onChange({ ...editorial, order: parseInt(e.target.value) || 0 })}
                min="0"
                className="editorial-editor__order-input"
              />
            </div>
            <label className="editorial-editor__active">
              <input
                type="checkbox"
                checked={editorial.active !== false}
                onChange={(e) => onChange({ ...editorial, active: e.target.checked })}
              />
              Activo
            </label>
          </div>
          <div className="editorial-editor__actions">
            <button className="homepage-editor__btn homepage-editor__btn--save" onClick={onSave}>
              Guardar
            </button>
            {editorial.id && (
              <button className="homepage-editor__btn homepage-editor__btn--delete" onClick={onDelete}>
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}