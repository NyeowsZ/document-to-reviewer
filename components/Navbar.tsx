'use client';

import React, { useState } from 'react';
import { ActiveTab } from '../types/reviewer';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userQuote: string;
  setUserQuote: (quote: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isFocusedMode?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userQuote,
  setUserQuote,
  theme,
  toggleTheme,
  isFocusedMode = false,
}) => {
  const [isEditingQuote, setIsEditingQuote] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  return (
    <header className="w-full shrink-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 font-sans text-sm text-black dark:text-zinc-100 z-30 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setActiveTab('studio')}
            className="flex items-center gap-2 text-left group focus:outline-none"
          >
            <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:opacity-80 transition-opacity">
              DocumentToReviewer
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500">
              @nyeowsz
            </span>
          </button>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 text-xs">
          <button
            onClick={() => setActiveTab('studio')}
            className={`px-2.5 py-1.5 rounded transition-all font-medium ${
              activeTab === 'studio'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900'
            }`}
          >
            Studio & Upload
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-2.5 py-1.5 rounded transition-all font-medium ${
              activeTab === 'library'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900'
            }`}
          >
            Saved Library
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-2.5 py-1.5 rounded transition-all font-medium ${
              activeTab === 'about'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900'
            }`}
          >
            About
          </button>
        </nav>

        {/* Right: User Quote popover/badge & Theme Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quote Preview / Quick edit button */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowQuoteModal(!showQuoteModal)}
              className="max-w-[180px] lg:max-w-[220px] truncate text-[11px] italic text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              title="Click to view/edit custom quote"
            >
              &ldquo;{userQuote}&rdquo;
            </button>

            {showQuoteModal && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 shadow-xl z-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-500">Custom Quote</span>
                  <button
                    onClick={() => setShowQuoteModal(false)}
                    className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                  >
                    ✕
                  </button>
                </div>
                {isEditingQuote ? (
                  <div className="space-y-2">
                    <textarea
                      value={userQuote}
                      onChange={(e) => setUserQuote(e.target.value)}
                      className="w-full text-xs bg-zinc-50 dark:bg-zinc-950 p-2 rounded border border-zinc-300 dark:border-zinc-700 focus:outline-none"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsEditingQuote(false)}
                        className="px-2.5 py-1 text-xs bg-black text-white dark:bg-white dark:text-black rounded font-medium"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs italic text-zinc-700 dark:text-zinc-300">&ldquo;{userQuote}&rdquo;</p>
                    <button
                      onClick={() => setIsEditingQuote(true)}
                      className="text-[11px] text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline"
                    >
                      Edit quote
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded text-xs font-semibold border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Day Mode (Light)' : 'Switch to Night Mode (Dark)'}
            aria-label="Toggle Theme"
          >
            <span className="hidden sm:inline">
              {theme === 'dark' ? 'Night Mode' : 'Day Mode'}
            </span>
            <span className="sm:hidden font-mono text-xs">
              {theme === 'dark' ? '🌙' : '☀️'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

