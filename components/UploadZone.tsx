'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ReviewerData, ReviewerType } from '../types/reviewer';
import { SAMPLE_REVIEWERS } from '../data/sampleReviewers';
import { generateReviewerWithGemini } from '../utils/geminiClient';

interface UploadZoneProps {
  onSelectReviewer: (reviewer: ReviewerData) => void;
}

const DOCUMENT_MESSAGES = [
  'Reading document chunks and stripping layout noise...',
  'Extracting core conceptual hierarchy and headers...',
  'Identifying key terminology, definitions, and active recall anchors...',
  'Formulating structured active-recall study document...',
  'Polishing markdown formatting and typography...',
  'Finalizing reviewer document structure...',
];

const QUIZ_MESSAGES = [
  'Parsing document content and key principles...',
  'Extracting critical facts, terminologies, and definitions...',
  'Synthesizing Multiple Choice Questions with plausible distractors...',
  'Drafting Identification challenge questions and answer keys...',
  'Checking question-to-answer semantic alignment...',
  'Assembling interactive self-check questionnaire...',
];

export const UploadZone: React.FC<UploadZoneProps> = ({ onSelectReviewer }) => {
  const [selectedType, setSelectedType] = useState<ReviewerType>('document');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Multi-step progress animation state
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  // Multi-step random progress bar and message cycle while processing
  useEffect(() => {
    if (!isProcessing) {
      setProgressPercent(0);
      setCurrentMessageIndex(0);
      return;
    }

    setProgressPercent(12);
    setCurrentMessageIndex(0);

    const messageList = selectedType === 'document' ? DOCUMENT_MESSAGES : QUIZ_MESSAGES;

    // Progress bar stepper with randomized increments
    const progressTimer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 92) return prev; // Hold at ~92% until complete
        // Random incremental bump between 4% and 14%
        const jump = Math.floor(Math.random() * 11) + 4;
        return Math.min(prev + jump, 92);
      });
    }, 600 + Math.random() * 500);

    // Random message rotation
    let messageTimer: NodeJS.Timeout;
    const scheduleNextMessage = () => {
      const delay = 1400 + Math.random() * 1600; // between 1.4s and 3.0s
      messageTimer = setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messageList.length);
        if (isProcessing) {
          scheduleNextMessage();
        }
      }, delay);
    };
    scheduleNextMessage();

    return () => {
      clearInterval(progressTimer);
      clearTimeout(messageTimer);
    };
  }, [isProcessing, selectedType]);

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
      setProgressPercent(100);
      setTimeout(() => {
        setIsProcessing(false);
        onSelectReviewer(generated);
      }, 350);
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage(err?.message || 'Failed to generate with Google AI.');
    }
  };

  const handleProcessFile = (file: File) => {
    if (isProcessing) return;
    setErrorMessage(null);

    // If no API key saved, prompt the user with modal
    if (!apiKey || apiKey.trim().length === 0) {
      setPendingFile(file);
      setShowApiKeyModal(true);
      return;
    }

    startGeneration(file, apiKey);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleProcessFile(file);
    }
    // reset input value so re-selecting same file works
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isProcessing) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isProcessing) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
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
      }, 400);
    }
  };

  const activeMessages = selectedType === 'document' ? DOCUMENT_MESSAGES : QUIZ_MESSAGES;
  const currentMessage = activeMessages[currentMessageIndex] || activeMessages[0];

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
                disabled={isProcessing}
                onClick={() => setShowApiKeyModal(true)}
                className="text-zinc-400 hover:text-black dark:hover:text-white underline disabled:opacity-40 disabled:cursor-not-allowed"
              >
                (Change Key)
              </button>
            </div>
          ) : (
            <button
              disabled={isProcessing}
              onClick={() => setShowApiKeyModal(true)}
              className="text-xs text-zinc-400 hover:text-black dark:hover:text-white underline disabled:opacity-40 disabled:cursor-not-allowed"
            >
              + Set Gemini API Key
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            onClick={() => !isProcessing && setSelectedType('document')}
            className={`p-4 border rounded transition-all ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } ${
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
            onClick={() => !isProcessing && setSelectedType('questionnaire')}
            className={`p-4 border rounded transition-all ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } ${
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

      {/* Upload Zone & Drag & Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`py-6 px-5 border rounded-lg transition-all space-y-3 ${
          isProcessing
            ? 'opacity-60 bg-zinc-100 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 cursor-not-allowed pointer-events-none select-none'
            : isDragOver
            ? 'border-black dark:border-white bg-zinc-100 dark:bg-zinc-900 scale-[0.99]'
            : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Upload Document for {selectedType === 'document' ? 'Study Reviewer' : 'Questionnaire'}
          </h2>
          <span className="text-xs text-zinc-400">15MB limit</span>
        </div>
        <p className="text-xs text-zinc-500">
          Accepts .pdf, .docx, .txt, .md, .epub
        </p>

        <div className="flex items-center gap-3 pt-2">
          <label
            className={`inline-flex items-center justify-center py-2 px-4 rounded text-xs font-semibold transition-all ${
              isProcessing
                ? 'bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'cursor-pointer bg-black text-white dark:bg-white dark:text-black hover:opacity-90 active:scale-95'
            }`}
          >
            {isProcessing ? 'Processing File...' : 'Drag & drop or select file'}
            <input
              ref={fileInputRef}
              type="file"
              disabled={isProcessing}
              className="hidden"
              accept=".pdf,.docx,.txt,.md,.epub,image/*"
              onChange={handleFileChange}
            />
          </label>
          <span className="text-xs text-zinc-400 hidden sm:inline">
            {isProcessing ? 'Upload disabled during generation' : 'Or drop anywhere inside this card'}
          </span>
        </div>
      </div>

      {/* Multi-Step Horizontal Progress Bar & Timed Status Messages */}
      {isProcessing && (
        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-3 transition-all">
          {/* Header & Status Message */}
          <div className="flex items-center justify-between text-xs gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-ping shrink-0" />
              <p className="font-medium text-zinc-800 dark:text-zinc-200 truncate">
                {currentMessage}
              </p>
            </div>
            <span className="font-mono text-zinc-500 font-semibold text-[11px] shrink-0">
              {progressPercent}%
            </span>
          </div>

          {/* Horizontal animated progress track */}
          <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Subtitle / model notice */}
          <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-0.5">
            <span>Synthesizing with Google Gemini 3.5 Flash Lite</span>
            <span className="italic">Please do not close this tab</span>
          </div>
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
              onClick={() => !isProcessing && onSelectReviewer(rev)}
              className={`text-xs text-zinc-800 dark:text-zinc-200 font-medium flex items-center justify-between p-2 rounded border border-transparent transition-colors ${
                isProcessing
                  ? 'opacity-40 cursor-not-allowed'
                  : 'cursor-pointer hover:underline hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-200 dark:border-zinc-800'
              }`}
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
