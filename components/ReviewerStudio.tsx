'use client';

import React, { useState } from 'react';
import { ReviewerData } from '../types/reviewer';
import { QuizModule } from './QuizModule';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ReviewerStudioProps {
  reviewer: ReviewerData;
  onBackToUpload: () => void;
}

export const ReviewerStudio: React.FC<ReviewerStudioProps> = ({
  reviewer,
  onBackToUpload,
}) => {
  const [isStudyMode, setIsStudyMode] = useState<boolean>(false);

  const isDocumentType = reviewer.reviewerType === 'document';

  return (
    <div className="font-sans text-sm text-black dark:text-zinc-100 max-w-3xl mx-auto space-y-6">
      {/* Top Navigation & Type Badge */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 text-xs gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToUpload}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-medium transition-colors"
          >
            ← Back to Documents
          </button>
          <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate max-w-xs md:max-w-md">
            {reviewer.title}
          </span>
          <span className="text-zinc-400 text-[11px] hidden sm:inline">({reviewer.fileName})</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
              isDocumentType
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700'
                : 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-semibold'
            }`}
          >
            {isDocumentType ? 'Document Reviewer' : 'Questionnaire'}
          </span>
        </div>
      </div>

      {/* 1. DOCUMENT REVIEWER VIEW */}
      {isDocumentType && reviewer.rawMarkdown && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-xs">
            <div>
              <p className="font-bold text-zinc-900 dark:text-zinc-100">
                Study Mode: Active Recall Blur
              </p>
              <p className="text-zinc-500">
                {isStudyMode
                  ? 'Key terms are blurred or converted into testboxes. Click any blurred term to unblur.'
                  : 'Normal document view. Toggle Study Mode to activate active recall blurring.'}
              </p>
            </div>
            <button
              onClick={() => setIsStudyMode(!isStudyMode)}
              className={`px-3 py-1.5 rounded font-bold text-xs transition-colors shrink-0 ${
                isStudyMode
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              {isStudyMode ? 'Study Mode: ON' : 'Study Mode: OFF'}
            </button>
          </div>

          <article className="max-w-none">
            <MarkdownRenderer
              content={reviewer.rawMarkdown}
              isStudyMode={isStudyMode}
            />
          </article>
        </div>
      )}

      {/* 2. QUESTIONNAIRE REVIEWER VIEW */}
      {!isDocumentType && (
        <QuizModule
          mcqQuestions={reviewer.mcqQuestions || []}
          identificationQuestions={reviewer.identificationQuestions || []}
          questionnaireItems={reviewer.questionnaireItems}
        />
      )}
    </div>
  );
};
