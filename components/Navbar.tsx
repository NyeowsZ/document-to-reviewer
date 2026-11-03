'use client';

import React from 'react';
import { ActiveTab } from '../types/reviewer';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
}) => {
  return (
    <header className="w-full shrink-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 font-sans z-30 transition-all">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4">
        {/* Brand row on mobile: brand on left, theme switch on right */}
        <div className="flex items-center justify-between min-w-0">
          <button
            onClick={() => setActiveTab('studio')}
            className="flex items-center gap-2 text-left group focus:outline-none min-w-0"
          >
            <span className="font-bold text-sm sm:text-base tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:opacity-80 transition-opacity truncate">
              DocumentToReviewer
            </span>
            <span className="hidden md:inline-block text-xs font-mono px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500">
              @nyeowsz
            </span>
          </button>

          {/* Theme button on mobile */}
          <div className="sm:hidden shrink-0">
            <button
              onClick={toggleTheme}
              className="px-2.5 py-1 rounded text-xs font-semibold border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? 'Night Mode' : 'Day Mode'}
            </button>
          </div>
        </div>

        {/* Navigation tabs & Desktop Theme button */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
          <nav className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex-1 sm:flex-none text-center px-3 py-1.5 rounded transition-all font-medium ${
                activeTab === 'studio'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-zinc-100/70 dark:bg-zinc-900/70 sm:bg-transparent'
              }`}
            >
              Studio
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`flex-1 sm:flex-none text-center px-3 py-1.5 rounded transition-all font-medium ${
                activeTab === 'library'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-zinc-100/70 dark:bg-zinc-900/70 sm:bg-transparent'
              }`}
            >
              Library
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 sm:flex-none text-center px-3 py-1.5 rounded transition-all font-medium ${
                activeTab === 'about'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-zinc-100/70 dark:bg-zinc-900/70 sm:bg-transparent'
              }`}
            >
              About
            </button>
          </nav>

          {/* Theme button on Desktop */}
          <div className="hidden sm:flex items-center shrink-0 ml-2">
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded text-xs font-semibold border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? 'Night Mode' : 'Day Mode'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
