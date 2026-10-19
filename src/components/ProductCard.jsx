import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="h-48 w-full object-contain" />
        <h2 className="mt-3 line-clamp-2 text-sm font-medium">{product.title}</h2>
      </Link>
      <p className="mt-1 text-xs text-gray-500">
        {product.rating.rate} / 5 ({product.rating.count} reviews)
      </p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="font-semibold">${product.price.toFixed(2)}</span>
        <button
          onClick={() => addToCart(product)}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-500"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
