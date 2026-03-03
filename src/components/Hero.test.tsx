import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/Hero'

describe('Hero Component', () => {
  beforeEach(() => {
    render(<Hero />)
  })
  
  it('should render without crashing', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
  
  it('should display the main title', () => {
    expect(screen.getByText('DevLinks')).toBeInTheDocument()
  })
  
  it('should display the subtitle', () => {
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
  })
  
  it('should display the bio text', () => {
    const bioText = 'Passionate about building modern web applications with React, Next.js, and TypeScript.'
    expect(screen.getByText(bioText, { exact: false })).toBeInTheDocument()
  })
  
  it('should have avatar with initials', () => {
    expect(screen.getByText('DL')).toBeInTheDocument()
  })
  
  it('should have proper heading hierarchy', () => {
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent('DevLinks')
  })
  
  it('should have gradient styling classes', () => {
    const title = screen.getByText('DevLinks')
    expect(title).toHaveClass('gradient-text')
  })
  
  it('should have proper semantic structure', () => {
    const section = screen.getByRole('banner')
    expect(section).toHaveClass('text-center', 'space-y-6')
  })
  
  it('should have avatar with proper styling', () => {
    const avatar = screen.getByText('DL').parentElement
    expect(avatar).toHaveClass('bg-gradient-purple-blue')
  })
  
  it('should have gradient accent line', () => {
    const accentLine = document.querySelector('.bg-gradient-purple-blue.rounded-full')
    expect(accentLine).toBeInTheDocument()
  })
  
  it('should have responsive text classes', () => {
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveClass('text-3xl', 'md:text-4xl')
  })
  
  it('should have proper spacing and layout classes', () => {
    const bioContainer = screen.getByText('Passionate about building', { exact: false }).parentElement
    expect(bioContainer).toHaveClass('max-w-md', 'mx-auto')
  })
})