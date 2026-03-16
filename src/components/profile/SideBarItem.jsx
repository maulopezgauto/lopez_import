export default function SidebarItem({ label, active }) {
  return (
    <div
      className={`
        px-4 py-2 rounded-lg cursor-pointer transition
        ${active
          ? "bg-red-600/20 text-red-400 border border-red-600/30"
          : "text-neutral-400 hover:bg-white/5 hover:text-white"}
      `}
    >
      {label}
    </div>
  )
}