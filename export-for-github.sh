#!/bin/bash

# Create a clean export of the VIP Elite K9s project for GitHub upload
echo "🚀 Creating GitHub export package..."

# Create export directory
mkdir -p github-export

# Copy all project files (excluding .git and node_modules)
rsync -av --exclude='.git' --exclude='node_modules' --exclude='github-export' . github-export/

# Create a README for GitHub
cat > github-export/README.md << 'EOF'
# VIP Elite K9s Management System

A comprehensive dog boarding and training facility management system built with modern web technologies.

## Features

- **Multi-Role Authentication**: Admin dashboard, staff PIN login, client portal
- **Staff Management**: Time tracking, status monitoring, job assignment
- **Client Management**: Customer accounts, pet profiles, booking history
- **Kennel Management**: Real-time facility status, booking assignments
- **Financial System**: Estimates, invoices, pricing management
- **Booking Calendar**: Visual calendar with booking management
- **Reporting**: Daily reports and operational tracking

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS with custom design
- Shadcn/ui component library
- TanStack Query for state management

### Backend
- Node.js with Express.js
- PostgreSQL with Drizzle ORM
- Neon Database (serverless PostgreSQL)
- RESTful API design

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Database**
   - Create a PostgreSQL database (recommended: Neon Database)
   - Set DATABASE_URL environment variable
   - Run database migrations:
   ```bash
   npm run db:push
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Admin Dashboard: Login with username/password
   - Staff Interface: PIN-based login (4 digits)
   - Client Portal: Customer self-service interface

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                 # Express backend
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # Database operations
│   └── db.ts             # Database connection
├── shared/                 # Shared TypeScript schemas
│   └── schema.ts          # Drizzle database schema
└── migrations/            # Database migrations
```

## Environment Variables

```bash
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=development
```

## API Endpoints

- `GET /api/staff` - Staff management
- `GET /api/clients` - Client management
- `GET /api/dogs` - Pet profiles
- `GET /api/kennels` - Kennel status
- `GET /api/bookings` - Booking management
- `GET /api/estimates` - Financial estimates
- `GET /api/invoices` - Invoice management

## Design Features

- **Premium Design**: Black and gold color scheme with elegant borders
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Live status monitoring and updates
- **Intuitive Interface**: Easy-to-use design for all user types

## License

Private project for VIP Elite K9s Ltd.
EOF

echo "✅ Export package created in 'github-export' directory"
echo "📦 Files ready for GitHub upload:"
find github-export -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.json" -o -name "*.md" | head -20
echo "..."
echo "🎯 Total files: $(find github-export -type f | wc -l)"