import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse, errorResponse } from '../utils/response.js';
import prisma from '../config/database.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const { category, brand, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query;
  
  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  // Build where clause for filtering
  const where = {};
  
  if (category && category !== 'all') {
    where.category = category.toUpperCase();
  }
  
  if (brand) {
    where.brand = {
      contains: brand,
      mode: 'insensitive'
    };
  }
  
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        images: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      skip,
      take: parseInt(limit),
      orderBy: {
        createdAt: 'desc'
      }
    }),
    prisma.product.count({ where })
  ]);

  // Transform data to match frontend expectations
  const transformedProducts = products.map(product => ({
    id: product.id,
    name: product.name,
    category: product.category,
    brand: product.brand || '',
    price: product.price,
    rating: 4.5, // Default rating - you can implement a proper rating system later
    reviews: 0, // Default reviews count
    description: product.description,
    features: [], // You can add features field to schema later
    images: product.images.map(img => img.url),
    inStock: product.stock > 0,
    stock: product.stock,
    tags: [], // You can add tags field to schema later
    createdBy: product.creator?.name || 'Unknown'
  }));

  successResponse(res, {
    products: transformedProducts,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit))
    }
  }, 'Products retrieved successfully');
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      creator: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  if (!product) {
    return errorResponse(res, 'Product not found', 404);
  }

  // Transform data to match frontend expectations
  const transformedProduct = {
    id: product.id,
    name: product.name,
    category: product.category,
    brand: product.brand || '',
    price: product.price,
    rating: 4.5, // Default rating
    reviews: 0, // Default reviews count
    description: product.description,
    features: [], // You can add features field to schema later
    images: product.images.map(img => img.url),
    inStock: product.stock > 0,
    stock: product.stock,
    tags: [], // You can add tags field to schema later
    createdBy: product.creator?.name || 'Unknown',
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  };

  successResponse(res, transformedProduct, 'Product retrieved successfully');
});

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, brand, stock, images } = req.body;
  const userId = req.user.id;

  // Validate required fields
  if (!name || !description || !price || !category) {
    return errorResponse(res, 'Please provide all required fields: name, description, price, category', 400);
  }

  // Create product with images
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      category: category.toUpperCase(),
      brand: brand || '',
      stock: parseInt(stock) || 0,
      creatorId: userId,
      images: {
        create: images?.map(img => ({
          url: img.url || img,
          alt: img.alt || `${name} image`
        })) || []
      }
    },
    include: {
      images: true,
      creator: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  // Transform data to match frontend expectations
  const transformedProduct = {
    id: product.id,
    name: product.name,
    category: product.category,
    brand: product.brand || '',
    price: product.price,
    rating: 4.5,
    reviews: 0,
    description: product.description,
    features: [],
    images: product.images.map(img => img.url),
    inStock: product.stock > 0,
    stock: product.stock,
    tags: [],
    createdBy: product.creator?.name || 'Unknown'
  };

  successResponse(res, transformedProduct, 'Product created successfully', 201);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, brand, stock, images } = req.body;

  // Check if product exists
  const existingProduct = await prisma.product.findUnique({
    where: { id },
    include: { images: true }
  });

  if (!existingProduct) {
    return errorResponse(res, 'Product not found', 404);
  }

  // Update product
  const product = await prisma.product.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(category && { category: category.toUpperCase() }),
      ...(brand !== undefined && { brand }),
      ...(stock !== undefined && { stock: parseInt(stock) }),
      ...(images && {
        images: {
          deleteMany: {},
          create: images.map(img => ({
            url: img.url || img,
            alt: img.alt || `${name || existingProduct.name} image`
          }))
        }
      })
    },
    include: {
      images: true,
      creator: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  // Transform data to match frontend expectations
  const transformedProduct = {
    id: product.id,
    name: product.name,
    category: product.category,
    brand: product.brand || '',
    price: product.price,
    rating: 4.5,
    reviews: 0,
    description: product.description,
    features: [],
    images: product.images.map(img => img.url),
    inStock: product.stock > 0,
    stock: product.stock,
    tags: [],
    createdBy: product.creator?.name || 'Unknown'
  };

  successResponse(res, transformedProduct, 'Product updated successfully');
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    return errorResponse(res, 'Product not found', 404);
  }

  // Delete product (images will be deleted automatically due to cascade)
  await prisma.product.delete({
    where: { id }
  });

  successResponse(res, null, 'Product deleted successfully');
});

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.product.findMany({
    select: {
      category: true
    },
    distinct: ['category']
  });

  const categoryList = categories.map(cat => cat.category);
  
  successResponse(res, categoryList, 'Categories retrieved successfully');
});

// @desc    Get product brands
// @route   GET /api/products/brands
// @access  Public
export const getBrands = asyncHandler(async (req, res) => {
  const brands = await prisma.product.findMany({
    select: {
      brand: true
    },
    distinct: ['brand'],
    where: {
      brand: {
        not: null,
        not: ''
      }
    }
  });

  const brandList = brands.map(brand => brand.brand);
  
  successResponse(res, brandList, 'Brands retrieved successfully');
});
