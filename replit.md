# VIP Elite K9s Management System

## Overview

This is a comprehensive dog boarding and training facility management system built with React (frontend) and Express.js (backend). The application handles staff management, client management, dog boarding, job scheduling, and facility operations for VIP Elite K9s.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Authentication**: Simple password-based auth for admins, PIN-based for staff
- **API Design**: RESTful JSON API with consistent error handling

### Database Schema
The system uses PostgreSQL with the following main entities:
- **Users**: Admin authentication (username/password)
- **Staff**: Employee management with PIN-based login and time tracking
- **Clients**: Customer accounts with authentication
- **Dogs**: Pet profiles linked to clients with detailed care instructions
- **Kennels**: Facility management for boarding spaces
- **Jobs**: Task scheduling and assignment system
- **Bookings**: Reservation management
- **Daily Reports**: Operational reporting
- **Invoices**: Billing and payment tracking

## Key Components

### Authentication System
- **Multi-role authentication**: Admins use username/password, staff use 4-digit PINs
- **Session management**: Client-side storage with React Context
- **Role-based access**: Different interfaces for admin, staff, and clients

### Staff Management
- **Time tracking**: Clock in/out, break management
- **Status monitoring**: Real-time staff availability (clocked in, on break, clocked out)
- **PIN-based login**: Secure 4-digit authentication for quick staff access
- **Profile management**: Photos, roles, and contact information

### Facility Management
- **Kennel grid**: Visual representation of boarding facility
- **Status tracking**: Available, occupied, cleaning states
- **Dog assignment**: Link dogs to specific kennels with check-in/out dates

### Job Scheduling
- **Task assignment**: Assign jobs to specific staff members
- **Time scheduling**: Date and time-based job planning
- **Status tracking**: Pending, in progress, completed states
- **Notes system**: Detailed job completion tracking

### Client Portal
- **Self-service interface**: Clients can manage their accounts and bookings
- **Pet management**: Add and update dog profiles
- **Booking system**: Reserve services and view history

## Data Flow

1. **Authentication Flow**: Users/staff authenticate through role-specific login screens
2. **Dashboard Data**: Real-time queries fetch staff status, kennel occupancy, and daily stats
3. **Job Management**: Jobs are created, assigned, and tracked through completion
4. **Kennel Operations**: Real-time updates on boarding status and facility utilization
5. **Client Interactions**: Separate portal for customer self-service

## External Dependencies

### Database & ORM
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database queries and migrations
- **drizzle-zod**: Schema validation integration

### UI & Styling
- **@radix-ui/***: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **TypeScript**: Type safety across frontend and backend
- **Vite**: Fast development server and build tool
- **ESBuild**: Production bundling for server code

## Deployment Strategy

### Development Environment
- **Replit-optimized**: Configured for Replit development environment
- **Hot reload**: Vite HMR for instant frontend updates
- **Auto-restart**: Backend restarts on file changes during development

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: ESBuild bundles server code for Node.js deployment
- **Database**: Drizzle migrations handle schema updates
- **Deployment**: Configured for Replit's autoscale deployment target

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Port Configuration**: Express server on port 5000, mapped to external port 80
- **Static Serving**: Production builds serve frontend from Express

The system is designed as a monorepo with shared TypeScript schemas, enabling type safety across the full stack while maintaining clear separation between frontend and backend concerns.