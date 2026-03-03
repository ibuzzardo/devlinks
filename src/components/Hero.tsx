import Image from 'next/image'

export function Hero(): JSX.Element {
  return (
    <section className="text-center space-y-6">
      {/* Avatar */}
      <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
        <div className="w-full h-full bg-gradient-purple-blue flex items-center justify-center">
          <span className="text-4xl font-bold text-white">DL</span>
        </div>
      </div>
      
      {/* Name & Title */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          <span className="gradient-text">DevLinks</span>
        </h1>
        <p className="text-lg text-muted-foreground">Full Stack Developer</p>
      </div>
      
      {/* Bio */}
      <div className="max-w-md mx-auto">
        <p className="text-muted-foreground leading-relaxed">
          Passionate about building modern web applications with React, Next.js, and TypeScript. 
          Always learning and sharing knowledge with the developer community.
        </p>
      </div>
      
      {/* Gradient Accent Line */}
      <div className="w-24 h-1 bg-gradient-purple-blue rounded-full mx-auto"></div>
    </section>
  )
}