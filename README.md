# VIP Elite K9s Management System

A comprehensive, modern staff and client management platform for premium dog boarding and training facilities. Built with React, Express.js, and PostgreSQL to streamline kennel operations through intelligent time tracking and wage management technology.

## 🌟 Key Features

### Multi-Role Authentication System
- **Admin Portal**: Full system access with username/password authentication
- **Staff Portal**: PIN-based authentication (4-digit secure codes) for quick staff access
- **Client Portal**: Self-service interface for pet owners

### Real-Time Staff Management
- **Live Time Tracking**: Clock in/out with break management and real-time hour accumulation
- **Status Monitoring**: Visual staff availability (clocked in, on break, clocked out)
- **Wage Calculation**: Minute-level precision wage tracking including active sessions
- **Profile Management**: Staff photos, roles, contact information, and hourly rates

### Facility Operations
- **Kennel Grid**: Visual representation of boarding facility with status tracking
- **Dog Assignment**: Link pets to specific kennels with check-in/out dates
- **Occupancy Management**: Available, occupied, and cleaning state tracking
- **Service Scheduling**: Assign tasks and services to staff members

### Task & Job Management
- **Task Assignment**: Create and assign jobs to specific staff members
- **Time Scheduling**: Date and time-based job planning with priorities
- **Progress Tracking**: Pending, in progress, and completed status monitoring
- **Notes System**: Detailed job completion and progress tracking

### Client & Pet Management
- **Pet Profiles**: Comprehensive dog information with photos and care instructions
- **Client Accounts**: Customer management with contact and emergency information
- **Booking System**: Service reservations with automated scheduling
- **Service History**: Complete record of all services and interactions

### Financial Management
- **Automated Invoicing**: Generate professional PDF invoices with company branding
- **Estimate Creation**: Auto-generated estimates from calendar bookings
- **Payment Tracking**: Monitor payment status and due dates
- **Pricing Management**: Flexible service pricing with per-unit configurations

### Daily Operations
- **Daily Reports**: Comprehensive staff reports for each dog interaction
- **Exercise Tracking**: Duration, type, and energy level monitoring
- **Health Monitoring**: Appetite, behavior changes, and health concerns
- **Feeding Management**: Times, amounts, and appetite tracking
- **Training Progress**: Commands, progress notes, and development tracking

### Advanced Features
- **PDF Generation**: Professional invoices and reports with custom branding
- **Real-Time Updates**: Live data synchronization across all interfaces
- **Payroll Integration**: Automated wage calculations with weekly/monthly reporting
- **Group Training**: Session management for group training classes
- **Calendar Integration**: Visual booking and scheduling system

## 🏗️ Technical Architecture

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **Shadcn/UI** components built on Radix UI primitives
- **Tailwind CSS** with custom design system (black and gold theme)
- **TanStack Query** for efficient server state management
- **Wouter** for lightweight client-side routing

### Backend
- **Node.js** with Express.js framework
- **PostgreSQL** with Drizzle ORM for type-safe database operations
- **Neon Database** for serverless PostgreSQL hosting
- **PDFKit** for professional document generation
- **RESTful API** design with consistent error handling

### Database Schema
- **Users**: Admin authentication and role management
- **Staff**: Employee profiles with PIN authentication and time tracking
- **Clients**: Customer accounts with comprehensive contact information
- **Dogs**: Pet profiles with detailed care instructions and medical information
- **Kennels**: Facility management with occupancy tracking
- **Bookings**: Service reservations with automated scheduling
- **Time Tracking**: Detailed staff time entries with wage calculations
- **Daily Reports**: Comprehensive operational reporting
- **Invoices & Estimates**: Financial management with PDF generation

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database (or Neon Database account)
- npm or yarn package manager

### Installation
1. Clone the repository
```bash
git clone https://github.com/your-org/vip-elite-k9s.git
cd vip-elite-k9s
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your database URL and other configuration
```

4. Initialize the database
```bash
npm run db:push
```

5. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📱 User Guide

### Admin Access
- Navigate to the admin portal
- Use username/password authentication
- Access all system features including staff management, financial reports, and system configuration

### Staff Access
- Select your profile from the staff portal
- Enter your 4-digit PIN
- Clock in/out, manage tasks, and complete daily reports

### Client Access
- Log in to the client portal
- Manage pet profiles, view booking history, and schedule services

## 🎨 Design System

The application features a sophisticated black and gold color scheme designed for premium branding:
- **Primary Colors**: Deep black backgrounds with gold accents
- **Typography**: Clean, modern fonts with excellent readability
- **Components**: Elegant borders and subtle gradients
- **Icons**: Lucide React icons for consistent visual language

## 📊 Key Metrics & Reporting

### Staff Performance
- Real-time attendance tracking
- Hourly wage calculations with active session inclusion
- Task completion rates and efficiency metrics
- Break time monitoring and compliance

### Facility Utilization
- Kennel occupancy rates and availability
- Service booking trends and capacity planning
- Revenue tracking by service type
- Client retention and satisfaction metrics

### Financial Overview
- Automated payroll calculations
- Invoice generation and payment tracking
- Profit margin analysis by service
- Expense tracking and budget management

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Application environment (development/production)
- `PORT`: Server port (default: 5000)

### Database Configuration
The system uses Drizzle ORM for database management with automatic migrations. All schema changes are version-controlled and can be applied with:
```bash
npm run db:push
```

## 🛡️ Security Features

- **Role-based Access Control**: Different permission levels for admin, staff, and clients
- **PIN Authentication**: Secure 4-digit codes for staff access
- **Session Management**: Secure session handling with automatic timeouts
- **Data Validation**: Input sanitization and validation on all endpoints
- **HTTPS Support**: SSL/TLS encryption for production deployments

## 🔄 Data Flow

1. **Authentication**: Users authenticate through role-specific login screens
2. **Dashboard Loading**: Real-time queries fetch relevant data for each user role
3. **Task Management**: Jobs are created, assigned, and tracked through completion
4. **Time Tracking**: Staff clock in/out events are recorded with real-time wage calculations
5. **Reporting**: Daily reports and financial summaries are generated automatically

## 📈 Performance

- **Real-time Updates**: Sub-second response times for all operations
- **Efficient Queries**: Optimized database queries with proper indexing
- **Caching Strategy**: Intelligent caching for frequently accessed data
- **Scalable Architecture**: Designed to handle growing business needs

## 🤝 Contributing

This system is designed for VIP Elite K9s operations. For customization or deployment assistance, please contact the development team.

## 📄 License

Proprietary software developed for VIP Elite K9s Ltd. All rights reserved.

---

**VIP Elite K9s Management System** - Elevating pet care through technology
