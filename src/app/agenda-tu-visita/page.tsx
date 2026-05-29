'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import './agenda-tu-visita.css'

interface FormData {
  nombre: string
  correo: string
  celular: string
  mensaje: string
  website: string
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export default function AgendaTuVisitaPage() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    correo: '',
    celular: '',
    mensaje: '',
    website: ''
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'Ingresa un correo válido'
    }

    if (!formData.celular.trim()) {
      newErrors.celular = 'El número de celular es requerido'
    } else if (!/^[0-9+\s\-()]{7,}$/.test(formData.celular)) {
      newErrors.celular = 'Ingresa un número válido'
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setStatus('sending')

    try {
      const response = await fetch('/api/agenda-visita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ nombre: '', correo: '', celular: '', mensaje: '', website: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const resetForm = () => {
    setStatus('idle')
  }

  return (
    <div className="whole-layout">
      <Header />

      <main id="mid">
        <PageHero
          image="/uploads/2024/09/slidernosotros.jpg"
          title="Agenda tu Visita"
          overlayEnabled={true}
          overlayOpacity={0.5}
        />

        <section className="agenda-section">
          <div className="agenda-container">
            <div className="agenda-header">
              <h1 className="agenda-title">AGENDA TU VISITA</h1>
              <p className="agenda-subtitle">
                Completa el formulario y nos pondremos en contacto contigo para agendar tu visita a Manzana40
              </p>
            </div>

            {status === 'success' ? (
              <div className="agenda-success">
                <div className="agenda-success__icon">✓</div>
                <h2 className="agenda-success__title">¡Mensaje enviado!</h2>
                <p className="agenda-success__text">
                  Gracias por tu interés. Nos pondremos en contacto contigo pronto.
                </p>
                <button className="agenda-success__button" onClick={resetForm}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form className="agenda-form" onSubmit={handleSubmit}>
                <input type="text" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="agenda-form__honeypot" aria-hidden="true" />

                <div className="agenda-form__field">
                  <label htmlFor="nombre" className="agenda-form__label">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`agenda-form__input ${errors.nombre ? 'agenda-form__input--error' : ''}`}
                    placeholder="Tu nombre completo"
                    disabled={status === 'sending'}
                  />
                  {errors.nombre && <span className="agenda-form__error">{errors.nombre}</span>}
                </div>

                <div className="agenda-form__field">
                  <label htmlFor="correo" className="agenda-form__label">Correo electrónico</label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className={`agenda-form__input ${errors.correo ? 'agenda-form__input--error' : ''}`}
                    placeholder="tu@correo.com"
                    disabled={status === 'sending'}
                  />
                  {errors.correo && <span className="agenda-form__error">{errors.correo}</span>}
                </div>

                <div className="agenda-form__field">
                  <label htmlFor="celular" className="agenda-form__label">Número de celular</label>
                  <input
                    type="tel"
                    id="celular"
                    name="celular"
                    value={formData.celular}
                    onChange={handleChange}
                    className={`agenda-form__input ${errors.celular ? 'agenda-form__input--error' : ''}`}
                    placeholder="+591 7 1234567"
                    disabled={status === 'sending'}
                  />
                  {errors.celular && <span className="agenda-form__error">{errors.celular}</span>}
                </div>

                <div className="agenda-form__field">
                  <label htmlFor="mensaje" className="agenda-form__label">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    className={`agenda-form__textarea ${errors.mensaje ? 'agenda-form__textarea--error' : ''}`}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={5}
                    disabled={status === 'sending'}
                  />
                  {errors.mensaje && <span className="agenda-form__error">{errors.mensaje}</span>}
                </div>

                {status === 'error' && (
                  <div className="agenda-form__server-error">
                    Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.
                  </div>
                )}

                <button
                  type="submit"
                  className="agenda-form__submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <span className="agenda-form__spinner" />
                  ) : (
                    'Enviar mensaje'
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
