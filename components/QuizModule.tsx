'use client';

import React, { useState, useMemo } from 'react';
import {
  MCQQuestion,
  MCQChoice,
  IdentificationQuestion,
  QuestionnaireItem,
  HeaderItem,
} from '../types/reviewer';

interface QuizModuleProps {
  mcqQuestions?: MCQQuestion[];
  identificationQuestions?: IdentificationQuestion[];
  questionnaireItems?: QuestionnaireItem[];
}

export const QuizModule: React.FC<QuizModuleProps> = ({
  mcqQuestions = [],
  identificationQuestions = [],
  questionnaireItems,
}) => {
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [identInputs, setIdentInputs] = useState<Record<string, string>>({});
  const [identChecked, setIdentChecked] = useState<Record<string, boolean>>({});
  const [identFocused, setIdentFocused] = useState<Record<string, boolean>>({});
  const [shuffledMcqChoices, setShuffledMcqChoices] = useState<Record<string, MCQChoice[]>>({});

  // Normalize items stream into MCQ list and Identification list without header bleeding
  const { mcqList, identList } = useMemo(() => {
    if (questionnaireItems && questionnaireItems.length > 0) {
      const mcq: QuestionnaireItem[] = [];
      const ident: QuestionnaireItem[] = [];

      let pendingHeader: HeaderItem | null = null;

      questionnaireItems.forEach((item) => {
        if (item.type === 'header') {
          pendingHeader = item;
        } else if (item.type === 'mcq') {
          if (pendingHeader) {
            mcq.push(pendingHeader);
            pendingHeader = null;
          }
          mcq.push(item);
        } else if (item.type === 'identification') {
          if (pendingHeader) {
            ident.push(pendingHeader);
            pendingHeader = null;
          }
          ident.push(item);
        }
      });
      return { mcqList: mcq, identList: ident };
    }

    const mcq: QuestionnaireItem[] = mcqQuestions.map((q) => ({ type: 'mcq', ...q }));
    const ident: QuestionnaireItem[] = identificationQuestions.map((q) => ({
      type: 'identification',
      ...q,
    }));

    return { mcqList: mcq, identList: ident };
  }, [questionnaireItems, mcqQuestions, identificationQuestions]);

  const hasMcqQuestions = useMemo(
    () => mcqList.some((item) => item.type === 'mcq'),
    [mcqList]
  );
  const hasIdentQuestions = useMemo(
    () => identList.some((item) => item.type === 'identification'),
    [identList]
  );

  const totalQuestionCount = useMemo(() => {
    const mcqCount = mcqList.filter((i) => i.type === 'mcq').length;
    const identCount = identList.filter((i) => i.type === 'identification').length;
    return mcqCount + identCount;
  }, [mcqList, identList]);

  const handleMcqSelect = (questionId: string, choiceIdx: number) => {
    setMcqAnswers((prev) => ({ ...prev, [questionId]: choiceIdx }));
  };

  const handleShuffleChoices = () => {
    const newShuffled: Record<string, MCQChoice[]> = {};

    mcqList.forEach((item) => {
      if (item.type === 'mcq' && Array.isArray(item.choices)) {
        const choicesCopy = [...item.choices];
        for (let i = choicesCopy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [choicesCopy[i], choicesCopy[j]] = [choicesCopy[j], choicesCopy[i]];
        }
        newShuffled[item.id] = choicesCopy;
      }
    });

    setShuffledMcqChoices(newShuffled);
    setMcqAnswers({});
  };

  const handleResetQuiz = () => {
    setMcqAnswers({});
    setIdentInputs({});
    setIdentChecked({});
    setIdentFocused({});
    setShuffledMcqChoices({});
  };

  const scrollToAnchor = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  let globalQuestionCounter = 0;

  return (
    <div className="font-sans text-base text-black dark:text-zinc-100 max-w-3xl space-y-6">
      {/* Top Header Bar & Explicit Part Anchors */}
      <div className="sticky top-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 pb-3 pt-1 z-10 space-y-2">
        <div className="flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-zinc-900 dark:text-zinc-100">Questionnaire Testpaper</span>
            <span className="text-zinc-400">({totalQuestionCount} Questions)</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {hasMcqQuestions && (
              <button
                onClick={handleShuffleChoices}
                className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white font-medium hover:underline"
              >
                [Shuffle Choices]
              </button>
            )}
            <button
              onClick={handleResetQuiz}
              className="text-zinc-500 hover:text-black dark:hover:text-white hover:underline"
            >
              [Reset All]
            </button>
          </div>
        </div>

        {/* Clear Type Part Anchors */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 text-xs no-scrollbar">
          <span className="text-zinc-400 text-[11px] font-mono mr-1 shrink-0">Jump to Section:</span>
          {hasMcqQuestions && (
            <button
              onClick={() => scrollToAnchor('sec-part-mcq')}
              className="px-2.5 py-1 rounded text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors shrink-0 border border-zinc-200 dark:border-zinc-800"
            >
              Part I: Multiple Choice
            </button>
          )}
          {hasIdentQuestions && (
            <button
              onClick={() => scrollToAnchor('sec-part-ident')}
              className="px-2.5 py-1 rounded text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors shrink-0 border border-zinc-200 dark:border-zinc-800"
            >
              Part II: Identification
            </button>
          )}
        </div>
      </div>

      {/* Explicit Question Type Sections */}
      <div className="space-y-10">
        {/* PART I: MULTIPLE CHOICE QUESTIONS */}
        {hasMcqQuestions && (
          <section id="sec-part-mcq" className="space-y-5 scroll-mt-24">
            <div className="mt-10 flex items-center justify-between">
              <h2 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 tracking-tight">
                Part I: Multiple Choice Questions
              </h2>
            </div>

            <div className="space-y-5">
              {mcqList.map((item) => {
                if (item.type === 'header') {
                  return (
                    <div key={item.id} className="pt-5 pb-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {item.message}
                      </p>
                    </div>
                  );
                }

                globalQuestionCounter++;
                const questionNumber = globalQuestionCounter;
                const choices =
                  shuffledMcqChoices[item.id] ||
                  (item.type === 'mcq' ? item.choices : []) ||
                  [];
                const selectedIdx = mcqAnswers[item.id];

                return (
                  <div
                    key={item.id}
                    id={`q-${questionNumber}`}
                    className="space-y-1.5 scroll-mt-24"
                  >
                    <p className="font-normal text-zinc-900 dark:text-zinc-100">
                      <span className="font-semibold">{questionNumber}.</span> {item.question || 'Select the most appropriate option based on the document:'}
                    </p>

                    <div className="pl-4 space-y-1">
                      {choices.map((choice, cIdx) => {
                        const letter = String.fromCharCode(65 + cIdx);
                        const isSelected = selectedIdx === cIdx;
                        const isCorrect = choice.isCorrect;

                        let choiceClass =
                          'cursor-pointer hover:underline text-zinc-700 dark:text-zinc-300';
                        if (isSelected) {
                          if (isCorrect) {
                            choiceClass = 'font-bold text-black dark:text-white cursor-pointer';
                          } else {
                            choiceClass = 'text-red-600 dark:text-red-400 cursor-pointer';
                          }
                        }

                        return (
                          <div
                            key={cIdx}
                            onClick={() => handleMcqSelect(item.id, cIdx)}
                            className={choiceClass}
                          >
                            {letter}. {choice.choiceText}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* PART II: IDENTIFICATION QUESTIONS */}
        {hasIdentQuestions && (
          <section id="sec-part-ident" className="space-y-5 scroll-mt-24 pt-2">
            <div className="mt-10 flex items-center justify-between">
              <h2 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 tracking-tight">
                Part II: Identification Questions
              </h2>
            </div>

            <div className="space-y-5">
              {identList.map((item) => {
                if (item.type === 'header') {
                  return (
                    <div key={item.id} className="pt-5 pb-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {item.message}
                      </p>
                    </div>
                  );
                }

                globalQuestionCounter++;
                const questionNumber = globalQuestionCounter;
                const uInput = identInputs[item.id] || '';
                const isFocused = identFocused[item.id];
                const isChecked = identChecked[item.id] && !isFocused && uInput.trim().length > 0;
                const identAnswers = item.type === 'identification' ? item.answers : [];
                const isMatch = identAnswers.some(
                  (ans: string) => ans.toLowerCase() === uInput.trim().toLowerCase()
                );

                let inputTextClass = 'text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700';
                if (isChecked) {
                  if (isMatch) {
                    inputTextClass = 'font-bold text-black dark:text-white border-black dark:border-white';
                  } else {
                    inputTextClass = 'text-red-600 dark:text-red-400 border-red-500';
                  }
                }

                return (
                  <div
                    key={item.id}
                    id={`q-${questionNumber}`}
                    className="space-y-1.5 scroll-mt-24"
                  >
                    <p className="font-normal text-zinc-900 dark:text-zinc-100">
                      <span className="font-semibold">{questionNumber}.</span> {item.question || 'Identify the term or concept described:'}
                    </p>

                    <div className="pl-4 flex items-center gap-3">
                      <input
                        type="text"
                        value={uInput}
                        onChange={(e) =>
                          setIdentInputs((prev) => ({ ...prev, [item.id]: e.target.value }))
                        }
                        onFocus={() => {
                          setIdentFocused((prev) => ({ ...prev, [item.id]: true }));
                        }}
                        onBlur={() => {
                          setIdentFocused((prev) => ({ ...prev, [item.id]: false }));
                          if (uInput.trim().length > 0) {
                            setIdentChecked((prev) => ({ ...prev, [item.id]: true }));
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            (e.target as HTMLInputElement).blur();
                          }
                        }}
                        placeholder=" "
                        className={`border-b bg-transparent px-1 py-0.5 text-base focus:outline-none w-56 transition-colors ${inputTextClass}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
