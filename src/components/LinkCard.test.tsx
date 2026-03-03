import { render, screen, fireEvent } from '@testing-library/react'
import { LinkCard } from '@/components/LinkCard'
import { Link } from '@/types'

// Mock window.open
const mockOpen = jest.fn()
Object.defineProperty(window, 'open', {
  value: mockOpen,
  writable: true
})

const mockLink: Link = {
  id: '1',
  title: 'Test Link',
  description: 'This is a test link description',
  url: 'https://example.com',
  icon: '🔗'
}

describe('LinkCard Component', () => {
  beforeEach(() => {
    mockOpen.mockClear()
  })
  
  it('should render without crashing', () => {
    render(<LinkCard link={mockLink} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
  
  it('should display link title', () => {
    render(<LinkCard link={mockLink} />)
    expect(screen.getByText('Test Link')).toBeInTheDocument()
  })
  
  it('should display link description', () => {
    render(<LinkCard link={mockLink} />)
    expect(screen.getByText('This is a test link description')).toBeInTheDocument()
  })
  
  it('should display link icon', () => {
    render(<LinkCard link={mockLink} />)
    expect(screen.getByText('🔗')).toBeInTheDocument()
  })
  
  it('should have proper ARIA label for icon', () => {
    render(<LinkCard link={mockLink} />)
    const icon = screen.getByLabelText('Test Link')
    expect(icon).toBeInTheDocument()
  })
  
  it('should open link in new tab when clicked', () => {
    render(<LinkCard link={mockLink} />)
    const card = screen.getByRole('button')
    
    fireEvent.click(card)
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://example.com',
      '_blank',
      'noopener,noreferrer'
    )
  })
  
  it('should open link when Enter key is pressed', () => {
    render(<LinkCard link={mockLink} />)
    const card = screen.getByRole('button')
    
    fireEvent.keyDown(card, { key: 'Enter' })
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://example.com',
      '_blank',
      'noopener,noreferrer'
    )
  })
  
  it('should open link when Space key is pressed', () => {
    render(<LinkCard link={mockLink} />)
    const card = screen.getByRole('button')
    
    fireEvent.keyDown(card, { key: ' ' })
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://example.com',
      '_blank',
      'noopener,noreferrer'
    )
  })
  
  it('should not open link for other keys', () => {
    render(<LinkCard link={mockLink} />)
    const card = screen.getByRole('button')
    
    fireEvent.keyDown(card, { key: 'Tab' })
    
    expect(mockOpen).not.toHaveBeenCalled()
  })
  
  it('should have proper accessibility attributes', () => {
    render(<LinkCard link={mockLink} />)
    const card = screen.getByRole('button')
    
    expect(card).toHaveAttribute('tabIndex', '0')
  })
  
  it('should have hover styling classes', () => {
    render(<LinkCard link={mockLink} />)
    const card = screen.getByRole('button')
    
    expect(card).toHaveClass(
      'hover:border-primary/50',
      'hover:shadow-lg',
      'hover:shadow-primary/10'
    )
  })
  
  it('should display external link icon', () => {
    render(<LinkCard link={mockLink} />)
    const externalIcon = document.querySelector('.lucide-external-link')
    expect(externalIcon).toBeInTheDocument()
  })
  
  it('should handle empty description', () => {
    const linkWithEmptyDesc = { ...mockLink, description: '' }
    render(<LinkCard link={linkWithEmptyDesc} />)
    
    expect(screen.getByText('Test Link')).toBeInTheDocument()
    expect(screen.queryByText('This is a test link description')).not.toBeInTheDocument()
  })
  
  it('should handle special characters in title and description', () => {
    const specialLink = {
      ...mockLink,
      title: 'Test & Special <Characters>',
      description: 'Description with "quotes" and \'apostrophes\''
    }
    
    render(<LinkCard link={specialLink} />)
    
    expect(screen.getByText('Test & Special <Characters>')).toBeInTheDocument()
    expect(screen.getByText('Description with "quotes" and \'apostrophes\'')).toBeInTheDocument()
  })
})