"use client"

import { Hero } from '@/components/Hero'
import { LinkCard } from '@/components/LinkCard'
import { SocialIcon } from '@/components/SocialIcon'
import { links, socials } from '@/lib/links'
import type { Link, Social } from '@/types'

export default function HomePage(): JSX.Element {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Hero Section */}
        <Hero />
        
        {/* Links Grid */}
        <section className="mt-12 space-y-4">
          <h2 className="text-xl font-semibold text-foreground mb-6">Quick Links</h2>
          <div className="grid gap-4">
            {links.map((link: Link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        </section>
        
        {/* Social Icons */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">Connect With Me</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {socials.map((social: Social) => (
              <SocialIcon key={social.id} social={social} />
            ))}
          </div>
        </section>
        
        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 DevLinks. Built with Next.js & Tailwind CSS.</p>
        </footer>
      </div>
    </main>
  )
}