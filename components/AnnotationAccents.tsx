import React from 'react'

type ClassValue = string | undefined

function cx(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(' ')
}

export function ScribbleCircle({
  className,
  stroke = '#ef4444',
}: {
  className?: string
  stroke?: string
}) {
  return (
    <svg
      className={cx('pointer-events-none', className)}
      viewBox="0 0 120 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 44c6-18 27-30 48-30 25 0 40 13 40 26 0 19-26 30-50 30-26 0-44-10-38-26Z"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <path
        d="M15 40c7-20 30-32 52-32 27 0 44 14 44 29 0 21-27 33-54 33-28 0-48-11-42-30Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.35"
      />
    </svg>
  )
}

export function ScribbleArrow({
  className,
  stroke = '#3b82f6',
}: {
  className?: string
  stroke?: string
}) {
  return (
    <svg
      className={cx('pointer-events-none', className)}
      viewBox="0 0 120 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 56c26-10 47-22 74-38"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M83 16l14 2-8 11"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LaserPointer({
  className,
}: {
  className?: string
}) {
  return (
    <div
      className={cx(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      <div className="laser-dot" />
    </div>
  )
}

export function ScribbleStroke({
  className,
  stroke = '#f59e0b',
}: {
  className?: string
  stroke?: string
}) {
  return (
    <svg
      className={cx('pointer-events-none', className)}
      viewBox="0 0 220 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 28c32-14 60-18 92-18 38 0 68 7 108 18"
        stroke={stroke}
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.22"
      />
      <path
        d="M12 30c34-15 62-19 94-19 39 0 70 7 110 19"
        stroke={stroke}
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.12"
      />
    </svg>
  )
}
