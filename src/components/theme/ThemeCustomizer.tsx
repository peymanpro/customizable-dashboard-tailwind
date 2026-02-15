// src/components/theme/ThemeCustomizer.tsx
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export default function ThemeCustomizer() {
  const { theme, setPrimaryColor, setFont, setBorderRadius, toggleDarkMode, availableColors, availableFonts, isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* دکمه باز کردن پنل */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 z-50"
        aria-label="Theme Customizer"
      >
        <span className="text-2xl">🎨</span>
      </button>

      {/* پنل شخصی‌ساز */}
      <div className={cn(
        "fixed bottom-24 right-6 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 z-50",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      )}>
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Theme Customizer</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="space-y-5">
            {/* رنگ اصلی */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Primary Color
              </label>
              <div className="flex gap-2 flex-wrap">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    className={cn(
                      "w-8 h-8 rounded-full transition-all",
                      `bg-${color}-500`,
                      theme.primaryColor === color && "ring-2 ring-offset-2 ring-primary-500 dark:ring-offset-gray-800"
                    )}
                    onClick={() => setPrimaryColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* فونت */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Font Family
              </label>
              <select
                value={theme.fontFamily}
                onChange={(e) => setFont(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              >
                {availableFonts.map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            {/* Border Radius */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Border Radius: {theme.borderRadius}
              </label>
              <input
                type="range"
                min="0"
                max="24"
                step="2"
                value={parseFloat(theme.borderRadius) * 16}
                onChange={(e) => setBorderRadius(`${Number(e.target.value) / 16}rem`)}
                className="w-full accent-primary-500"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0</span>
                <span>1.5rem</span>
              </div>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
              <button
                onClick={toggleDarkMode}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
                  isDarkMode ? "bg-primary-500" : "bg-gray-300 dark:bg-gray-600"
                )}
                role="switch"
                aria-checked={isDarkMode}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    isDarkMode ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>

            {/* Preview */}
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview</p>
              <div className="flex gap-2">
                <button className="btn btn-primary text-sm">Primary</button>
                <button className="btn btn-secondary text-sm">Secondary</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}