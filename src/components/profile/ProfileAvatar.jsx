export default function ProfileAvatar({ avatarUrl, onUpload }) {
  return (
    <div className="flex flex-col items-center mb-10">
      <div className="relative">
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-red-600/40 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
          <img
            src={avatarUrl || "https://i.pravatar.cc/300"}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <label className="
          absolute bottom-0 right-0
          w-8 h-8 rounded-full
          bg-red-600
          text-white text-xs
          flex items-center justify-center
          shadow-lg
          hover:scale-110 transition
          cursor-pointer
        ">
          ✎
          <input type="file" hidden onChange={onUpload} />
        </label>
      </div>

      <p className="mt-4 font-semibold tracking-wide">Usuario</p>
      <span className="text-xs text-neutral-400">Cuenta activa</span>
    </div>
  )
}