import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  // 🔁 cargar carrito al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // 💾 guardar carrito en cada cambio
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // ➕ agregar producto
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)

      if (existing) {
        const newCantidad = (existing.cantidad || 0) + qty
        const maxPermitido = product.max_por_pedido || 999
        
        // Validar que no exceda el limite máximo por pedido
        if (newCantidad > maxPermitido) {
          alert(`No se pueden pedir más de ${maxPermitido} de este producto`)
          return prev
        }

        return prev.map(p =>
          p.id === product.id
            ? { ...p, cantidad: newCantidad }
            : p
        )
      }

      // Validar cantidad inicial
      if (qty > (product.max_por_pedido || 999)) {
        alert(`No se pueden pedir más de ${product.max_por_pedido} de este producto`)
        return prev
      }

      // cuando agregamos por primera vez añadimos la propiedad 'cantidad'
      return [...prev, { ...product, cantidad: qty }]
    })
  }

  // ➖ reducir cantidad
  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(p =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter(p => p.cantidad > 0)
    )
  }

  // ❌ eliminar producto
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  // 🧹 limpiar carrito
  const clearCart = () => {
    setCart([])
    localStorage.removeItem("cart")
  }

  // 💰 total (usa precio del artículo y cantidad)
  const total = cart.reduce((acc, p) => acc + (p.precio * p.cantidad), 0)

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      decreaseQty,
      removeFromCart,
      removeItem: removeFromCart,
      clearCart,
      total
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)