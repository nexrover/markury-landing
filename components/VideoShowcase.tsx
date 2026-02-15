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

interface VideoShowcaseProps {
  videoSrc: string
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
        src={videoSrc}
        poster={poster}
        className="w-full h-full object-cover cursor-pointer"
        playsInline
        loop={false}
        muted={isMuted}
        onClick={togglePlay}
      />

      {/* Center Play/Pause overlay (click-to-play) */}
      {(!isPlaying || isEnded) && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
          onClick={togglePlay}
        >
          <div className="relative">
            {/* Pulse ring */}
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            <div className="bg-white/90 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center shadow-2xl border border-white/50 transition-transform duration-200 hover:scale-110">
              {isEnded ? (
                <RepeatIcon className="w-8 h-8 text-gray-900" />
              ) : (
                <PlayIcon className="w-8 h-8 text-gray-900 ml-1" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Gradient overlay at bottom for controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Controls bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 px-4 pb-4 pt-8 transition-all duration-300 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {/* Progress Bar */}
        <div
          ref={progressRef}
          className="relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer mb-3 group/progress hover:h-2.5 transition-all duration-150"
          onMouseDown={handleProgressMouseDown}
        >
          {/* Buffered */}
          <div
            className="absolute top-0 left-0 h-full bg-white/20 rounded-full"
            style={{ width: `${buffered}%` }}
          />
          {/* Progress */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-none"
            style={{ width: `${progress}%` }}
          />
          {/* Scrubber thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-blue-500 transition-opacity duration-150 ${
              isSeeking ? 'opacity-100 scale-125' : 'opacity-0 group-hover/progress:opacity-100'
            }`}
            style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between">
          {/* Left controls */}
          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="p-2 hover:bg-white/15 rounded-lg text-white transition-colors duration-150"
              title={isEnded ? 'Replay' : isPlaying ? 'Pause' : 'Play'}
            >
              {isEnded ? (
                <RepeatIcon className="w-5 h-5" />
              ) : isPlaying ? (
                <PauseIcon className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5" />
              )}
            </button>

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
                className="p-2 hover:bg-white/15 rounded-lg text-white transition-colors duration-150"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeOffIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <VolumeHighIcon className="w-5 h-5" />
                )}
              </button>
              {/* Volume slider */}
              <div
                className={`flex items-center overflow-hidden transition-all duration-200 ${
                  showVolumeSlider ? 'w-24 opacity-100 ml-1' : 'w-0 opacity-0'
                }`}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-3
                    [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:shadow-sm
                    [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            </div>

            {/* Time display */}
            <span className="text-white/70 text-xs font-mono ml-2 tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/15 rounded-lg text-white transition-colors duration-150"
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
      </div>
    </div>
  )
}
