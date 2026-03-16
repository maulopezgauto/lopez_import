import FilterSection from './Filters/FilterSection.js'
import FilterItem from './Filters/FilterItem.js'

export default function Sidebar({ filters, setFilters }) {

  const toggleCorte = (value) => {
    setFilters(prev => {
      const exists = prev.corte.includes(value)

      return {
        ...prev,
        corte: exists
          ? prev.corte.filter(c => c !== value)
          : [...prev.corte, value]
      }
    })
  }

  return (
    <aside className="w-64 shrink-0 sticky top-24 h-fit">
      <div className="space-y-6">

        <FilterSection title="Tipo de carne">
          {['Res', 'Cerdo', 'Pollo'].map(item => (
            <FilterItem
              key={item}
              label={item}
              checked={filters.corte.includes(item)}
              onChange={() => toggleCorte(item)}
            />
          ))}
        </FilterSection>

      </div>
    </aside>
  )
}

