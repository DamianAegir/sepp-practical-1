# Product Management Script with Image Automation

This enhanced product management script provides automated image processing and assignment capabilities for the SEPP E-commerce Platform.

## Features

### 🚀 Core Functionality
- **Admin Authentication**: Secure login system for admin users
- **Product Creation**: Interactive product creation with category selection
- **Product Listing**: View all products with their associated images
- **Bulk Operations**: Create multiple products at once with automated image assignment

### 🖼️ Image Automation Features
- **Auto Image Assignment**: Automatically assigns 1-3 random images from the available collection to new products
- **Image Processing**: Optimizes images using Sharp library (resize to 800x600, JPEG compression at 85% quality)
- **Smart File Management**: Generates unique filenames and organizes processed images in the uploads directory
- **Multiple Image Options**: Choose between auto-assignment, manual URL input, or skip images entirely

### 📁 Directory Structure
```
backend/
├── scripts/
│   ├── package.json          # Dependencies including Sharp and mime-types
│   ├── product-manager.js    # Enhanced script with image automation
│   └── README.md            # This documentation
├── uploads/                 # Processed and optimized images
└── prisma/
    └── schema.prisma        # Database schema with Product and ProductImage models
```

## Dependencies

- `@prisma/client`: Database ORM client
- `bcryptjs`: Password hashing (for future authentication enhancement)
- `sharp`: High-performance image processing
- `mime-types`: MIME type detection for file handling

## Usage

### Prerequisites
1. Ensure you have an admin user in your database
2. Make sure the `public/images` directory contains source images
3. Install dependencies: `npm install`

### Running the Script
```bash
cd backend/scripts
node product-manager.js
```

### Menu Options
1. **Add New Product**: Create a single product with interactive prompts
2. **Bulk Add Products with Auto Images**: Create multiple products with automated image assignment
3. **List All Products**: Display all products with their image information
4. **Show Available Images**: View all images available for auto-assignment
5. **Exit**: Close the application

### Image Processing Workflow
1. **Source Images**: Reads from `../public/images/` directory
2. **Processing**: Resizes and optimizes images using Sharp
3. **Storage**: Saves processed images to `../backend/uploads/` directory
4. **Database**: Creates ProductImage records with optimized image URLs

## Image Auto-Assignment Logic

The script uses a simple but effective approach:
- Randomly selects 1-3 images from the available collection
- Processes each image (resize, optimize, rename)
- Creates database records linking images to products
- Provides visual feedback during the process

## Sample Products

The bulk creation feature includes predefined product templates:
- Wireless Headphones (Electronics)
- Cotton T-Shirt (Clothing)
- Programming Book (Books)
- Coffee Mug (Home)
- Yoga Mat (Sports)
- Desk Organizer (Other)

## Error Handling

The script includes comprehensive error handling for:
- Database connection issues
- File system operations
- Image processing failures
- Invalid user inputs
- Missing directories or files

## Future Enhancements

Potential improvements could include:
- Category-based image selection
- AI-powered image-to-product matching
- Batch image upload from external sources
- Image metadata extraction and tagging
- Advanced image optimization settings