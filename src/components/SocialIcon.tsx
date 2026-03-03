import { Github, Twitter, Linkedin, Mail, Globe } from 'lucide-react'
import type { Social } from '@/types'

interface SocialIconProps {
  social: Social
}

const iconMap = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  email: Mail,
  website: Globe,
} as const

export function SocialIcon({ social }: SocialIconProps): JSX.Element {
  const IconComponent = iconMap[social.icon as keyof typeof iconMap] || Globe
  
  const handleClick = (): void => {
    if (social.platform === 'email') {
      window.location.href = `mailto:${social.url}`
    } else {
      window.open(social.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <button
      onClick={handleClick}
      className="group p-3 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10"
      aria-label={`Visit ${social.platform}`}
      type="button"
    >
      <IconComponent className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
    </button>
  )
}