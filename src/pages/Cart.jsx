import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createOrder } from '../api'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, total, setQty, removeFromCart, clearCart } = useCart()
  const [orderId, setOrderId] = useState(null)

  const checkout = async () => {
    const order = await createOrder({ items, total, date: new Date().toISOString() })
    setOrderId(order.id)
    clearCart()
  }

  if (orderId) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Order placed</h1>
        <p className="mt-2 text-gray-600">Your order number is #{orderId}.</p>
        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:underline">Continue shopping</Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Your cart is empty.</p>
        <Link to="/" className="mt-2 inline-block text-indigo-600 hover:underline">Browse products</Link>
      </div>
    )
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Your cart</h1>
      <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 p-4">
            <img src={item.image} alt={item.title} className="h-16 w-16 object-contain" />
            <div className="flex-1">
              <p className="line-clamp-1 text-sm font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setQty(item.id, item.qty - 1)} className="h-8 w-8 rounded border border-gray-300">-</button>
              <span className="w-6 text-center">{item.qty}</span>
              <button onClick={() => setQty(item.id, item.qty + 1)} className="h-8 w-8 rounded border border-gray-300">+</button>
            </div>
            <p className="w-20 text-right font-medium">${(item.price * item.qty).toFixed(2)}</p>
            <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-600 hover:underline">Remove</button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
        <button onClick={checkout} className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-500">
          Place order
        </button>
      </div>
    </>
  )
}
