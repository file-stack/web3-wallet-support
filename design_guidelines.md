# Crypto Wallet Grid - Design Guidelines

## Design Approach
**System-Based**: Material Design principles for data-rich, scannable interfaces with clear visual feedback. This is a utility-focused component prioritizing discoverability and ease of selection.

## Layout System

**Container Structure**
- Max width: `max-w-7xl` for optimal scanning
- Padding: `px-6 py-12` (mobile), `px-8 py-16` (desktop)
- Centered layout with generous breathing room

**Grid Configuration**
- Mobile: 2 columns (`grid-cols-2`)
- Tablet: 4 columns (`md:grid-cols-4`)
- Desktop: 6 columns (`lg:grid-cols-6`)
- Large screens: 8 columns (`xl:grid-cols-8`)
- Gap: `gap-4` (mobile), `gap-6` (desktop) for balanced density

**Tailwind Spacing Primitives**: Use units of 2, 4, 6, 8, 12, 16 for consistent rhythm

## Typography

**Header**
- Font: `font-bold text-4xl` (desktop), `text-3xl` (mobile)
- Gradient text effect using `bg-gradient-to-r` from primary to accent
- Margin bottom: `mb-8` (mobile), `mb-12` (desktop)

**Subheader** (add below main title)
- Font: `text-lg font-normal opacity-70`
- Content: "Connect your preferred wallet to get started"
- Margin bottom: `mb-12`

## Component Design

**Wallet Cards**
- Background: Subtle gradient with glass morphism effect
- Border: 1px solid with low opacity
- Border radius: `rounded-2xl`
- Padding: `p-6`
- Shadow: Soft elevation, increased on hover
- Aspect ratio: Square for visual consistency

**Wallet Logo**
- Size: `h-20 w-20` (desktop), `h-16 w-16` (mobile)
- Object fit: `object-contain`
- Centered within card

**Wallet Name Tooltip**
- Position: Absolute, bottom of card on hover
- Background: Semi-transparent dark overlay with backdrop blur
- Typography: `text-sm font-medium`
- Padding: `px-3 py-2`
- Border radius: `rounded-lg`
- Opacity transition: Fade in on hover

## Interactions & Animations

**Card Hover States**
- Transform: Subtle lift `-translate-y-2`
- Scale: Very slight growth `scale-105`
- Shadow: Enhanced elevation
- Border: Increased brightness
- Transition: All properties at `duration-300 ease-out`

**Loading States**
- Shimmer effect on cards while logos load
- Skeleton using gradient animation
- Smooth fade-in when logo loads

**Click Feedback**
- Active state: `scale-98` with increased shadow
- Ripple effect optional (Material Design pattern)

## Visual Enhancements

**Background Treatment**
- Animated gradient mesh or subtle geometric pattern
- Low opacity to maintain readability
- Radial gradients creating depth

**Card Surface**
- Frosted glass effect: `backdrop-blur-md`
- Semi-transparent background: `bg-white/60` (light), `bg-slate-800/60` (dark)
- Border highlight: `border-white/20` (light), `border-white/10` (dark)

**Empty State Preparation**
- If no wallets display: Show placeholder with icon and "Coming soon" message

## Accessibility

- Ensure all wallet links have proper `aria-label` attributes
- Maintain minimum touch target size of 44x44px
- High contrast ratios for dark mode
- Keyboard navigation with visible focus states using `focus:ring-2`
- Reduced motion support: Disable animations for users with `prefers-reduced-motion`

## Dark Mode Strategy

- Use Tailwind's `dark:` variant throughout
- Light mode: White/gray backgrounds with subtle shadows
- Dark mode: Dark slate backgrounds with lighter borders
- Ensure logos remain visible in both modes (add subtle background if needed)

## Images

No hero images required for this component. All visual content comes from wallet logos fetched from external URLs.