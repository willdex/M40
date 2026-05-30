'use client'

import { useState, useRef, useEffect } from 'react'

interface YouTubeEmbedProps {
  url: string
  poster: string
  className?: string
}

export default function YouTubeEmbed({ url, poster, className = '' }: YouTubeEmbedProps) {
  const [showOverlay, setShowOverlay] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be')

  if (!isYouTube || !url) {
    return null
  }

  const videoId = extractYouTubeId(url)
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : url

  const handleOverlayClick = () => {
    setShowOverlay(false)
  }

  return (
    <div className={`elementor-wrapper elementor-open-inline ${className}`}>
      {showOverlay ? (
        <div
          className="elementor-custom-embed-image-overlay"
          style={{ backgroundImage: `url(${poster})` }}
          onClick={handleOverlayClick}
          role="button"
          aria-label="Reproducir vídeo"
          tabIndex={0}
        >
          <div className="elementor-custom-embed-play">
            <i aria-hidden="true" className="eicon-play"></i>
          </div>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          className="elementor-video"
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  )
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  return null
}