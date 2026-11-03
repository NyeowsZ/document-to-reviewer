'use client';

import React from 'react';
import { ActiveTab } from '../types/reviewer';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userQuote: string;
  setUserQuote: (quote: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  userQuote,
  setUserQuote,
  theme,
  toggleTheme,
}) => {
  const [isEditingQuote, setIsEditingQuote] = React.useState(false);

  return (
    <aside className="w-full md:w-64 md:h-screen md:sticky md:top-0 shrink-0 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-5 flex flex-col justify-between font-sans text-sm text-black dark:text-zinc-100 overflow-y-auto">
      <div>
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-base tracking-tight">DocumentToReviewer</h1>
            <a
              href="https://github.com/nyeowsz/document-to-reviewer"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-zinc-500 hover:underline block truncate mt-0.5"
            >
              github.com/nyeowsz/document-to-reviewer
            </a>
          </div>
        </div>

        {/* Profile Card strictly matching Figma sketch */}
        <div className="mb-6 space-y-1">
          <p className="font-medium text-xs text-zinc-400">github profile</p>
          <p className="font-bold">@nyeowsz</p>

          <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            {isEditingQuote ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={userQuote}
                  onChange={(e) => setUserQuote(e.target.value)}
                  className="w-full text-xs bg-zinc-50 dark:bg-zinc-900 p-2 rounded border border-zinc-300 dark:border-zinc-700 focus:outline-none"
                  rows={2}
                />
                <button
                  onClick={() => setIsEditingQuote(false)}
                  className="self-end px-2 py-1 text-[10px] bg-black text-white dark:bg-white dark:text-black rounded font-medium"
                >
                  Done
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingQuote(true)}
                className="cursor-pointer flex items-start justify-between gap-1 group"
                title="Click to edit quote"
              >
                <p className="italic text-[11px] leading-relaxed">
                  &quot;{userQuote}&quot;
                </p>
                <span className="text-[10px] text-zinc-400 group-hover:text-black dark:group-hover:text-white shrink-0">
                  (edit)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs strictly matching Figma sketch */}
        <nav className="space-y-1 text-xs">
          <button
            onClick={() => setActiveTab('studio')}
            className={`w-full text-left py-1.5 px-2 rounded transition-colors ${
              activeTab === 'studio'
                ? 'font-bold bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            1. Studio & Upload
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`w-full text-left py-1.5 px-2 rounded transition-colors ${
              activeTab === 'library'
                ? 'font-bold bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            2. Saved Library
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`w-full text-left py-1.5 px-2 rounded transition-colors ${
              activeTab === 'about'
                ? 'font-bold bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            3. Project Architecture
          </button>
        </nav>
      </div>

      {/* Theme Toggle & Footer */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500 font-medium">Theme Mode</span>
          <button
            onClick={toggleTheme}
            className="px-2.5 py-1 rounded text-xs font-semibold border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            {theme === 'dark' ? 'Night Mode (Dark)' : 'Day Mode (Light)'}
          </button>
        </div>
        <div className="text-[11px] text-zinc-400">
          Minimalist Inter UI
        </div>
      </div>
    </aside>
  );
};
