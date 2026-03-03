import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'
import { links, socials } from '@/lib/links'

// Mock the components
jest.mock('@/components/Hero', () => ({
  Hero: () => <div data-testid="hero-component">Hero Component</div>
}))

jest.mock('@/components/LinkCard', () => ({
  LinkCard: ({ link }: { link: any }) => (
    <div data-testid={`link-card-${link.id}`}>{link.title}</div>
  )
}))

jest.mock('@/components/SocialIcon', () => ({
  SocialIcon: ({ social }: { social: any }) => (
    <div data-testid={`social-icon-${social.id}`}>{social.platform}</div>
  )
}))

describe('HomePage', () => {
  beforeEach(() => {
    render(<HomePage />)
  })
  
  it('should render without crashing', () => {
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
  
  it('should render Hero component', () => {
    expect(screen.getByTestId('hero-component')).toBeInTheDocument()
  })
  
  it('should render Quick Links section', () => {
    expect(screen.getByText('Quick Links')).toBeInTheDocument()
  })
  
  it('should render Connect With Me section', () => {
    expect(screen.getByText('Connect With Me')).toBeInTheDocument()
  })
  
  it('should render footer', () => {
    expect(screen.getByText('© 2024 DevLinks. Built with Next.js & Tailwind CSS.')).toBeInTheDocument()
  })
  
  it('should render all link cards', () => {
    links.forEach(link => {
      expect(screen.getByTestId(`link-card-${link.id}`)).toBeInTheDocument()
      expect(screen.getByText(link.title)).toBeInTheDocument()
    })
  })
  
  it('should render all social icons', () => {
    socials.forEach(social => {
      expect(screen.getByTestId(`social-icon-${social.id}`)).toBeInTheDocument()
      expect(screen.getByText(social.platform)).toBeInTheDocument()
    })
  })
  
  it('should have proper semantic structure', () => {
    const main = screen.getByRole('main')
    expect(main).toHaveClass('min-h-screen', 'bg-background')
  })
  
  it('should have proper container styling', () => {
    const container = screen.getByRole('main').firstChild
    expect(container).toHaveClass('container', 'mx-auto', 'px-4', 'py-8', 'max-w-2xl')
  })
  
  it('should have proper section headings', () => {
    const quickLinksHeading = screen.getByRole('heading', { name: 'Quick Links' })
    const connectHeading = screen.getByRole('heading', { name: 'Connect With Me' })
    
    expect(quickLinksHeading).toHaveClass('text-xl', 'font-semibold')
    expect(connectHeading).toHaveClass('text-xl', 'font-semibold')
  })
  
  it('should have proper grid layout for links', () => {
    const linksContainer = screen.getByTestId(`link-card-${links[0].id}`).parentElement
    expect(linksContainer).toHaveClass('grid', 'gap-4')
  })
  
  it('should have proper flex layout for social icons', () => {
    const socialsContainer = screen.getByTestId(`social-icon-${socials[0].id}`).parentElement
    expect(socialsContainer).toHaveClass('flex', 'justify-center', 'gap-4', 'flex-wrap')
  })
  
  it('should have proper spacing between sections', () => {
    const linksSection = screen.getByText('Quick Links').parentElement
    const socialsSection = screen.getByText('Connect With Me').parentElement
    const footer = screen.getByText('© 2024 DevLinks. Built with Next.js & Tailwind CSS.').parentElement
    
    expect(linksSection).toHaveClass('mt-12')
    expect(socialsSection).toHaveClass('mt-12')
    expect(footer).toHaveClass('mt-16')
  })
  
  it('should render correct number of links and socials', () => {
    expect(screen.getAllByTestId(/^link-card-/)).toHaveLength(links.length)
    expect(screen.getAllByTestId(/^social-icon-/)).toHaveLength(socials.length)
  })
  
  it('should have footer with proper styling', () => {
    const footer = screen.getByText('© 2024 DevLinks. Built with Next.js & Tailwind CSS.').parentElement
    expect(footer).toHaveClass('text-center', 'text-muted-foreground', 'text-sm')
  })
})