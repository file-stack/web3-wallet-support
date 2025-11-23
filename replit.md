# Crypto Wallet Grid Application

## Overview

This is a web application that displays a comprehensive grid of cryptocurrency wallets, allowing users to browse and connect to various wallet providers. The application showcases 24+ different crypto wallets including MetaMask, Trust Wallet, Coinbase Wallet, Ledger, and others, presented in a responsive, Material Design-inspired interface.

The application is built as a single-page application (SPA) with a focus on visual presentation and user experience, featuring smooth animations, glass morphism effects, and an adaptive grid layout that responds to different screen sizes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast HMR (Hot Module Replacement)
- **Wouter** for lightweight client-side routing (SPA navigation)
- **Framer Motion** for declarative animations and transitions

**Rationale**: This stack prioritizes developer experience and performance. Vite offers near-instantaneous dev server startup and updates, while Wouter provides routing without the overhead of React Router. Framer Motion enables sophisticated animations with minimal code.

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom theme configuration
- **Class Variance Authority (CVA)** for type-safe component variant management

**Design System**: The application follows a "New York" style variant of shadcn/ui with:
- Custom color system using HSL values with CSS variables for theme flexibility
- Consistent spacing using Tailwind's spacing scale (multiples of 2, 4, 6, 8, 12, 16)
- Material Design principles for data-rich, scannable interfaces
- Glass morphism effects with backdrop blur for modern aesthetics

**Alternatives Considered**: Component libraries like Material-UI or Ant Design were passed over in favor of shadcn/ui because it provides full ownership of component code (components live in the repository) while maintaining consistency and accessibility through Radix UI primitives.

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript running on Node.js
- Separate development (`index-dev.ts`) and production (`index-prod.ts`) entry points
- Development mode integrates Vite middleware for SSR-like experience with client-side routing

**Development vs Production Strategy**:
- **Development**: Vite dev server integrated as Express middleware, serving dynamic HTML with HMR
- **Production**: Express serves pre-built static assets from `dist/public` directory

**Rationale**: This architecture provides an optimal developer experience in development while maintaining simplicity in production. The development server auto-reloads on changes, while production serves optimized static bundles.

**API Structure**
- RESTful API pattern with routes registered in `server/routes.ts`
- All API routes prefixed with `/api`
- Centralized logging middleware tracking request duration and response status

**Storage Layer**
- Abstracted storage interface (`IStorage`) for data operations
- In-memory storage implementation (`MemStorage`) for development/demo purposes
- User management with UUID-based identification

**Pros**: The storage abstraction allows easy swapping between in-memory storage and persistent databases without changing application logic.

**Cons**: In-memory storage doesn't persist across server restarts, limiting it to development use.

### Data Storage Solution

**Database Configuration**
- **Drizzle ORM** configured for PostgreSQL (via `@neondatabase/serverless`)
- Schema-first approach with TypeScript type inference
- Migration support through `drizzle-kit`

**Schema Design** (from `shared/schema.ts`):
- `users` table with UUID primary keys, username, and password fields
- Zod schema integration for runtime validation via `drizzle-zod`

**Rationale**: Drizzle ORM provides type-safe database queries with minimal runtime overhead. The serverless PostgreSQL client from Neon enables edge deployment and connection pooling. Schema-to-TypeScript inference eliminates type drift between database and application.

**Current State**: The database is configured but not actively used in the current wallet grid implementation, which is purely presentational. The infrastructure is in place for future features requiring user authentication or data persistence.

### State Management

**Query Management**
- **TanStack Query (React Query)** for server state management
- Custom query client with infinite stale time (data never automatically refetched)
- Manual refetch control, disabled auto-refetch on window focus

**Rationale**: TanStack Query handles caching, background updates, and request deduplication. The aggressive caching strategy (infinite stale time) suits an application where wallet data is static.

**Local State**
- React hooks (`useState`, `useEffect`) for component-level state
- Theme preference persisted to localStorage with system preference detection
- No global state management library (Redux, Zustand, etc.) due to simple state requirements

### External Dependencies

**UI Component Primitives** (Radix UI)
- Comprehensive set of unstyled, accessible component primitives
- Including: Dialog, Dropdown Menu, Tooltip, Popover, Accordion, Tabs, and 20+ others
- All components support keyboard navigation and ARIA attributes out of the box

**Animation & Interaction**
- **Framer Motion**: Animation library for smooth transitions and gestures
- **Embla Carousel**: Touch-friendly carousel/slider component

**Form Handling**
- **React Hook Form** with `@hookform/resolvers` for form state and validation
- **Zod** for schema validation integrated with React Hook Form

**Styling Dependencies**
- **Tailwind CSS**: Utility-first CSS framework
- **clsx** & **tailwind-merge**: Class name merging utilities for conditional styling
- **PostCSS** with Autoprefixer for CSS processing

**Development Tools**
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Code navigation assistance
- **@replit/vite-plugin-dev-banner**: Development environment indicator

**Date Utilities**
- **date-fns**: Lightweight date manipulation library (alternative to moment.js)

**Third-Party Service Integration**
- Wallet logos fetched from external CDNs (GitHub raw content, official wallet websites)
- Google Fonts for typography (DM Sans, Architects Daughter, Fira Code, Geist Mono)

**Pros of External Logo Hosting**: Reduces bundle size and leverages CDN caching.

**Cons**: Dependency on third-party availability; logos may break if URLs change.