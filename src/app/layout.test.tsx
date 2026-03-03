import { render } from '@testing-library/react'
import RootLayout, { metadata } from '@/app/layout'

describe('RootLayout', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )
    
    expect(container.firstChild).toBeInTheDocument()
  })
  
  it('should render children', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )
    
    expect(getByText('Test Content')).toBeInTheDocument()
  })
  
  it('should have proper html structure', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )
    
    const html = container.querySelector('html')
    const body = container.querySelector('body')
    
    expect(html).toHaveAttribute('lang', 'en')
    expect(html).toHaveClass('dark')
    expect(body).toHaveClass('min-h-screen', 'bg-background', 'text-foreground', 'antialiased')
  })
  
  it('should include Inter font class', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )
    
    const body = container.querySelector('body')
    expect(body?.className).toMatch(/^__className_[a-z0-9]+/)
  })
})

describe('Metadata', () => {
  it('should have correct title', () => {
    expect(metadata.title).toBe('DevLinks - Personal Developer Links')
  })
  
  it('should have correct description', () => {
    expect(metadata.description).toBe(
      'Personal developer link-in-bio page showcasing projects, social profiles, and contact information.'
    )
  })
  
  it('should have correct keywords', () => {
    expect(metadata.keywords).toEqual(['developer', 'portfolio', 'links', 'bio', 'personal'])
  })
  
  it('should have authors', () => {
    expect(metadata.authors).toEqual([{ name: 'Developer' }])
  })
  
  it('should have viewport', () => {
    expect(metadata.viewport).toBe('width=device-width, initial-scale=1')
  })
  
  it('should have all required metadata properties', () => {
    expect(metadata).toHaveProperty('title')
    expect(metadata).toHaveProperty('description')
    expect(metadata).toHaveProperty('keywords')
    expect(metadata).toHaveProperty('authors')
    expect(metadata).toHaveProperty('viewport')
  })
})