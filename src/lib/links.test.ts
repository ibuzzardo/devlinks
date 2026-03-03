import { links, socials } from '@/lib/links'
import { Link, Social } from '@/types'

describe('Links Data', () => {
  describe('links array', () => {
    it('should be an array', () => {
      expect(Array.isArray(links)).toBe(true)
    })
    
    it('should contain Link objects', () => {
      links.forEach((link: Link) => {
        expect(link).toHaveProperty('id')
        expect(link).toHaveProperty('title')
        expect(link).toHaveProperty('description')
        expect(link).toHaveProperty('url')
        expect(link).toHaveProperty('icon')
      })
    })
    
    it('should have unique ids', () => {
      const ids = links.map(link => link.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
    
    it('should have valid URLs', () => {
      links.forEach((link: Link) => {
        expect(() => new URL(link.url)).not.toThrow()
      })
    })
    
    it('should have non-empty titles and descriptions', () => {
      links.forEach((link: Link) => {
        expect(link.title.trim()).not.toBe('')
        expect(link.description.trim()).not.toBe('')
      })
    })
    
    it('should have valid icons (emojis)', () => {
      links.forEach((link: Link) => {
        expect(link.icon).toMatch(/^[\u{1F000}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|🌐|💻|📝|📄|🎥|📧$/u)
      })
    })
    
    it('should contain expected number of links', () => {
      expect(links.length).toBe(6)
    })
    
    it('should have specific expected links', () => {
      const titles = links.map(link => link.title)
      expect(titles).toContain('Portfolio Website')
      expect(titles).toContain('GitHub Profile')
      expect(titles).toContain('Tech Blog')
      expect(titles).toContain('Resume/CV')
      expect(titles).toContain('YouTube Channel')
      expect(titles).toContain('Newsletter')
    })
  })
  
  describe('socials array', () => {
    it('should be an array', () => {
      expect(Array.isArray(socials)).toBe(true)
    })
    
    it('should contain Social objects', () => {
      socials.forEach((social: Social) => {
        expect(social).toHaveProperty('id')
        expect(social).toHaveProperty('platform')
        expect(social).toHaveProperty('url')
        expect(social).toHaveProperty('icon')
      })
    })
    
    it('should have unique ids', () => {
      const ids = socials.map(social => social.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
    
    it('should have valid URLs or email addresses', () => {
      socials.forEach((social: Social) => {
        if (social.platform === 'email') {
          expect(social.url).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        } else {
          expect(() => new URL(social.url)).not.toThrow()
        }
      })
    })
    
    it('should have valid platform names', () => {
      const validPlatforms = ['github', 'twitter', 'linkedin', 'email', 'website']
      socials.forEach((social: Social) => {
        expect(validPlatforms).toContain(social.platform)
      })
    })
    
    it('should have matching icon and platform', () => {
      socials.forEach((social: Social) => {
        expect(social.icon).toBe(social.platform)
      })
    })
    
    it('should contain expected number of socials', () => {
      expect(socials.length).toBe(5)
    })
    
    it('should have specific expected platforms', () => {
      const platforms = socials.map(social => social.platform)
      expect(platforms).toContain('github')
      expect(platforms).toContain('twitter')
      expect(platforms).toContain('linkedin')
      expect(platforms).toContain('email')
      expect(platforms).toContain('website')
    })
  })
})