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
    <div className="font-sans text-sm sm:text-base text-black dark:text-zinc-100 max-w-3xl mx-auto space-y-5">
      {/* Top Header Card - responsive, well spaced */}
      <div className="p-3.5 sm:p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onBackToUpload}
              className="px-2.5 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
            >
              [Back]
            </button>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wide font-semibold ${
                isDocumentType
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700'
                  : 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black'
              }`}
            >
              {isDocumentType ? 'Document Reviewer' : 'Interactive Questionnaire'}
            </span>
          </div>

          <span className="text-xs text-zinc-400 font-mono">
            {reviewer.fileName} ({reviewer.fileSize})
          </span>
        </div>

        <div>
          <h1 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 leading-snug">
            {reviewer.title}
          </h1>
        </div>
      </div>

      {/* 1. DOCUMENT REVIEWER VIEW */}
      {isDocumentType && reviewer.rawMarkdown && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs gap-3">
            <div className="space-y-0.5">
              <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                Active Recall Study Mode
              </p>
              <p className="text-zinc-500 leading-relaxed text-xs">
                {isStudyMode
                  ? 'Key terms are blurred or blank inputs. Click blurred terms to reveal.'
                  : 'Normal reading view. Turn Study Mode ON to practice active recall.'}
              </p>
            </div>
            <button
              onClick={() => setIsStudyMode(!isStudyMode)}
              className={`px-3.5 py-2 rounded text-xs font-bold transition-colors shrink-0 text-center w-full sm:w-auto ${
                isStudyMode
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black border border-transparent'
                  : 'border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
              }`}
            >
              {isStudyMode ? 'Study Mode: [ON]' : 'Study Mode: [OFF]'}
            </button>
          </div>

          <article className="max-w-none pt-1">
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
