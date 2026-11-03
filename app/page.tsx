'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { UploadZone } from '../components/UploadZone';
import { ReviewerStudio } from '../components/ReviewerStudio';
import { PortfolioAbout } from '../components/PortfolioAbout';
import { ActiveTab, ReviewerData } from '../types/reviewer';
import { SAMPLE_REVIEWERS } from '../data/sampleReviewers';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('studio');
  const [selectedReviewer, setSelectedReviewer] = useState<ReviewerData | null>(null);
  const [savedReviewers, setSavedReviewers] = useState<ReviewerData[]>(SAMPLE_REVIEWERS);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [userQuote, setUserQuote] = useState<string>(
    'phrases or quotes unique one from me but try to make placeholder sample'
  );

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
    if (!savedReviewers.some((r) => r.id === reviewer.id)) {
      setSavedReviewers([reviewer, ...savedReviewers]);
    }
  };

  const handleBackToUpload = () => {
    setSelectedReviewer(null);
  };

  const isStudyingOrQuiz = activeTab === 'studio' && selectedReviewer !== null;

  return (
    <div className="bg-white dark:bg-zinc-950 text-black dark:text-zinc-100 min-h-screen flex flex-col font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }}
        userQuote={userQuote}
        setUserQuote={setUserQuote}
        theme={theme}
        toggleTheme={toggleTheme}
        isFocusedMode={isStudyingOrQuiz}
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
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <h1 className="font-bold text-base tracking-tight">Saved Library</h1>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Access previously generated Study Documents & Questionnaires.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedReviewer(null);
                  setActiveTab('studio');
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-black text-white dark:bg-white dark:text-black"
              >
                + Create Reviewer
              </button>
            </div>

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
                    className="p-4 border border-zinc-200 dark:border-zinc-800 rounded cursor-pointer hover:border-black dark:hover:border-white transition-colors space-y-1 bg-white dark:bg-zinc-950"
                  >
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span className="font-semibold uppercase font-mono text-[11px]">
                        [{rev.docType}] • {isDoc ? 'DOCUMENT REVIEWER' : 'QUESTIONNAIRE'}
                      </span>
                      <span>{rev.uploadDate}</span>
                    </div>

                    <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{rev.title}</h3>
                    <p className="text-xs text-zinc-500">{rev.fileName} ({rev.fileSize})</p>

                    <div className="flex items-center gap-4 pt-2 text-xs text-zinc-400">
                      {isDoc ? (
                        <span>Active Recall Study Mode (Blurred & Textboxes)</span>
                      ) : (
                        <span>Questionnaire: {questionCount} Interactive Questions</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'about' && <PortfolioAbout />}
      </main>
    </div>
  );
}
