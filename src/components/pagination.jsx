import React from 'react'

export default function Pagination({ page, setPage, totalPages }) {
  if (totalPages <= 1) return null // no mostrar si solo hay 1 página

  return (
    <div className="flex justify-center items-center gap-4 mt-20">

      {/* Prev */}
      <button
        onClick={() => setPage(p => Math.max(p - 1, 1))}
        disabled={page === 1}
        className={`
          px-4 py-2 text-sm rounded-lg border transition
          ${page === 1
            ? "border-neutral-800 text-neutral-600 cursor-not-allowed"
            : "border-red-600/40 text-white hover:bg-red-600/10 hover:border-red-600"}
        `}
      >
        ← Prev
      </button>

      {/* Números */}
      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, i) => {
          const num = i + 1
          return (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`
                w-9 h-9 rounded-full text-sm font-medium
                transition-all duration-200
                ${page === num
                  ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.6)] scale-110"
                  : "bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800"}
              `}
            >
              {num}
            </button>
          )
        })}
      </div>

      {/* Next */}
      <button
        onClick={() => {
            setPage(p => Math.min(p + 1, totalPages))
        }}
        disabled={page === totalPages}
        className={`
            px-5 py-2 text-sm rounded-lg border transition
            ${page === totalPages
            ? "border-neutral-800 text-neutral-600 cursor-not-allowed"
            : "border-red-600/40 text-white hover:bg-red-600/10 hover:border-red-600"}
        `}
        >
        Next →
      </button>

    </div>
  )
}
