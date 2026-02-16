const FilterSection = ({ title, children }) => {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-gray-200">
        {title}
      </h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  )
}

export default FilterSection;