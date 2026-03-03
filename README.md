# DevLinks

Personal developer link-in-bio page built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🌙 Dark theme with purple-to-blue gradient accents
- 📱 Fully responsive design (mobile-first)
- ⚡ Built with Next.js 14 App Router
- 🎨 Styled with Tailwind CSS and shadcn/ui components
- 🔗 Customizable link cards and social icons
- ♿ Accessible with proper ARIA labels and keyboard navigation
- 🚀 Optimized for performance and SEO

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/username/devlinks.git
cd devlinks
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Personal Information

Edit `src/lib/links.ts` to customize:
- Personal links and descriptions
- Social media profiles
- Contact information

### Styling

The design uses a carefully crafted color palette defined in `tailwind.config.ts`:
- Primary: `#8B5CF6` (Purple)
- Secondary: `#3B82F6` (Blue) 
- Background: `#0F172A` (Dark slate)
- Surface: `#1E293B` (Card backgrounds)

### Hero Section

Update `src/components/Hero.tsx` to change:
- Name and title
- Bio description
- Avatar (currently shows initials)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── Hero.tsx            # Hero section
│   ├── LinkCard.tsx        # Link card component
│   └── SocialIcon.tsx      # Social icon component
├── lib/
│   └── links.ts            # Links and social data
├── styles/
│   └── globals.css         # Global styles
└── types.ts                # TypeScript interfaces
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

If you find this project helpful, please give it a ⭐ on GitHub!