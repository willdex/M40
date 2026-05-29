'use client'

import { useState, useEffect, useCallback, createContext, useContext } from 'react'

interface ContentCache {
  [key: string]: {
    data: unknown
    timestamp: number
  }
}

const CACHE_DURATION = 60 * 1000

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

function createContentContext<T>() {
  interface ContextValue extends FetchState<T> {
    setData: (data: T) => void
  }
  
  const Context = createContext<ContextValue | null>(null)
  
  function Provider({ 
    children, 
    url, 
    initialData 
  }: { 
    children: React.ReactNode
    url: string
    initialData?: T
  }) {
    const [data, setData] = useState<T | null>(initialData || null)
    const [loading, setLoading] = useState(!initialData)
    const [error, setError] = useState<string | null>(null)

    const fetchContent = useCallback(async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch content')
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }, [url])

    useEffect(() => {
      if (!initialData) {
        fetchContent()
      }
    }, [url, initialData])

    return (
      <Context.Provider value={{ data, loading, error, refetch: fetchContent, setData }}>
        {children}
      </Context.Provider>
    )
  }

  function useContent() {
    const context = useContext(Context)
    if (!context) {
      throw new Error('useContent must be used within a ContentProvider')
    }
    return context
  }

  return { Provider, useContent }
}

export const { Provider: HomepageProvider, useContent: useHomepageContent } = createContentContext<{
  hero: {
    title: string
    subtitle: string
    video: string
    poster: string
  }
  contactPhone: string
  featuresTitle: string
  amenitiesTitle: string
  videoSection: {
    title: string
    youtubeUrl: string
    poster: string
  }
  services: Array<{
    id: string
    title: string
    description: string
    image: string
    href: string
  }>
  amenities: Array<{
    id: string
    title: string
    description: string
    icon: string
  }>
  footer: {
    aboutTitle: string
    aboutText: string
    servicesTitle: string
    contactTitle: string
    address: string
    phone: string
    email: string
    facebook: string | null
    instagram: string | null
  } | null
}>()

export function useServiceContent(serviceId: string) {
  const [service, setService] = useState<{
    id: string
    title: string
    description: string
    image: string
    href: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchService() {
      try {
        const response = await fetch(`/api/content/services`)
        if (!response.ok) throw new Error('Failed to fetch services')
        const services = await response.json()
        const found = services.find((s: { id: string }) => s.id === serviceId)
        setService(found || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchService()
  }, [serviceId])

  return { data: service, loading, error }
}

export function useAmenityContent(amenityId: string) {
  const [amenity, setAmenity] = useState<{
    id: string
    title: string
    description: string
    icon: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAmenity() {
      try {
        const response = await fetch(`/api/content/amenities`)
        if (!response.ok) throw new Error('Failed to fetch amenities')
        const amenities = await response.json()
        const found = amenities.find((a: { id: string }) => a.id === amenityId)
        setAmenity(found || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchAmenity()
  }, [amenityId])

  return { data: amenity, loading, error }
}

export default createContentContext