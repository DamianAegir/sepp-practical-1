# SEPP E-commerce Backend

Backend API for the SEPP E-commerce platform built with Node.js, Express, Prisma, and PostgreSQL (Neon).

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma    # Prisma schema (database models)
├── src/
│   ├── config/          # Configuration files (database, JWT, etc.)
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # App entry point
├── uploads/             # File uploads directory
├── .env                 # Environment variables
├── .env.example         # Example environment variables
└── package.json         # Dependencies and scripts
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database (Neon recommended)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the values in `.env` with your Neon database connection strings

4. Set up your Neon database:
- Go to [Neon Console](https://console.neon.tech)
- Create a new project or use an existing one
- Copy both connection strings:
  - **Pooled connection** (for DATABASE_URL)
  - **Direct connection** (for DIRECT_URL)
- Paste them into your `.env` file

5. Generate Prisma Client and run migrations:
```bash
npm run prisma:generate
npm run prisma:push
```

6. Run the development server:
```bash
npm run dev
```

The server will start on http://localhost:5000

## Environment Variables

Key environment variables to configure:

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `DATABASE_URL` - Neon PostgreSQL pooled connection string
- `DIRECT_URL` - Neon PostgreSQL direct connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend application URL
- `STRIPE_SECRET_KEY` - Stripe payment gateway secret
- `SMTP_*` - Email configuration for notifications

See `.env.example` for full list of variables.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Health Check
- `GET /api/health` - Server health check

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:push` - Push schema changes to database (for development)
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## Features

- RESTful API architecture
- PostgreSQL database with Prisma ORM
- Neon serverless PostgreSQL integration
- JWT authentication
- Role-based access control
- Request validation
- Error handling middleware
- Security headers with Helmet
- CORS enabled
- Request logging with Morgan
- File upload support
- Payment integration ready (Stripe)
- Email notifications ready
- Type-safe database queries with Prisma

## Next Steps

1. Implement authentication logic in auth controller
2. Implement product CRUD operations
3. Implement order management
4. Add payment processing
5. Add email notifications
6. Add file upload functionality
7. Add data validation rules
8. Add API documentation (Swagger)
9. Add unit and integration tests
10. Set up production deployment

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- HTTP-only cookies for token storage
- Helmet for security headers
- Input validation and sanitization
- Rate limiting (ready to configure)

## License

ISC
