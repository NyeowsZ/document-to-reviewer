'use client';

import React, { useState } from 'react';
import { ReviewerData, ReviewerType } from '../types/reviewer';
import { SAMPLE_REVIEWERS } from '../data/sampleReviewers';

interface UploadZoneProps {
  onSelectReviewer: (reviewer: ReviewerData) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onSelectReviewer }) => {
  const [selectedType, setSelectedType] = useState<ReviewerType>('document');
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredSamples = SAMPLE_REVIEWERS.filter(r => r.reviewerType === selectedType);

  const handleSimulatedUpload = (fileObj?: File) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const defaultSample = SAMPLE_REVIEWERS.find(r => r.reviewerType === selectedType) || SAMPLE_REVIEWERS[0];
      const customReviewer: ReviewerData = {
        ...defaultSample,
        id: `custom-${Date.now()}`,
        title: fileObj ? fileObj.name.replace(/\.[^/.]+$/, "") : (selectedType === 'document' ? 'Uploaded Study Document' : 'Uploaded Questionnaire Quiz'),
        fileName: fileObj ? fileObj.name : 'Lecture_Notes.pdf',
        reviewerType: selectedType,
      };
      onSelectReviewer(customReviewer);
    }, 300);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleSimulatedUpload(e.target.files[0]);
    }
  };

  return (
    <div className="font-sans text-sm text-black dark:text-zinc-100 max-w-3xl space-y-6">
      {/* Target Mode Selector: Document Reviewer vs Questionnaire */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Select Output Mode:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            onClick={() => setSelectedType('document')}
            className={`p-4 border rounded cursor-pointer transition-all ${
              selectedType === 'document'
                ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-900'
                : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Make Study Document
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Generates a structured study document supporting active recall blurring and section hierarchy collapsing.
            </p>
          </div>

          <div
            onClick={() => setSelectedType('questionnaire')}
            className={`p-4 border rounded cursor-pointer transition-all ${
              selectedType === 'questionnaire'
                ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-900'
                : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Make Questionnaire / Quiz
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Generates a self-check quiz with Multiple Choice (bold/red feedback) and Identification question sets.
            </p>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="py-5 border-y border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">
            Upload Document for {selectedType === 'document' ? 'Study Reviewer' : 'Questionnaire'}
          </h2>
          <span className="text-xs text-zinc-400">25MB limit</span>
        </div>
        <p className="text-xs text-zinc-500">
          Accepts .pdf, .docx, .txt, .md, .epub
        </p>

        <div className="flex items-center gap-3 pt-1">
          <label className="cursor-pointer inline-block py-2 px-4 bg-black text-white dark:bg-white dark:text-black rounded text-xs font-semibold hover:opacity-90 transition-opacity">
            Drag & drop or select file
            <input
              type="file"
              className="hidden"
              accept=".pdf,.docx,.txt,.md,.epub,image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>

      {isProcessing && (
        <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Processing {selectedType === 'document' ? 'Study Document' : 'Questionnaire'}...
        </p>
      )}

      {/* Preset Sample Loaders for selected type */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Sample Presets ({selectedType === 'document' ? 'Study Documents' : 'Questionnaires'}):
        </p>
        <div className="space-y-2">
          {filteredSamples.map((rev) => (
            <div
              key={rev.id}
              onClick={() => onSelectReviewer(rev)}
              className="cursor-pointer hover:underline text-xs text-zinc-800 dark:text-zinc-200 font-medium flex items-center justify-between p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
            >
              <span>- {rev.title}</span>
              <span className="text-zinc-400 text-[11px]">({rev.fileName})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
