# ShopzStore

ShopzStore is a modern e-commerce web application built with Next.js 15, TypeScript, Tailwind CSS, and Prisma. It provides a complete shopping experience with user authentication, product management, and a clean, responsive UI.

## Features

- **User Authentication**: Secure sign-in/sign-out with NextAuth.js v5
- **Product Management**: Full CRUD operations for products with image support
- **User Management**: User registration, profiles, and role-based access
- **Database Integration**: PostgreSQL with Prisma ORM and Neon serverless
- **Modern UI**: Responsive design with Tailwind CSS and Radix UI components
- **Type Safety**: Full TypeScript implementation with Zod validation
- **Dark/Light Mode**: Theme switching with next-themes
- **Sample Data**: Pre-populated with sample products and images

## Project Structure

```
app/                # Next.js app directory (routing, pages)
├── (auth)/         # Authentication pages and layouts
├── (root)/         # Main application pages
├── api/            # API routes for authentication
└── layout.tsx      # Root layout with providers

components/         # Reusable UI and feature components
├── shared/         # Shared components (header, product cards)
└── ui/             # Radix UI components (buttons, cards, etc.)

lib/                # Utility functions and configurations
├── actions/        # Server actions for user and product operations
├── constants/      # Application constants and configuration
└── validators.ts   # Zod schemas for form validation

db/                 # Database utilities and seed scripts
├── prisma.ts       # Prisma client configuration
├── sample-data.ts  # Sample product data
└── seed.ts         # Database seeding script

prisma/             # Prisma schema and migrations
├── migrations/     # Database migration files
└── schema.prisma   # Database schema definition

public/             # Static assets
└── images/         # Product images and logos

auth.ts             # NextAuth configuration
types/              # TypeScript type definitions
```

## Getting Started

### Prerequisites

- **Node.js**: Version 18.18 or higher (required for Prisma)
- **npm**: Latest version
- **PostgreSQL**: Database instance (local or cloud like Neon)

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   cd shopzstore
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add:

   ```env
   DATABASE_URL="your_postgresql_database_url"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_APP_NAME="ShopZ Store"
   NEXT_PUBLIC_APP_DESCRIPTION="A modern ecommerce store"
   NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
   ```

4. **Set up the database:**

   - The project uses PostgreSQL with Neon serverless (or any PostgreSQL database)
   - Run migrations and seed data:
     ```sh
     npm generate
     npx prisma migrate dev --name {name}
     npx prisma db seed
     ```

5. **Run the development server:**

   ```sh
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Validation**: Zod
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode

## Available Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run start` — Start the production server
- `npm run lint` — Run ESLint for code quality
- `npx prisma migrate dev` — Run database migrations in development
- `npx prisma db seed` — Seed the database with sample data
- `npx prisma generate` — Generate Prisma client
- `npx prisma studio` — Open Prisma Studio to view/edit database

## Database Schema

The application includes the following main models:

- **User**: User accounts with authentication and profile information
- **Product**: Product catalog with images, pricing, and inventory
- **Account**: OAuth provider accounts (NextAuth integration)
- **Session**: User sessions for authentication
- **VerificationToken**: Email verification tokens

## Authentication

The application uses NextAuth.js v5 with:

- Credentials provider for email/password authentication
- JWT session strategy
- Prisma adapter for database integration
- Secure password hashing with bcrypt

## License

MIT
