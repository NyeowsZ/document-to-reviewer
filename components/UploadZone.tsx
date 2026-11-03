'use client';

import React, { useState, useEffect } from 'react';
import { ReviewerData, ReviewerType } from '../types/reviewer';
import { SAMPLE_REVIEWERS } from '../data/sampleReviewers';
import { generateReviewerWithGemini } from '../utils/geminiClient';

interface UploadZoneProps {
  onSelectReviewer: (reviewer: ReviewerData) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onSelectReviewer }) => {
  const [selectedType, setSelectedType] = useState<ReviewerType>('document');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // API Key management (client-side only, stored in localStorage)
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [tempKeyInput, setTempKeyInput] = useState<string>('');

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setTempKeyInput(savedKey);
    }
  }, []);

  const filteredSamples = SAMPLE_REVIEWERS.filter((r) => r.reviewerType === selectedType);

  const startGeneration = async (file: File, keyToUse: string) => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const generated = await generateReviewerWithGemini({
        file,
        apiKey: keyToUse,
        reviewerType: selectedType,
      });
      setIsProcessing(false);
      onSelectReviewer(generated);
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage(err?.message || 'Failed to generate with Google AI.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setErrorMessage(null);

      // If no API key saved, prompt the user with modal
      if (!apiKey || apiKey.trim().length === 0) {
        setPendingFile(file);
        setShowApiKeyModal(true);
        return;
      }

      startGeneration(file, apiKey);
    }
  };

  const handleSaveApiKeyAndProceed = () => {
    const trimmed = tempKeyInput.trim();
    if (!trimmed) {
      setErrorMessage('Please enter a valid Gemini API Key to continue.');
      return;
    }

    localStorage.setItem('gemini_api_key', trimmed);
    setApiKey(trimmed);
    setShowApiKeyModal(false);

    if (pendingFile) {
      const f = pendingFile;
      setPendingFile(null);
      startGeneration(f, trimmed);
    }
  };

  const handleUseMockSampleInstead = () => {
    setShowApiKeyModal(false);
    if (pendingFile) {
      const file = pendingFile;
      setPendingFile(null);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        const defaultSample = SAMPLE_REVIEWERS.find((r) => r.reviewerType === selectedType) || SAMPLE_REVIEWERS[0];
        onSelectReviewer({
          ...defaultSample,
          id: `sample-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, ''),
          fileName: file.name,
          reviewerType: selectedType,
        });
      }, 350);
    }
  };

  return (
    <div className="font-sans text-sm text-black dark:text-zinc-100 max-w-3xl space-y-6">
      {/* Target Mode Selector: Document Reviewer vs Questionnaire */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Select Output Mode:
          </p>
          {apiKey ? (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-emerald-500 font-medium">● Google AI Connected</span>
              <button
                onClick={() => setShowApiKeyModal(true)}
                className="text-zinc-400 hover:text-black dark:hover:text-white underline"
              >
                (Change Key)
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowApiKeyModal(true)}
              className="text-xs text-zinc-400 hover:text-black dark:hover:text-white underline"
            >
              + Set Gemini API Key
            </button>
          )}
        </div>

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
          <span className="text-xs text-zinc-400">15MB limit</span>
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

      {/* Processing State */}
      {isProcessing && (
        <div className="p-4 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Streaming directly to Google Gemini 3.5 Flash Lite... Parsing document and generating{' '}
            {selectedType === 'document' ? 'Study Reviewer' : 'Questionnaire'}...
          </p>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-3 text-xs rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 flex items-center justify-between">
          <span>{errorMessage}</span>
          <button
            onClick={() => setErrorMessage(null)}
            className="hover:underline font-bold ml-2 shrink-0"
          >
            ✕
          </button>
        </div>
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
              className="cursor-pointer hover:underline text-xs text-zinc-800 dark:text-zinc-200 font-medium flex items-center justify-between p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:border-zinc-800"
            >
              <span>- {rev.title}</span>
              <span className="text-zinc-400 text-[11px]">({rev.fileName})</span>
            </div>
          ))}
        </div>
      </div>

      {/* API Key Modal Prompt */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="space-y-1">
              <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                Google Gemini API Key Required
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                To parse your document directly from your browser without third-party servers, enter your free{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-black dark:text-white font-medium"
                >
                  Google AI Studio API Key
                </a>
                . It is stored securely in your browser&apos;s localStorage.
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="password"
                value={tempKeyInput}
                onChange={(e) => setTempKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full text-xs font-mono p-2.5 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:border-black dark:focus:border-white text-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleUseMockSampleInstead}
                className="text-xs text-zinc-500 hover:underline"
              >
                Use Sample Demo Instead
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowApiKeyModal(false)}
                  className="px-3 py-1.5 text-xs rounded border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveApiKeyAndProceed}
                  className="px-3 py-1.5 text-xs font-semibold rounded bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
                >
                  Save & Process
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
