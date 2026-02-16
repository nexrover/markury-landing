'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  PlayIcon,
  PauseIcon,
  VolumeHighIcon,
  VolumeOffIcon,
  ArrowExpand01Icon,
  ArrowShrink01Icon,
  RepeatIcon,
} from 'hugeicons-react'

interface VideoSource {
  src: string
  type: string
}

interface VideoShowcaseProps {
  videoSrc: string | VideoSource[]
  poster?: string
  className?: string
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function VideoShowcase({
  videoSrc,
  poster,
  className,
}: VideoShowcaseProps) {
  // ... state declarations ...
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isEnded, setIsEnded] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // ... rest of the component implementation ...
  // Skipping unchanged parts for replace_file_content match

  // Auto-hide controls
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }, [isPlaying])

  const handleMouseMove = useCallback(() => {
    resetControlsTimeout()
  }, [resetControlsTimeout])

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 1500)
    }
  }, [isPlaying])

  // Play/Pause
  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (isEnded) {
      video.currentTime = 0
      setIsEnded(false)
      video.play().catch(() => {})
      setIsPlaying(true)
      return
    }

    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
    } else {
      video.play().catch(() => {})
      setIsPlaying(true)
    }
    resetControlsTimeout()
  }, [isPlaying, isEnded, resetControlsTimeout])

  // Mute
  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (isMuted) {
      video.muted = false
      video.volume = volume
      setIsMuted(false)
    } else {
      video.muted = true
      setIsMuted(true)
    }
  }, [isMuted, volume])

  // Volume change
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    video.volume = newVolume
    if (newVolume === 0) {
      video.muted = true
      setIsMuted(true)
    } else {
      video.muted = false
      setIsMuted(false)
    }
  }, [])

  // Fullscreen
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

  // Progress bar seek
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    const bar = progressRef.current
    if (!video || !bar) return

    const rect = bar.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = x / rect.width
    video.currentTime = percent * video.duration
  }, [])

  const handleProgressMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsSeeking(true)
    handleProgressClick(e)
  }, [handleProgressClick])

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      if (!isSeeking) {
        setCurrentTime(video.currentTime)
        setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0)
      }
    }

    const onLoadedMetadata = () => {
      setDuration(video.duration)
      setIsLoaded(true)
    }

    const onProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        setBuffered(video.duration ? (bufferedEnd / video.duration) * 100 : 0)
      }
    }

    const onEnded = () => {
      setIsPlaying(false)
      setIsEnded(true)
      setShowControls(true)
    }

    const onPlay = () => {
      setIsPlaying(true)
      setIsEnded(false)
    }

    const onPause = () => {
      setIsPlaying(false)
      setShowControls(true)
    }

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('progress', onProgress)
    video.addEventListener('ended', onEnded)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('progress', onProgress)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [isSeeking])

  // Seeking via mouse move on progress bar
  useEffect(() => {
    if (!isSeeking) return

    const handleSeekMove = (e: MouseEvent) => {
      const video = videoRef.current
      const bar = progressRef.current
      if (!video || !bar) return
      const rect = bar.getBoundingClientRect()
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
      const percent = x / rect.width
      video.currentTime = percent * video.duration
      setProgress(percent * 100)
      setCurrentTime(percent * video.duration)
    }

    const handleSeekEnd = () => {
      setIsSeeking(false)
    }

    window.addEventListener('mousemove', handleSeekMove)
    window.addEventListener('mouseup', handleSeekEnd)
    return () => {
      window.removeEventListener('mousemove', handleSeekMove)
      window.removeEventListener('mouseup', handleSeekEnd)
    }
  }, [isSeeking])

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Only handle if this component or its children are focused
      if (!containerRef.current?.contains(document.activeElement) && document.activeElement !== document.body) return

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          togglePlay()
          break
        case 'm':
          e.preventDefault()
          toggleMute()
          break
        case 'f':
          e.preventDefault()
          toggleFullscreen()
          break
        case 'ArrowLeft':
          e.preventDefault()
          if (videoRef.current) videoRef.current.currentTime -= 5
          break
        case 'ArrowRight':
          e.preventDefault()
          if (videoRef.current) videoRef.current.currentTime += 5
          break
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [togglePlay, toggleMute, toggleFullscreen])

  // Auto-play muted on mount
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => setIsPlaying(false))
  }, [])

  console.log('VideoShowcase render:', { videoSrc, type: typeof videoSrc, isArray: Array.isArray(videoSrc) })

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden group bg-black ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        poster={poster}
        className="w-full h-full object-cover cursor-pointer"
        playsInline
        loop={true}
        muted={isMuted}
        onClick={togglePlay}
        preload="metadata"
        suppressHydrationWarning
      >
        {Array.isArray(videoSrc) ? (
          videoSrc.map((source, index) => (
            <source key={index} src={source.src} type={source.type} />
          ))
        ) : typeof videoSrc === 'string' ? (
          <source src={videoSrc} />
        ) : null}
      </video>

      {/* Center Play/Pause overlay (click-to-play) - Only show when paused and NOT seeking/dragging */}
      {(!isPlaying) && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
          onClick={togglePlay}
        >
          <div className="relative group/play-btn">
             {/* Pulse ring */}
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-0 group-hover/play-btn:opacity-100" style={{ animationDuration: '1.5s' }} />
            <div className="bg-black/60 backdrop-blur-md rounded-full w-20 h-20 flex items-center justify-center shadow-2xl border border-white/10 transition-transform duration-200 hover:scale-110">
              <PlayIcon className="w-8 h-8 text-white ml-1" />
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar (at very bottom) */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-300 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
         <div
          ref={progressRef}
          className="relative w-full h-1.5 bg-white/20 cursor-pointer group/progress transition-all duration-150"
          onMouseDown={handleProgressMouseDown}
        >
          {/* Buffered */}
          <div
            className="absolute top-0 left-0 h-full bg-white/20"
            style={{ width: `${buffered}%` }}
          />
          {/* Progress */}
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
           {/* Scrubber thumb - visible on hover */}
           <div
            className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform duration-150 ${
                isSeeking ? 'scale-100' : ''
            }`}
            style={{ left: `${progress}%` }}
           />
        </div>
      </div>

      {/* Controls Pill (Floating Bottom Center) */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-2xl transition-all duration-300 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="p-1.5 hover:bg-white/20 rounded-full text-white transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <PauseIcon className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5" />
              )}
            </button>

            <div className="w-px h-4 bg-white/20 mx-1" />

            {/* Volume */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => {
                if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current)
                setShowVolumeSlider(true)
              }}
              onMouseLeave={() => {
                volumeTimeoutRef.current = setTimeout(() => setShowVolumeSlider(false), 500)
              }}
            >
              <button
                onClick={toggleMute}
                className="p-1.5 hover:bg-white/20 rounded-full text-white transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeOffIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <VolumeHighIcon className="w-5 h-5" />
                )}
              </button>
              {/* Volume slider (expands to right) */}
              <div
                className={`flex items-center overflow-hidden transition-all duration-200 ease-out origin-left ${
                  showVolumeSlider ? 'w-20 opacity-100 ml-2 mr-1' : 'w-0 opacity-0'
                }`}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer h-1
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-2.5
                    [&::-webkit-slider-thumb]:h-2.5
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:shadow-sm"
                />
              </div>
            </div>

            <div className="w-px h-4 bg-white/20 mx-1" />

             {/* Time Display (Compact) */}
             <span className="text-white/80 text-[10px] font-medium font-mono tabular-nums px-1">
                {formatTime(currentTime)}
             </span>

             <div className="w-px h-4 bg-white/20 mx-1" />

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 hover:bg-white/20 rounded-full text-white transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <ArrowShrink01Icon className="w-5 h-5" />
              ) : (
                <ArrowExpand01Icon className="w-5 h-5" />
              )}
            </button>
      </div>
    </div>
  )
}
