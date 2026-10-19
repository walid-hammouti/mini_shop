import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { count } = useCart()
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold">Mini Shop</Link>
        <Link to="/cart" className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700">
          Cart ({count})
        </Link>
      </nav>
    </header>
  )
}
