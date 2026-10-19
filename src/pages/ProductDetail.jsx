import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct } from '../api'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getProduct(id).then(setProduct).catch((e) => setError(e.message))
  }, [id])

  if (error) return <p className="text-red-600">{error}</p>
  if (!product) return <p>Loading...</p>

  return (
    <>
      <Link to="/" className="text-sm text-indigo-600 hover:underline">Back to products</Link>
      <div className="mt-4 grid gap-8 rounded-xl border border-gray-200 bg-white p-6 md:grid-cols-2">
        <img src={product.image} alt={product.title} className="h-80 w-full object-contain" />
        <div>
          <p className="text-sm text-gray-500">{product.category}</p>
          <h1 className="mt-1 text-2xl font-bold">{product.title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {product.rating.rate} / 5 ({product.rating.count} reviews)
          </p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <p className="mt-6 text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-4 rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-500"
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  )
}
