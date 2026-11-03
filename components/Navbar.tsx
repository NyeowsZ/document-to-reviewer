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
    <header className="w-full shrink-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 font-sans text-base text-black dark:text-zinc-100 z-30 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Brand / Title */}
        <div className="flex items-center min-w-0 shrink">
          <button
            onClick={() => setActiveTab('studio')}
            className="flex items-center gap-2 text-left group focus:outline-none"
          >
            <span className="font-bold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:opacity-80 transition-opacity truncate">
              DocumentToReviewer
            </span>
            <span className="hidden md:inline-block text-xs font-mono px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500">
              @nyeowsz
            </span>
          </button>
        </div>

        {/* Center/Nav: Responsive Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 text-sm shrink-0">
          <button
            onClick={() => setActiveTab('studio')}
            className={`px-3 py-1.5 rounded-md transition-all font-medium ${
              activeTab === 'studio'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900'
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-3 py-1.5 rounded-md transition-all font-medium ${
              activeTab === 'library'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900'
            }`}
          >
            Library
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-1.5 rounded-md transition-all font-medium ${
              activeTab === 'about'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900'
            }`}
          >
            About
          </button>
        </nav>

        {/* Right: Theme Toggle Button */}
        <div className="flex items-center shrink-0">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Day Mode (Light)' : 'Switch to Night Mode (Dark)'}
            aria-label="Toggle Theme"
          >
            <span className="text-sm leading-none">
              {theme === 'dark' ? '🌙' : '☀️'}
            </span>
            <span className="hidden sm:inline">
              {theme === 'dark' ? 'Night' : 'Day'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
