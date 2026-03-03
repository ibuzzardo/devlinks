import { render, screen, fireEvent } from '@testing-library/react'
import { SocialIcon } from '@/components/SocialIcon'
import { Social } from '@/types'

// Mock window.open and window.location
const mockOpen = jest.fn()
const mockLocationHref = jest.fn()

Object.defineProperty(window, 'open', {
  value: mockOpen,
  writable: true
})

Object.defineProperty(window, 'location', {
  value: {
    href: mockLocationHref
  },
  writable: true
})

const mockGithubSocial: Social = {
  id: '1',
  platform: 'github',
  url: 'https://github.com/user',
  icon: 'github'
}

const mockEmailSocial: Social = {
  id: '2',
  platform: 'email',
  url: 'test@example.com',
  icon: 'email'
}

const mockUnknownSocial: Social = {
  id: '3',
  platform: 'unknown',
  url: 'https://unknown.com',
  icon: 'unknown'
}

describe('SocialIcon Component', () => {
  beforeEach(() => {
    mockOpen.mockClear()
    mockLocationHref.mockClear()
  })
  
  it('should render without crashing', () => {
    render(<SocialIcon social={mockGithubSocial} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
  
  it('should have proper ARIA label', () => {
    render(<SocialIcon social={mockGithubSocial} />)
    expect(screen.getByLabelText('Visit github')).toBeInTheDocument()
  })
  
  it('should render GitHub icon for github platform', () => {
    render(<SocialIcon social={mockGithubSocial} />)
    const icon = document.querySelector('.lucide-github')
    expect(icon).toBeInTheDocument()
  })
  
  it('should render Mail icon for email platform', () => {
    render(<SocialIcon social={mockEmailSocial} />)
    const icon = document.querySelector('.lucide-mail')
    expect(icon).toBeInTheDocument()
  })
  
  it('should render Globe icon for unknown platform', () => {
    render(<SocialIcon social={mockUnknownSocial} />)
    const icon = document.querySelector('.lucide-globe')
    expect(icon).toBeInTheDocument()
  })
  
  it('should open URL in new tab for non-email platforms', () => {
    render(<SocialIcon social={mockGithubSocial} />)
    const button = screen.getByRole('button')
    
    fireEvent.click(button)
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://github.com/user',
      '_blank',
      'noopener,noreferrer'
    )
  })
  
  it('should open mailto link for email platform', () => {
    render(<SocialIcon social={mockEmailSocial} />)
    const button = screen.getByRole('button')
    
    fireEvent.click(button)
    
    expect(mockLocationHref).toHaveBeenCalledWith('mailto:test@example.com')
  })
  
  it('should have proper button type', () => {
    render(<SocialIcon social={mockGithubSocial} />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
  })
  
  it('should have hover styling classes', () => {
    render(<SocialIcon social={mockGithubSocial} />)
    const button = screen.getByRole('button')
    
    expect(button).toHaveClass(
      'hover:border-primary/50',
      'hover:bg-primary/10',
      'hover:shadow-lg',
      'hover:shadow-primary/10'
    )
  })
  
  it('should render all supported social icons correctly', () => {
    const socials: Social[] = [
      { id: '1', platform: 'github', url: 'https://github.com', icon: 'github' },
      { id: '2', platform: 'twitter', url: 'https://twitter.com', icon: 'twitter' },
      { id: '3', platform: 'linkedin', url: 'https://linkedin.com', icon: 'linkedin' },
      { id: '4', platform: 'email', url: 'test@example.com', icon: 'email' },
      { id: '5', platform: 'website', url: 'https://website.com', icon: 'website' }
    ]
    
    socials.forEach(social => {
      const { unmount } = render(<SocialIcon social={social} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
      unmount()
    })
  })
  
  it('should handle keyboard navigation', () => {
    render(<SocialIcon social={mockGithubSocial} />)
    const button = screen.getByRole('button')
    
    expect(button).toBeVisible()
    button.focus()
    expect(document.activeElement).toBe(button)
  })
  
  it('should handle edge case with empty URL', () => {
    const emptyUrlSocial = { ...mockGithubSocial, url: '' }
    render(<SocialIcon social={emptyUrlSocial} />)
    const button = screen.getByRole('button')
    
    fireEvent.click(button)
    
    expect(mockOpen).toHaveBeenCalledWith('', '_blank', 'noopener,noreferrer')
  })
  
  it('should handle edge case with malformed email', () => {
    const malformedEmailSocial = {
      ...mockEmailSocial,
      url: 'not-an-email'
    }
    
    render(<SocialIcon social={malformedEmailSocial} />)
    const button = screen.getByRole('button')
    
    fireEvent.click(button)
    
    expect(mockLocationHref).toHaveBeenCalledWith('mailto:not-an-email')
  })
})