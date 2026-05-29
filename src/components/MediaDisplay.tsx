'use client'

import Image from 'next/image'
import './MediaDisplay.css'

interface MediaDisplayProps {
  src: string
  alt?: string
  category?: 'homepage' | 'heroes' | 'services' | 'icons' | 'videos'
  fill?: boolean
  priority?: boolean
  sizes?: string
  className?: string
  style?: React.CSSProperties
  objectFit?: 'cover' | 'contain' | 'fill'
}

export default function MediaDisplay({
  src,
  alt = '',
  category,
  fill = false,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  style,
  objectFit = 'cover'
}: MediaDisplayProps) {
  const isVideo = src?.match(/\.(mp4|webm)$/i) || category === 'videos'
  const isIcon = category === 'icons' || src?.includes('/icons/')

  if (!src) {
    return (
      <div className={`media-display media-display--placeholder ${className}`}>
        <span>Sin imagen</span>
      </div>
    )
  }

  if (isVideo) {
    return (
      <video
        className={`media-display media-display--video ${className}`}
        src={src}
        controls
        playsInline
        style={{ objectFit, ...style }}
      />
    )
  }

  if (fill) {
    return (
      <div className={`media-display media-display--fill ${isIcon ? 'media-display--icon' : ''} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="media-display__image"
          style={{ objectFit }}
        />
      </div>
    )
  }

  return (
    <div className={`media-display ${isIcon ? 'media-display--icon' : ''} ${className}`}>
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className="media-display__image"
        style={{ objectFit }}
      />
    </div>
  )
}