# Web3 Wallet Support - White & Glossy Blue Design

## Theme Overview
**White background with glossy blue accents** - Clean, professional, premium crypto aesthetic with modern glassmorphism effects.

### Color Palette
- **Primary Blue**: #3B82F6 (glossy, vibrant blue)
- **Secondary Blue**: #0EA5E9 (bright cyan/sky blue)
- **Accent Purple**: #A855F7 (complementary purple)
- **Background**: Pure white (#FFFFFF) - Light mode
- **Dark Background**: Deep blue-grey (#0F1B3E) - Dark mode
- **Text**: Dark blue-grey foreground with high contrast

## Glassmorphism Effects

### Glass Layers
1. **glass-nav**: Navigation bar with 25px blur, subtle blue tint, glossy inset highlights
2. **glass-card**: Wallet cards with 20px blur, gradient overlay, dual shadow system
3. **glass-footer**: Footer with 20px blur, semi-transparent blue undertone

### Key Properties
- **Backdrop Blur**: 20-25px for depth
- **Saturation Boost**: 1.3-1.5 for vivid colors
- **Border Colors**: Blue-based with 15-30% opacity
- **Inset Shadows**: White highlights on light mode, blue on dark mode for glossy effect
- **Outer Shadows**: Blue-tinted with enhanced blur radius

## Layout

### Hero Section
- **Title**: Bold 5xl-7xl sans-serif, deep blue-grey text
- **Subtitle**: 2xl muted blue-grey with primary blue accents
- **Spacing**: Generous padding (py-16 md:py-24) with max-w-6xl container

### Stats Section
- **Grid**: 3 columns with blue-bordered top/bottom
- **Numbers**: Large 4xl-5xl in glossy blue
- **Labels**: Muted secondary text

### Wallet Grid
- **Responsive**: 4 cols (mobile) → 5 (sm) → 6 (md) → 8 (lg) → 10 (xl)
- **Card Style**: glass-card class with hover lift animation
- **Logo Display**: Real wallet logos with fallback to wallet icon
- **Spacing**: Gap-3 (mobile), gap-4 (desktop)

## Components

### Navigation
- Glossy white background with blue borders
- Subtle elevation with inset light effect
- Logo + title on left, Docs/Blog links + theme toggle on right
- Smooth backdrop blur transition

### Wallet Cards
- Gradient glossy background: white to light blue
- Blue borders with soft glow shadow
- Logo centered with smooth opacity animation
- Hover: Lift effect (-8px), 1.05x scale, enhanced glow
- Tooltip on hover with wallet name

### Footer
- Semi-transparent blue background
- 4-column layout: Brand, Product, Resources, Company
- Subtle blue border-top with inset highlight

## Typography
- **Headings**: Bold, deep blue-grey (#1E3A8A or similar)
- **Body Text**: Muted blue-grey with good contrast
- **Links**: Primary blue (#3B82F6) with hover effect
- **Accent Text**: Secondary blue (#0EA5E9)

## Interactions
- **Hover States**: Lift (-8px), scale (1.05), enhanced blue glow
- **Active States**: Scale (0.98), shadow depth
- **Transitions**: 300ms ease-out for smooth motion
- **Loading**: Staggered fade-in animations

## Dark Mode Adaptations
- Background: Deep blue (#0F1B3E)
- Cards: Darker blue gradient
- Glass effects: Enhanced opacity for visibility
- Text: Light colors with blue tint
- Borders: Brighter blue (#6366F1, #60A5FA)
- Shadows: Blue-tinted instead of black

## Accessibility
- High contrast between blue text and white background
- Hover and focus states clearly visible
- Wallet icons with alt text
- Keyboard navigation support
- Reduced motion respected for animations
