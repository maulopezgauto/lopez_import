export default function InputField({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-neutral-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          px-4 py-2 rounded-lg
          bg-neutral-900/60
          border border-white/10
          text-white
          placeholder:text-neutral-500
          focus:outline-none
          focus:border-red-600/50
          focus:shadow-[0_0_15px_rgba(220,38,38,0.3)]
          transition
        "
      />
    </div>
  )
}