import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import { useCart } from '../context/CartContext'

export default function Catalogue() {
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await supabase.from('products').select('*')
      setProducts(data || [])
    }
    loadProducts()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
      {products.map(p => (
        <div key={p.id} className="bg-neutral-900 p-4 rounded-xl">
          <img src={p.imagen} className="w-full h-40 object-cover rounded-lg" />
          <h3 className="mt-3 font-bold">{p.nombre}</h3>
          <p className="text-red-500 font-semibold">${p.precio}</p>

          <button
            onClick={() => addToCart(p)}
            className="mt-3 w-full bg-red-600 py-2 rounded-lg hover:bg-red-700"
          >
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  )
}