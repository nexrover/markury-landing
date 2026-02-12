'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { 
  ArrowLeft02Icon, 
  ArrowRight02Icon, 
  PlayIcon, 
  PauseIcon, 
  VolumeHighIcon, 
  VolumeOffIcon, 
  ArrowExpand01Icon,
  ArrowShrink01Icon
} from 'hugeicons-react'

interface VideoComparisonProps {
  videoSrc1: string
  videoSrc2: string
  poster1?: string
  poster2?: string
  label1?: string
  label2?: string
  className?: string
}

export default function VideoComparison({
  videoSrc1,
  videoSrc2,
  poster1,
  poster2,
  label1 = "Before",
  label2 = "After",
  className,
}: VideoComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)

  // Handle slider drag
  const handleMove = useCallback(
    (clientX: number) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
        const percent = (x / rect.width) * 100
        setSliderPosition(percent)
        
        // Unmute on first interaction - DISABLED per user request
        if (!hasInteracted) {
          setHasInteracted(true)
          // setIsMuted(false) // Removed auto-unmute
        }
      }
    },
    [hasInteracted]
  )

  const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    handleMove(clientX)
  }

  const onMouseUp = () => {
    setIsDragging(false)
  }

  const onMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
        handleMove(clientX)
      }
    },
    [isDragging, handleMove]
  )

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
      window.addEventListener('touchmove', onMouseMove)
      window.addEventListener('touchend', onMouseUp)
    } else {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onMouseMove)
      window.removeEventListener('touchend', onMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onMouseMove)
      window.removeEventListener('touchend', onMouseUp)
    }
  }, [isDragging, onMouseMove])

  // Sync videos and handle audio
  useEffect(() => {
    const v1 = video1Ref.current
    const v2 = video2Ref.current

    if (v1 && v2) {
      if (isMuted) {
        v1.muted = true
        v2.muted = true
      } else {
        v1.muted = false
        v2.muted = false
        
        // Volume mixing
        // Left video (Video 1) visible on Right side of slider? No.
        // Let's clarify:
        // Background: Video 2 (Right/After)
        // Foreground: Video 1 (Left/Before), clipped.
        // Video 1 is visible from 0 to Slider.
        // Video 2 is visible from Slider to 100.
        
        // If Slider is at 100%: All Video 1. Hear Video 1.
        // If Slider is at 0%: All Video 2. Hear Video 2.
        
        const v1Vol = Math.max(0, Math.min(1, sliderPosition / 100))
        const v2Vol = Math.max(0, Math.min(1, 1 - (sliderPosition / 100)))
        
        v1.volume = v1Vol
        v2.volume = v2Vol
      }
    }
  }, [sliderPosition, isMuted])

  // Play/Pause Control
  const togglePlay = useCallback(() => {
    const v1 = video1Ref.current
    const v2 = video2Ref.current
    if (v1 && v2) {
      if (isPlaying) {
        v1.pause()
        v2.pause()
      } else {
        v1.play().catch(() => {})
        v2.play().catch(() => {})
        // Sync on resume
        v2.currentTime = v1.currentTime
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  // Mute Control
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
    if (!hasInteracted) setHasInteracted(true)
  }, [hasInteracted])

  // Fullscreen Control
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }, [])

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])
  
  // Sync playback loop
  useEffect(() => {
    const v1 = video1Ref.current
    const v2 = video2Ref.current
    if (!v1 || !v2) return

    const syncPlay = () => {
      if (!isPlaying) return
      // If desync > 0.1s, sync v2 to v1
      if (Math.abs(v1.currentTime - v2.currentTime) > 0.1) {
        v2.currentTime = v1.currentTime
      }
    }
    
    // Attempt play on mount
    v1.play().catch(() => setIsPlaying(false))
    v2.play().catch(() => setIsPlaying(false))
    
    const interval = setInterval(syncPlay, 1000)
    return () => clearInterval(interval)
  }, []) // Empty dependency array to run once on mount

  return (
    <div 
      ref={containerRef}
      className={`relative select-none overflow-hidden group bg-black ${className}`}
    >
      {/* Video 2 (Background / Right Side Content / "After") */}
      <video
        ref={video2Ref}
        src={videoSrc2}
        poster={poster2}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        loop
        muted={isMuted}
      />

      {/* Video 1 (Foreground / Left Side Content / "Before") */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <video
          ref={video1Ref}
          src={videoSrc1}
          poster={poster1}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          loop
          muted={isMuted}
        />
      </div>

      {/* Labels */}
      <div 
        className="absolute top-4 left-4 z-20 pointer-events-none transition-opacity duration-300"
        style={{ opacity: Math.max(0, Math.min(1, (sliderPosition - 10) / 10)) }}
      >
        <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/10">
          {label1}
        </div>
      </div>
      <div 
        className="absolute top-4 right-4 z-20 pointer-events-none transition-opacity duration-300"
        style={{ opacity: Math.max(0, Math.min(1, (90 - sliderPosition) / 10)) }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg border border-white/20 tracking-wide">
          {label2}
        </div>
      </div>

      {/* Controls (Bottom Center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={togglePlay}
          className="p-1.5 hover:bg-white/20 rounded-full text-white transition-colors"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
        </button>
        
        <div className="w-px h-4 bg-white/20 mx-1" />
        
        <button 
          onClick={toggleMute}
          className="p-1.5 hover:bg-white/20 rounded-full text-white transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeOffIcon className="w-5 h-5 text-gray-400" /> : <VolumeHighIcon className="w-5 h-5" />}
        </button>

        <div className="w-px h-4 bg-white/20 mx-1" />

        <button 
          onClick={toggleFullscreen}
          className="p-1.5 hover:bg-white/20 rounded-full text-white transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <ArrowShrink01Icon className="w-5 h-5" /> : <ArrowExpand01Icon className="w-5 h-5" />}
        </button>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-12 -translate-x-1/2 cursor-grab active:cursor-grabbing z-20 flex justify-center group/slider"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
      >
        {/* Visible Line */}
        <div className="w-1 h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

        {/* Handle Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            {/* Pulse Effect */}
            <div className="absolute w-full h-full bg-blue-400 rounded-full animate-ping opacity-75" />
            
            {/* Button */}
            <div className="bg-blue-500 rounded-full p-2 shadow-lg flex items-center justify-center relative z-10">
                <ArrowLeft02Icon className="w-4 h-4 text-white" />
                <ArrowRight02Icon className="w-4 h-4 text-white" />
            </div>
        </div>
      </div>
      
      {/* Initial hint overlay (fades out after interaction) */}
      {!hasInteracted && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 opacity-80">
             <div className="bg-black/60 text-white px-5 py-2.5 rounded-full backdrop-blur shadow-xl text-sm font-medium border border-white/10">
                Drag slider to compare
             </div>
        </div>
      )}
    </div>
  )
}
