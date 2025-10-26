import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse, errorResponse } from '../utils/response.js';
import prisma from '../config/database.js';
import { generateToken, generateRefreshToken } from '../config/jwt.js';
import { hashPassword, comparePassword } from '../utils/password.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return errorResponse(res, 'Please provide all required fields', 400);
  }

  if (password.length < 6) {
    return errorResponse(res, 'Password must be at least 6 characters', 400);
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });

  if (existingUser) {
    return errorResponse(res, 'User with this email already exists', 400);
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      isActive: true,
      createdAt: true,
    }
  });

  // Generate token
  const token = generateToken(user.id);

  // Set cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  successResponse(res, { user, token }, 'User registered successfully', 201);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return errorResponse(res, 'Please provide email and password', 400);
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });

  if (!user) {
    return errorResponse(res, 'Invalid email or password', 401);
  }

  // Check if user is active
  if (!user.isActive) {
    return errorResponse(res, 'Your account has been deactivated', 403);
  }

  // Check password
  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    return errorResponse(res, 'Invalid email or password', 401);
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  // Generate token
  const token = generateToken(user.id);

  // Set cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  successResponse(res, { user: userWithoutPassword, token }, 'Login successful');
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  successResponse(res, null, 'Logout successful');
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      phone: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  successResponse(res, user, 'User retrieved successfully');
});
