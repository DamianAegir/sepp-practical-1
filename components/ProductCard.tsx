import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;
    setIsAdding(true);
    addItem(product, 1);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0 || isAdding}
          className={`absolute bottom-2 right-2 p-3 rounded-full shadow-lg transition-all duration-300 transform
            ${product.stock > 0 
              ? 'bg-blue-600 hover:bg-blue-700 text-white opacity-0 group-hover:opacity-100 hover:scale-110' 
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }
            ${isAdding ? 'scale-90' : ''}`}
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.brand}</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock > 0 ? (
          <span className="inline-block mt-2 text-sm text-green-600 dark:text-green-400 font-medium">
            {product.stock} in Stock
          </span>
        ) : (
          <span className="inline-block mt-2 text-sm text-red-600 dark:text-red-400 font-medium">
            Out of Stock
          </span>
        )}
      </div>
    </Link>
  );
};
