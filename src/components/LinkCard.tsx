"use client"

import { ExternalLink } from 'lucide-react'
import type { Link } from '@/types'

interface LinkCardProps {
  link: Link
}

export function LinkCard({ link }: LinkCardProps): JSX.Element {
  const handleClick = (): void => {
    window.open(link.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div 
      onClick={handleClick}
      className="group cursor-pointer bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl" role="img" aria-label={link.title}>
              {link.icon}
            </span>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {link.title}
            </h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {link.description}
          </p>
        </div>
        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors ml-4 flex-shrink-0" />
      </div>
    </div>
  )
}