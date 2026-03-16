import React from 'react'

export const ContactForm = () => {
  return (
    <div className="relative flex justify-center items-center py-32 px-6">
  
        {/* Glow decorativo */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-150 h-150 bg-red-600/10 blur-[120px] rounded-full" />
        </div>

        {/* Card luxury */}
        <div className="
          relative z-10
          w-full max-w-3xl
          bg-black/60 backdrop-blur-xl
          border border-white/10
          shadow-[0_0_60px_rgba(0,0,0,0.8)]
          px-14 py-16
        ">

          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-4xl font-light tracking-[0.2em] text-white uppercase">
              Contact
            </h2>
            <div className="mt-4 h-px w-24 mx-auto bg-linear-to-r from-transparent via-red-600 to-transparent" />
            <p className="mt-6 text-neutral-400 text-sm tracking-wide">
              Premium service • Wholesale • Imports • Distribution
            </p>
          </div>

          {/* Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Input */}
            {[
              { label: "First name", type: "text" },
              { label: "Last name", type: "text" },
              { label: "Company", type: "text", span: true },
              { label: "Email", type: "email", span: true },
              { label: "Phone", type: "text", span: true },
            ].map((field, i) => (
              <div key={i} className={field.span ? "md:col-span-2" : ""}>
                <label className="text-xs uppercase tracking-widest text-neutral-400">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  className="
                    mt-2 w-full
                    bg-transparent
                    border-b border-white/15
                    py-3
                    text-white
                    outline-none
                    focus:border-red-600
                    transition
                  "
                />
              </div>
            ))}

            {/* Message */}
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400">
                Message
              </label>
              <textarea
                rows={4}
                className="
                  mt-2 w-full
                  bg-transparent
                  border-b border-white/15
                  py-3
                  text-white
                  outline-none
                  focus:border-red-600
                  transition
                  resize-none
                "
              />
            </div>

            {/* Button */}
            <div className="md:col-span-2 flex justify-center mt-10">
              <button
                type="submit"
                className="
                  px-14 py-3
                  uppercase tracking-widest text-sm
                  text-white
                  border border-red-600/40
                  bg-black
                  hover:bg-red-600/10
                  hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]
                  transition-all duration-300
                "
              >
                Send Message
              </button>
            </div>
    </form>
  </div>
    </div>
  )
}

export default ContactForm;
