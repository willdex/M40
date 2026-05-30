'use client'

import { useState, useRef, useEffect } from 'react'

interface VideoOverlayClientProps {
  src: string
  poster: string
  className?: string
  videoClassName?: string
}

export default function VideoOverlayClient({ src, poster, className = '', videoClassName = 'elementor-video' }: VideoOverlayClientProps) {
  const [showOverlay, setShowOverlay] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setShowOverlay(false)
    const handlePause = () => setShowOverlay(true)
    const handleEnded = () => setShowOverlay(true)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  const handleOverlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  if (!src) {
    return null
  }

  return (
    <div className={`e-hosted-video elementor-wrapper elementor-open-inline ${className}`}>
      <video
        ref={videoRef}
        className={videoClassName}
        src={src}
        controls
        preload="metadata"
        controlsList="nodownload"
      />
      {showOverlay && (
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
      )}
    </div>
  )
}