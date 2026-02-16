const FilterItem = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-neutral-600 bg-neutral-900 accent-red-600"
      />
      <span className="text-neutral-300 group-hover:text-white transition">
        {label}
      </span>
    </label>
  )
}

export default FilterItem;