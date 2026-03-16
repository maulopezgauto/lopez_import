import React from "react";
import { useState, useEffect } from "react";
import paraguayBlack from '../assets/img/backgrounds/Paraguay-bg-black.jpg'
import paraguayWhite from '../assets/img/backgrounds/Paraguay-bg-white.png'
import socialLinks from '../assets/img/logo/index.js'

function Footer() {

  // eslint-disable-next-line no-unused-vars
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = e => setIsDark(e.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-white dark:bg-black">
      <div
          className="
            absolute inset-0
            bg-no-repeat bg-right bg-contain
            block dark:hidden
          "
          style={{
            backgroundImage: `url(${paraguayWhite})`,
            transform: "translateX(0%)"
          }}
        />
      <div
          className="
            absolute inset-0
            bg-no-repeat bg-right bg-contain
            hidden dark:block
          "
          style={{
            backgroundImage: `url(${paraguayBlack})`,
            transform: "translateX(0%)"
          }}
        />

      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">

          {/* Logo & Social */}
          <div>
            <div className="text-gray-900 dark:text-white">
              {/* Tu SVG Logo */}
              <svg width="57" height="17" viewBox="0 0 57 17" fill="currentColor">
                <path d="M5.36 12.328H12.896V16H0.464V0.159999H5.36V12.328Z" />
              </svg>
            </div>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              © 2025 Lopez Import. All rights reserved.
            </p>

            <div className="flex gap-3 mt-6">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="
                      w-9 h-9
                      flex items-center justify-center
                      rounded-full
                      bg-gray-900
                      text-white
                      opacity-70
                      hover:opacity-100
                      hover:bg-gray-800
                      transition
                    "
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-6 h-6 object-contain"
                    />
                  </a>
                ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Company
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              {["Blog", "Pricing", "About Us", "Contact", "Testimonials"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-sky-500 transition"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Support
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              {[
                "Legal policy",
                "Status policy",
                "Privacy policy",
                "Terms of service",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-sky-500 transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter 
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Get updates
            </h3>

            <div className="mt-6 flex items-center border rounded-lg overflow-hidden dark:border-gray-700">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  flex-1
                  px-4 py-3
                  text-sm
                  bg-transparent
                  text-gray-900
                  dark:text-white
                  placeholder-gray-500
                  focus:outline-none
                "
              />
              <button
                aria-label="send"
                className="
                  px-4
                  text-gray-600
                  hover:text-sky-500
                  transition
                "
              >
                ➤
              </button>
            </div>
          </div> */}

        </div>
      </div>
    </footer>
  );
}

export default Footer;
