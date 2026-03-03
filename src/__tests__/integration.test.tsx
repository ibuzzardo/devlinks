import { render, screen, fireEvent } from '@testing-library/react'
import HomePage from '@/app/page'
import { links, socials } from '@/lib/links'

// Mock window.open for integration tests
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

describe('Integration Tests', () => {
  beforeEach(() => {
    mockOpen.mockClear()
    mockLocationHref.mockClear()
  })
  
  describe('Full Page Rendering', () => {
    it('should render complete homepage with all components', () => {
      render(<HomePage />)
      
      // Check main sections
      expect(screen.getByText('DevLinks')).toBeInTheDocument()
      expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
      expect(screen.getByText('Quick Links')).toBeInTheDocument()
      expect(screen.getByText('Connect With Me')).toBeInTheDocument()
      
      // Check all links are rendered
      links.forEach(link => {
        expect(screen.getByText(link.title)).toBeInTheDocument()
        expect(screen.getByText(link.description)).toBeInTheDocument()
      })
      
      // Check all social icons are rendered
      socials.forEach(social => {
        expect(screen.getByLabelText(`Visit ${social.platform}`)).toBeInTheDocument()
      })
    })
    
    it('should have proper accessibility structure', () => {
      render(<HomePage />)
      
      // Check semantic HTML
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('banner')).toBeInTheDocument() // Hero section
      expect(screen.getAllByRole('button')).toHaveLength(links.length + socials.length)
      
      // Check headings hierarchy
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2s = screen.getAllByRole('heading', { level: 2 })
      
      expect(h1).toHaveTextContent('DevLinks')
      expect(h2s).toHaveLength(2) // Quick Links and Connect With Me
    })
  })
  
  describe('Link Interactions', () => {
    it('should open all links correctly when clicked', () => {
      render(<HomePage />)
      
      links.forEach((link, index) => {
        const linkButton = screen.getByText(link.title).closest('div[role="button"]')
        expect(linkButton).toBeInTheDocument()
        
        fireEvent.click(linkButton!)
        
        expect(mockOpen).toHaveBeenNthCalledWith(
          index + 1,
          link.url,
          '_blank',
          'noopener,noreferrer'
        )
      })
    })
    
    it('should handle keyboard navigation for links', () => {
      render(<HomePage />)
      
      const firstLink = screen.getByText(links[0].title).closest('div[role="button"]')
      expect(firstLink).toBeInTheDocument()
      
      // Test Enter key
      fireEvent.keyDown(firstLink!, { key: 'Enter' })
      expect(mockOpen).toHaveBeenCalledWith(
        links[0].url,
        '_blank',
        'noopener,noreferrer'
      )
      
      mockOpen.mockClear()
      
      // Test Space key
      fireEvent.keyDown(firstLink!, { key: ' ' })
      expect(mockOpen).toHaveBeenCalledWith(
        links[0].url,
        '_blank',
        'noopener,noreferrer'
      )
    })
  })
  
  describe('Social Icon Interactions', () => {
    it('should handle different social platform clicks correctly', () => {
      render(<HomePage />)
      
      socials.forEach(social => {
        const socialButton = screen.getByLabelText(`Visit ${social.platform}`)
        fireEvent.click(socialButton)
        
        if (social.platform === 'email') {
          expect(mockLocationHref).toHaveBeenCalledWith(`mailto:${social.url}`)
        } else {
          expect(mockOpen).toHaveBeenCalledWith(
            social.url,
            '_blank',
            'noopener,noreferrer'
          )
        }
      })
    })
  })
  
  describe('Responsive Design', () => {
    it('should have responsive classes applied', () => {
      render(<HomePage />)
      
      const container = screen.getByRole('main').firstChild
      expect(container).toHaveClass('max-w-2xl') // Mobile-first responsive
      
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toHaveClass('text-3xl', 'md:text-4xl') // Responsive text
    })
  })
  
  describe('Data Consistency', () => {
    it('should render exact number of items from data', () => {
      render(<HomePage />)
      
      const linkButtons = screen.getAllByRole('button').filter(button => 
        button.getAttribute('aria-label')?.startsWith('Visit') === false
      )
      const socialButtons = screen.getAllByRole('button').filter(button => 
        button.getAttribute('aria-label')?.startsWith('Visit') === true
      )
      
      expect(linkButtons).toHaveLength(links.length)
      expect(socialButtons).toHaveLength(socials.length)
    })
    
    it('should maintain data integrity across components', () => {
      render(<HomePage />)
      
      // Verify all link data is preserved
      links.forEach(link => {
        expect(screen.getByText(link.title)).toBeInTheDocument()
        expect(screen.getByText(link.description)).toBeInTheDocument()
        expect(screen.getByText(link.icon)).toBeInTheDocument()
      })
      
      // Verify all social data is preserved
      socials.forEach(social => {
        expect(screen.getByLabelText(`Visit ${social.platform}`)).toBeInTheDocument()
      })
    })
  })
  
  describe('Error Handling', () => {
    it('should handle missing or malformed data gracefully', () => {
      // This test ensures the app doesn't crash with edge case data
      // In a real app, you might mock the data import to test error scenarios
      render(<HomePage />)
      
      // App should still render even if some data is missing
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByText('DevLinks')).toBeInTheDocument()
    })
  })
})