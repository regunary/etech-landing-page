export interface HeroBannerProps {
    // Content
    title: string | React.ReactNode
    description?: string
    badge?: string
    footerText?: string

    // Background
    backgroundImage: string
    backgroundAlt?: string

    // Overlay
    showOverlay?: boolean
    overlayGradient?: string

    // Particles
    showParticles?: boolean
    lazyParticles?: boolean

    // Buttons
    primaryButton?: {
        text: string
        href: string
    }
    secondaryButton?: {
        text: string
        href: string
    }

    // Styling (parent controls)
    className?: string
    contentClassName?: string
    maxWidth?: string
    // Loading
    showSkeleton?: boolean
}

export interface ButtonProps {
    text: string
    href: string
    className?: string
}