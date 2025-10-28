# SEPP Practical 1 - React E-commerce Website

A modern, responsive e-commerce website built with React, TypeScript, and Tailwind CSS for Singapore Polytechnic School of Computing. This project demonstrates a complete online shopping experience with product catalog, shopping cart, contact forms, and dark mode functionality.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- (Optional) VS Code or your preferred code editor

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/DamianAegir/sepp-practical-1
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Setup the backend**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Setup**
   - Create a `.env` file in the `backend` directory with the required environment variables:
     ```
     PORT=5000
     DATABASE_URL="your_database_connection_string"
     JWT_SECRET="your_jwt_secret"
     NODE_ENV=development
     ```

5. **Database Setup**
   - Ensure you have PostgreSQL installed and running
   - Run database migrations:
     ```bash
     cd backend
     npx prisma migrate dev
     ```

### Running the Application

1. **Start the backend server**
   In a terminal, navigate to the `backend` directory and run:
   ```bash
   npm run dev
   ```

2. **Start the frontend development server**
   In a separate terminal, from the project root, run:
   ```bash
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Prisma Studio (for database management): Run `npx prisma studio` in the backend directory and visit http://localhost:5555

### Building for Production

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd backend
   npm start
   ```

## 🚀 Features

### Core E-commerce Features

- **Product Catalog** - Browse and search through a wide range of electronics and gadgets
- **Advanced Filtering** - Filter products by category, price, brand, and availability
- **Product Details** - Detailed product pages with specifications, reviews, and ratings
- **Shopping Cart** - Add, remove, and manage items in your cart
- **User Authentication** - Secure login and registration system
- **Order Management** - Complete checkout process with order tracking

### User Experience

- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode** - Toggle between themes with persistent user preference
- **Fast Performance** - Optimized loading times and smooth animations
- **Accessibility** - WCAG compliant with keyboard navigation and screen reader support
- **Internationalization** - Multi-language support (English, Chinese, Malay)

### Advanced Features

- **Real-time Search** - Instant search results as you type
- **Product Recommendations** - AI-powered product suggestions
- **Wishlist** - Save products for later
- **Order History** - Track past purchases and reorder items
- **Contact Forms** - Multiple ways to get in touch with customer service
- **Newsletter Signup** - Subscribe to updates and promotions

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with enhanced developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **React Router** - Client-side routing for single-page application
- **Framer Motion** - Smooth animations and transitions

### State Management & Data

- **Zustand** - Lightweight state management
- **React Query** - Server state management and caching
- **Local Storage** - Persistent user preferences and cart data

### Development Tools

- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - CSS vendor prefixing

### Additional Libraries

- **Lucide React** - Beautiful icons
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **i18next** - Internationalization framework
- **Three.js** - 3D graphics and animations (for product visualization)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16.0.0 or higher)
- **npm** (version 7.0.0 or higher) or **yarn**
- **Git** (for version control)

## ⚡ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/sepp-website.git
   cd sepp-website
   ```
2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173) to see the application

## 📖 Available Scripts

### Development

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint code analysis
npm run format       # Format code with Prettier
```

### Testing

```bash
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:coverage # Generate test coverage report
```

### Build & Deploy

```bash
npm run build        # Create production build
npm run analyze      # Analyze bundle size
npm run deploy       # Deploy to production (if configured)
```

## 🏗️ Project Structure

```
sepp-website/
├── public/                 # Static assets
│   └── assets/            # Images, icons, and other static files
├── src/
│   ├── components/        # Reusable React components
│   │   ├── ui/           # Basic UI components
│   │   ├── layout/       # Layout components (Header, Footer, etc.)
│   │   └── features/     # Feature-specific components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── store/            # State management (Zustand stores)
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles and Tailwind config
│   └── main.tsx         # Application entry point
├── dist/                 # Production build output (generated)
├── node_modules/         # Dependencies (generated)
├── .gitignore           # Git ignore rules
├── README.md            # Project documentation
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite build configuration
└── postcss.config.js    # PostCSS configuration
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue (#3B82F6) - Professional and trustworthy
- **Secondary**: Purple (#8B5CF6) - Creative and modern
- **Accent**: Green (#10B981) - Success and growth
- **Neutral**: Gray scale (50-900) - Clean and readable

### Typography

- **Headings**: Inter (sans-serif)
- **Body**: Inter (sans-serif)
- **Code**: JetBrains Mono (monospace)

### Components

- Consistent spacing using Tailwind's spacing scale
- Responsive design with mobile-first approach
- Accessible color contrast ratios
- Smooth hover and focus states

## 🌟 Key Features Explained

### Product Management

- Dynamic product catalog with real-time inventory
- Advanced search with filters and sorting options
- Product comparison functionality
- Wishlist and favorites system

### Shopping Experience

- Intuitive shopping cart with quantity management
- Secure checkout process with multiple payment options
- Order tracking and history
- Customer reviews and ratings

### User Interface

- Seamless dark/light mode switching
- Responsive design for all screen sizes
- Loading states and error handling
- Toast notifications for user feedback

---

**Built with ❤️ for Singapore Polytechnic School of Computing**

*This project demonstrates modern web development practices and serves as a foundation for e-commerce applications.*
