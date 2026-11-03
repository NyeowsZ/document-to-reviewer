'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { UploadZone } from '../components/UploadZone';
import { ReviewerStudio } from '../components/ReviewerStudio';
import { PortfolioAbout } from '../components/PortfolioAbout';
import { ActiveTab, ReviewerData } from '../types/reviewer';
import { SAMPLE_REVIEWERS } from '../data/sampleReviewers';

const STORAGE_KEY = 'document_to_reviewer_library_v1';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('studio');
  const [selectedReviewer, setSelectedReviewer] = useState<ReviewerData | null>(null);
  const [savedReviewers, setSavedReviewers] = useState<ReviewerData[]>(SAMPLE_REVIEWERS);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved library from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: ReviewerData[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedReviewers(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load reviewers from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save reviewers to localStorage whenever savedReviewers changes (after initial mount)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedReviewers));
    } catch (e) {
      console.error('Failed to persist reviewers to localStorage:', e);
    }
  }, [savedReviewers, isLoaded]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectReviewer = (reviewer: ReviewerData) => {
    setSelectedReviewer(reviewer);
    setSavedReviewers((prev) => {
      const existsIndex = prev.findIndex((r) => r.id === reviewer.id);
      if (existsIndex >= 0) {
        // Update existing entry and bring to top
        const updated = [...prev];
        updated.splice(existsIndex, 1);
        return [reviewer, ...updated];
      }
      return [reviewer, ...prev];
    });
  };

  const handleDeleteReviewer = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this item from your library?')) {
      setSavedReviewers((prev) => prev.filter((r) => r.id !== id));
      if (selectedReviewer?.id === id) {
        setSelectedReviewer(null);
      }
    }
  };

  const handleResetSampleData = () => {
    if (confirm('Reset library to default sample documents and quizzes?')) {
      setSavedReviewers(SAMPLE_REVIEWERS);
    }
  };

  const handleBackToUpload = () => {
    setSelectedReviewer(null);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-black dark:text-zinc-100 min-h-screen flex flex-col font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Workspace Area - full width, clean, uncluttered reading & quiz view */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 overflow-y-auto">
        {activeTab === 'studio' && (
          <>
            {selectedReviewer ? (
              <ReviewerStudio
                reviewer={selectedReviewer}
                onBackToUpload={handleBackToUpload}
              />
            ) : (
              <UploadZone onSelectReviewer={handleSelectReviewer} />
            )}
          </>
        )}

        {activeTab === 'library' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 gap-3">
              <div>
                <h1 className="font-bold text-base tracking-tight">Saved Library</h1>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Saved study documents & questionnaires in your browser.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleResetSampleData}
                  className="px-2.5 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
                  title="Restore default sample materials"
                >
                  Reset Defaults
                </button>
                <button
                  onClick={() => {
                    setSelectedReviewer(null);
                    setActiveTab('studio');
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded bg-black text-white dark:bg-white dark:text-black transition-opacity hover:opacity-90"
                >
                  + Create Reviewer
                </button>
              </div>
            </div>

            {savedReviewers.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-zinc-300 dark:border-zinc-800 rounded-lg">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Your library is empty</p>
                <p className="text-xs text-zinc-400 mt-1">Generate or upload documents in the Studio to save them here.</p>
                <button
                  onClick={() => {
                    setSelectedReviewer(null);
                    setActiveTab('studio');
                  }}
                  className="mt-4 px-3 py-1.5 text-xs font-semibold rounded bg-black text-white dark:bg-white dark:text-black"
                >
                  Go to Studio
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {savedReviewers.map((rev) => {
                  const isDoc = rev.reviewerType === 'document';
                  const questionCount = (rev.mcqQuestions?.length || 0) + (rev.identificationQuestions?.length || 0);

                  return (
                    <div
                      key={rev.id}
                      onClick={() => {
                        setSelectedReviewer(rev);
                        setActiveTab('studio');
                      }}
                      className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer hover:border-black dark:hover:border-white transition-colors space-y-1.5 bg-white dark:bg-zinc-950 group relative"
                    >
                      <div className="flex items-center justify-between text-xs text-zinc-500">
                        <span className="font-semibold uppercase font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                          [{rev.docType}] • {isDoc ? 'DOCUMENT REVIEWER' : 'QUESTIONNAIRE'}
                        </span>
                        <div className="flex items-center gap-3">
                          <span>{rev.uploadDate}</span>
                          <button
                            onClick={(e) => handleDeleteReviewer(rev.id, e)}
                            className="text-zinc-400 hover:text-red-500 text-xs px-1 py-0.5 rounded transition-colors"
                            title="Remove from saved library"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                        {rev.title}
                      </h3>
                      <p className="text-xs text-zinc-500">{rev.fileName} ({rev.fileSize})</p>

                      <div className="flex items-center justify-between pt-1.5 text-xs text-zinc-400">
                        <span>
                          {isDoc
                            ? 'Active Recall Study Mode (Blurred & Textboxes)'
                            : `Questionnaire: ${questionCount} Interactive Questions`}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200">
                          Open →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && <PortfolioAbout />}
      </main>
    </div>
  );
}
