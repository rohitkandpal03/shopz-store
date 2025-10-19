# ShopzStore

ShopzStore is a modern e-commerce web application built with Next.js 15, TypeScript, Tailwind CSS, and Prisma. It provides a complete shopping experience with user authentication, shopping cart, order management, and payment processing.

## Features

- **User Authentication**: Secure sign-in/sign-up with NextAuth.js v5 and credentials provider
- **Shopping Cart**: Session-based cart management with persistent storage
- **Product Catalog**: Product browsing with detailed views, images, and search
- **Order Management**: Complete order processing with shipping address and payment
- **Payment Integration**: PayPal payment processing with multiple payment methods
- **User Profiles**: User account management with address and payment method storage
- **Database Integration**: PostgreSQL with Prisma ORM and Neon serverless
- **Modern UI**: Responsive design with Tailwind CSS and Radix UI components
- **Type Safety**: Full TypeScript implementation with Zod validation
- **Dark/Light Mode**: Theme switching with next-themes
- **Session Management**: Secure session handling with cart persistence

## Project Structure

```
app/                # Next.js app directory (routing, pages)
├── (auth)/         # Authentication pages and layouts
│   ├── sign-in/    # Sign-in page with credentials form
│   └── sign-up/    # Sign-up page with registration form
├── (root)/         # Main application pages
│   ├── cart/       # Shopping cart page
│   ├── order/      # Order details and history
│   ├── payment-method/ # Payment method selection
│   ├── place-order/    # Order placement and confirmation
│   ├── product/    # Product detail pages
│   ├── shipping-address/ # Shipping address form
│   └── page.tsx    # Home page with product listings
├── api/            # API routes for authentication
└── layout.tsx      # Root layout with providers

components/         # Reusable UI and feature components
├── shared/         # Shared components
│   ├── header/     # Navigation header with user menu
│   └── product/    # Product-related components
└── ui/             # Radix UI components (buttons, cards, etc.)

lib/                # Utility functions and configurations
├── actions/        # Server actions
│   ├── cart.action.ts      # Cart operations
│   ├── order.actions.ts    # Order management
│   ├── product.actions.ts  # Product operations
│   └── user.actions.ts     # User management
├── constants/      # Application constants and configuration
├── paypal.ts       # PayPal payment integration
├── utils.ts        # Utility functions
└── validators.ts   # Zod schemas for form validation

db/                 # Database utilities and seed scripts
├── prisma.ts       # Prisma client configuration
├── sample-data.ts  # Sample product data
└── seed.ts         # Database seeding script

prisma/             # Prisma schema and migrations
├── migrations/     # Database migration files
└── schema.prisma   # Database schema definition

assets/             # Static assets
└── loader.gif      # Loading animations

auth.config.ts      # NextAuth configuration
auth.ts             # NextAuth setup
middleware.ts       # Route protection middleware
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
   # Database
   DATABASE_URL="your_postgresql_database_url"
   
   # NextAuth Configuration
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Application Settings
   NEXT_PUBLIC_APP_NAME="ShopZ Store"
   NEXT_PUBLIC_APP_DESCRIPTION="A modern ecommerce store"
   NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
   
   # Payment Configuration (Optional)
   PAYMENT_METHODS="PayPal,Stripe,CashOnDelivery"
   DEFAULT_PAYMENT_METHOD="PayPal"
   
   # PayPal Configuration (Optional)
   NEXT_PUBLIC_PAYPAL_CLIENT_ID="your_paypal_client_id"
   PAYPAL_CLIENT_SECRET="your_paypal_client_secret"
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
- **Styling**: Tailwind CSS with Tailwind Animate
- **UI Components**: Radix UI (Dialog, Dropdown, Label, Radio Group, Slot, Toast)
- **Database**: PostgreSQL with Prisma ORM and Neon serverless
- **Authentication**: NextAuth.js v5 with Prisma adapter
- **Validation**: Zod with React Hook Form
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
- **Payment**: PayPal React SDK
- **Password Hashing**: bcrypt-ts-edge
- **Testing**: Jest with TypeScript support
- **Linting**: ESLint with Next.js config

## Available Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run start` — Start the production server
- `npm run lint` — Run ESLint for code quality
- `npm run test` — Run Jest tests
- `npm run test:watch` — Run Jest tests in watch mode
- `npm run postinstall` — Generate Prisma client (runs automatically after install)
- `npx prisma migrate dev` — Run database migrations in development
- `npx prisma db seed` — Seed the database with sample data
- `npx prisma generate` — Generate Prisma client
- `npx prisma studio` — Open Prisma Studio to view/edit database

## Database Schema

The application includes the following main models:

- **User**: User accounts with authentication, profile information, address, and payment methods
- **Product**: Product catalog with images, pricing, inventory, ratings, and categories
- **Cart**: Shopping cart with session-based and user-based storage
- **Order**: Order management with shipping address, payment details, and status tracking
- **OrderItem**: Individual items within orders with quantity and pricing
- **Account**: OAuth provider accounts (NextAuth integration)
- **Session**: User sessions for authentication
- **VerificationToken**: Email verification tokens

### Key Features:
- **UUID Primary Keys**: All models use UUID for better scalability
- **Decimal Pricing**: Precise decimal handling for prices and calculations
- **JSON Storage**: Flexible address and payment method storage
- **Cascade Deletes**: Proper cleanup when users or orders are deleted
- **Indexing**: Optimized queries with proper database indexes

## Authentication

The application uses NextAuth.js v5 with:

- **Credentials Provider**: Email/password authentication with form validation
- **Session Management**: JWT-based sessions with secure cookie handling
- **Database Integration**: Prisma adapter for user and session storage
- **Password Security**: bcrypt-ts-edge for secure password hashing
- **Route Protection**: Middleware-based route protection for authenticated pages
- **Session Cart**: Automatic session cart creation for guest users
- **User Roles**: Role-based access control (USER/ADMIN)

### Protected Routes:
- `/shipping-address` - Shipping address management
- `/payment-method` - Payment method selection
- `/place-order` - Order placement
- `/profile` - User profile management
- `/user/*` - User-specific pages
- `/order/*` - Order details and history
- `/admin` - Admin panel (role-based)

## Application Workflow

### Shopping Experience
1. **Browse Products**: View product listings on the home page with filtering and search
2. **Product Details**: Click on products to view detailed information, images, and reviews
3. **Add to Cart**: Add products to cart with quantity selection
4. **Cart Management**: View and modify cart items before checkout
5. **Checkout Process**:
   - Sign in or continue as guest
   - Enter shipping address
   - Select payment method
   - Review and place order
6. **Order Tracking**: View order history and track order status

### User Management
- **Registration**: Create new user accounts with email verification
- **Profile Management**: Update personal information, addresses, and payment methods
- **Order History**: View past orders and their details
- **Session Persistence**: Cart and preferences maintained across sessions

### Admin Features
- **Product Management**: Add, edit, and manage product catalog
- **Order Management**: Process and track customer orders
- **User Management**: Manage user accounts and roles
- **Analytics**: View sales and user statistics

## Development

### Key Components
- **Server Actions**: Database operations using Next.js server actions
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React state with session persistence
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Skeleton loaders and loading indicators
- **Responsive Design**: Mobile-first responsive design

### Testing
- **Jest Configuration**: Unit and integration testing setup
- **TypeScript Support**: Full TypeScript testing environment
- **Test Scripts**: Automated testing with watch mode

## License

MIT
