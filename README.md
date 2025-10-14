# ShopzStore

ShopzStore is an e-commerce web application built with Next.js, TypeScript, Tailwind CSS, and Prisma. It provides a modern shopping experience with product listings, detailed product pages, and a clean UI.

## Features

- Product listing and detail pages
- Responsive design with Tailwind CSS
- Modular component structure
- Prisma ORM for database management
- Sample product images and data

## Project Structure

```
components/         # Reusable UI and feature components
app/                # Next.js app directory (routing, pages)
db/                 # Database utilities and seed scripts
lib/                # Utility functions and constants
prisma/             # Prisma schema and migrations
public/             # Static assets (images, etc.)
types/              # TypeScript type definitions
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Set up the database:**
   - Configure your database connection in `prisma/schema.prisma`.
   - Run migrations and seed data:
     ```sh
     npx prisma migrate dev --name init
     npx prisma db seed
     ```
3. **Run the development server:**
   ```sh
   npm run dev
   ```
4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run start` — Start the production server
- `npx prisma migrate dev` — Run database migrations
- `npx prisma db seed` — Seed the database

## License

MIT
