'use client';

import React from 'react';

export const PortfolioAbout: React.FC = () => {
  return (
    <div className="font-sans text-sm text-black dark:text-zinc-100 max-w-3xl space-y-6">
      <div className="pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="font-bold text-lg">DocumentToReviewer Architecture</h1>
        <p className="text-xs text-zinc-500">Engineered by @nyeowsz</p>
      </div>

      <div className="space-y-3">
        <h2 className="font-bold text-sm">System Pipeline:</h2>
        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
          1. Document Parsing (PDF / DOCX / TXT) ➔ 2. Cleaned Study Reviewer Generation (1:1 copy with preserved spacing) ➔ 3. Automated MCQ & Identification Quiz Generation ➔ 4. Minimalist Self-Study Interface.
        </p>
      </div>
    </div>
  );
};
