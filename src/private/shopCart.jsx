import { NavLink } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { addPointerEvent } from "framer-motion"

export default function LuxuryCart() {
  const { cart, addToCart, decreaseQty, removeFromCart, removeItem, total } = useCart()

  return (
    <div className="min-h-screen w-full py-12 bg-[#0A0A0C] text-white relative overflow-hidden">

      {/* Background luxury gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(220,38,38,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(198,167,94,0.06),transparent_40%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-10 py-16">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-wide">
            Shopping Cart
          </h1>
          <p className="text-neutral-400 mt-2">
            Premium Order Experience
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Products */}
          <div className="lg:col-span-2 space-y-6">

            {cart.length === 0 && (
              <div className="border border-white/10 rounded-xl p-12 text-center bg-white/5 backdrop-blur-xl">
                <p className="text-neutral-400">Tu carrito está vacío</p>
              </div>
            )}

            {cart.map(item => (
              <div
                key={item.id}
                className="
                  flex items-center justify-between
                  bg-white/5 backdrop-blur-xl
                  border border-white/10
                  rounded-xl p-6
                  hover:border-red-600/30
                  transition
                "
              >
                {/* Left */}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-xl bg-neutral-900 overflow-hidden border border-white/10">
                    <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <h3 className="font-semibold tracking-wide">{item.nombre}</h3>
                    <p className="text-sm text-neutral-400">${item.precio}</p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition"
                  >−</button>

                  <span className="w-6 text-center">{item.cantidad}</span>

                  <button
                    onClick={() => addToCart(item, 1)}
                    disabled={item.cantidad >= (item.max_por_pedido || 999)}
                    className={`w-8 h-8 rounded-lg transition ${
                      item.cantidad >= (item.max_por_pedido || 999)
                        ? 'bg-white/5 cursor-not-allowed opacity-50'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >+</button>
                </div>

                {/* Price */}
                <div className="w-28 text-right font-semibold">
                  ${item.precio * item.cantidad}
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-400 transition"
                >
                  🗑
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div
            className="
              h-fit
              rounded-2xl
              border border-[#C6A75E]/30
              bg-white/5 backdrop-blur-xl
              p-8
              shadow-[0_0_60px_rgba(198,167,94,0.15)]
            "
          >
            <h3 className="text-xl font-semibold tracking-wide mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>RD$ {total}</span>
              </div>

              <div className="flex justify-between text-neutral-400">
                <span>Delivery</span>
                <span>$0</span>
              </div>

              <div className="h-px bg-white/10 my-4" />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <NavLink
              to="/private/checkout"
              className="
                mt-8 block text-center
                py-3 rounded-xl
                bg-red-600
                hover:bg-red-700
                shadow-[0_0_30px_rgba(220,38,38,0.5)]
                transition
                font-semibold tracking-wide
              "
            >
              Ir a pagar
            </NavLink>

          </div>
        </div>
      </div>
    </div>
  )
}