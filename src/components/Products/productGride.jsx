import ProductCard from './productCard'


export default function ProductGrid({ carnes }) {
  return (
    <div className="
      w-full
      grid
      grid-cols-1
      sm:grid-cols-2
      2xl:grid-cols-3
      gap-x-12
      gap-y-16">
      {carnes.map(carne => (
        <ProductCard key={carne.id} carne={carne} />
      ))}
    </div>
  )
}
