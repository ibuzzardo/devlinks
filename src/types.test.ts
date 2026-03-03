import { Link, Social, ApiError } from '@/types'

describe('Types', () => {
  describe('Link interface', () => {
    it('should have all required properties', () => {
      const link: Link = {
        id: '1',
        title: 'Test Link',
        description: 'Test description',
        url: 'https://example.com',
        icon: '🔗'
      }
      
      expect(link.id).toBeDefined()
      expect(link.title).toBeDefined()
      expect(link.description).toBeDefined()
      expect(link.url).toBeDefined()
      expect(link.icon).toBeDefined()
    })
    
    it('should accept string values for all properties', () => {
      const link: Link = {
        id: 'test-id',
        title: 'Test Title',
        description: 'Test Description',
        url: 'https://test.com',
        icon: '🌐'
      }
      
      expect(typeof link.id).toBe('string')
      expect(typeof link.title).toBe('string')
      expect(typeof link.description).toBe('string')
      expect(typeof link.url).toBe('string')
      expect(typeof link.icon).toBe('string')
    })
  })
  
  describe('Social interface', () => {
    it('should have all required properties', () => {
      const social: Social = {
        id: '1',
        platform: 'github',
        url: 'https://github.com/user',
        icon: 'github'
      }
      
      expect(social.id).toBeDefined()
      expect(social.platform).toBeDefined()
      expect(social.url).toBeDefined()
      expect(social.icon).toBeDefined()
    })
    
    it('should accept string values for all properties', () => {
      const social: Social = {
        id: 'social-1',
        platform: 'twitter',
        url: 'https://twitter.com/user',
        icon: 'twitter'
      }
      
      expect(typeof social.id).toBe('string')
      expect(typeof social.platform).toBe('string')
      expect(typeof social.url).toBe('string')
      expect(typeof social.icon).toBe('string')
    })
  })
  
  describe('ApiError interface', () => {
    it('should have all required properties', () => {
      const error: ApiError = {
        error: 'Not Found',
        message: 'Resource not found',
        statusCode: 404
      }
      
      expect(error.error).toBeDefined()
      expect(error.message).toBeDefined()
      expect(error.statusCode).toBeDefined()
    })
    
    it('should accept correct types for properties', () => {
      const error: ApiError = {
        error: 'Internal Server Error',
        message: 'Something went wrong',
        statusCode: 500
      }
      
      expect(typeof error.error).toBe('string')
      expect(typeof error.message).toBe('string')
      expect(typeof error.statusCode).toBe('number')
    })
  })
})