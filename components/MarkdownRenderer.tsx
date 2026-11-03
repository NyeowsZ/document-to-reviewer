'use client';

import React, { useState } from 'react';

interface MarkdownRendererProps {
  content: string;
  isStudyMode?: boolean;
}

interface TermElementProps {
  term: string;
  isStudyMode: boolean;
  isTextboxTerm?: boolean;
}

const TermElement: React.FC<TermElementProps> = ({
  term,
  isStudyMode,
  isTextboxTerm = false,
}) => {
  const [isBlurred, setIsBlurred] = useState(true);
  const [userInput, setUserInput] = useState('');

  const cleanTarget = term.trim().toLowerCase();
  const cleanUser = userInput.trim().toLowerCase();
  const isCorrect = cleanUser === cleanTarget;

  // Normal Mode: Clean term, zero brackets
  if (!isStudyMode) {
    return (
      <span data-term="true" className="font-semibold text-zinc-900 dark:text-zinc-100">
        {term}
      </span>
    );
  }

  // Header or Enumerated List Key Term in Study Mode: Minimalist input textbox with UNIFORM STATIC WIDTH (w-36)
  if (isTextboxTerm) {
    return (
      <span className="inline-flex items-center gap-1 mx-0.5 font-sans align-baseline text-inherit font-inherit">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder=""
          className={`w-36 border-b border-zinc-400 dark:border-zinc-600 px-1 py-0 bg-transparent text-inherit font-inherit focus:outline-none transition-colors ${
            isCorrect
              ? 'font-bold text-black dark:text-white'
              : 'text-zinc-800 dark:text-zinc-200'
          }`}
        />
      </span>
    );
  }

  // Body / Prose Term in Study Mode: Tight inline blurred span (NO border-b when revealed)
  return (
    <span
      data-term="true"
      onClick={() => setIsBlurred(!isBlurred)}
      className={`inline py-0 px-1 rounded cursor-pointer transition-all mx-0.5 align-baseline ${
        isBlurred
          ? 'blur-[3px] select-none bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
          : 'font-bold text-black dark:text-white bg-zinc-100 dark:bg-zinc-900'
      }`}
      title="Click to toggle blur"
    >
      {term}
    </span>
  );
};

export interface HeadingNode {
  id: string;
  title: string;
  level: number;
  lines: string[];
  children: HeadingNode[];
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  isStudyMode = false,
}) => {
  const [hiddenSections, setHiddenSections] = useState<Record<string, boolean>>({});

  if (!content) return null;

  const toggleSection = (sectionId: string) => {
    setHiddenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const hideAllSections = () => {
    const hidden: Record<string, boolean> = {};
    const collectIds = (nodes: HeadingNode[]) => {
      nodes.forEach((n) => {
        if (n.id !== 'root') hidden[n.id] = true;
        collectIds(n.children);
      });
    };
    collectIds(treeRoot.children);
    setHiddenSections(hidden);
  };

  const showAllSections = () => {
    setHiddenSections({});
  };

  const parseInline = (text: string, isTextbox = false): React.ReactNode[] => {
    if (!text) return [];

    const regex = /(\[\[[^\]]+\]\]|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (!part) return null;

      if (part.includes('[[')) {
        const match = part.match(/\[\[([^\]]+)\]\]/);
        if (match) {
          const termText = match[1];
          const isBold = part.startsWith('**') && part.endsWith('**');
          const termNode = (
            <TermElement
              key={`term-${index}`}
              term={termText}
              isStudyMode={isStudyMode}
              isTextboxTerm={isTextbox}
            />
          );
          return isBold ? <strong key={`b-${index}`} className="font-semibold">{termNode}</strong> : termNode;
        }
      }

      if (part.startsWith('**') && part.endsWith('**')) {
        const inner = part.slice(2, -2);
        return <strong key={index} className="font-semibold">{parseInline(inner, isTextbox)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        const inner = part.slice(1, -1);
        return <em key={index} className="italic">{parseInline(inner, isTextbox)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={index}
            className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-xs text-zinc-800 dark:text-zinc-200"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      return part;
    });
  };

  const rawLines = content.split('\n');
  const treeRoot: HeadingNode = { id: 'root', title: '', level: 0, lines: [], children: [] };
  const stack: HeadingNode[] = [treeRoot];
  let headingCounter = 0;

  rawLines.forEach((line) => {
    const trimmed = line.trim();
    const matchHeading = trimmed.match(/^(#{1,6})\s+(.*)/);

    if (matchHeading) {
      headingCounter++;
      const level = matchHeading[1].length;
      const titleText = matchHeading[2];
      const nodeId = `sec-${headingCounter}-${titleText.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

      const newNode: HeadingNode = {
        id: nodeId,
        title: titleText,
        level,
        lines: [],
        children: [],
      };

      while (stack.length > 1 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      stack[stack.length - 1].children.push(newNode);
      stack.push(newNode);
    } else {
      stack[stack.length - 1].lines.push(line);
    }
  });

  const renderSectionLines = (lines: string[]): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];
    let currentListItems: { type: 'ul' | 'ol'; text: string }[] = [];

    const flushList = (key: number) => {
      if (currentListItems.length === 0) return;
      const listType = currentListItems[0].type;
      const items = currentListItems.map((item, i) => {
        const colonIdx = item.text.indexOf(':');
        if (colonIdx !== -1 && colonIdx < item.text.length - 1) {
          const termPart = item.text.slice(0, colonIdx);
          const descPart = item.text.slice(colonIdx + 1);

          return (
            <li key={i} className="flex items-start gap-2 leading-relaxed my-1">
              <span className="shrink-0 font-semibold">{parseInline(termPart, true)}:</span>
              <div className="flex-1 leading-relaxed">{parseInline(descPart, false)}</div>
            </li>
          );
        }

        return (
          <li key={i} className="leading-relaxed">
            {parseInline(item.text, true)}
          </li>
        );
      });

      if (listType === 'ul') {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-4 my-2 space-y-1 text-zinc-800 dark:text-zinc-200">
            {items}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`list-${key}`} className="list-decimal pl-4 my-2 space-y-1 text-zinc-800 dark:text-zinc-200">
            {items}
          </ol>
        );
      }
      currentListItems = [];
    };

    lines.forEach((line, index) => {
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${index}`}
              className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded text-xs font-mono my-3 overflow-x-auto text-zinc-900 dark:text-zinc-100"
            >
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          flushList(index);
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      const trimmed = line.trim();
      if (!trimmed) {
        flushList(index);
        return;
      }

      if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
        flushList(index);
        elements.push(<hr key={`hr-${index}`} className="my-4 border-zinc-200 dark:border-zinc-800" />);
        return;
      }

      if (trimmed.startsWith('> ')) {
        flushList(index);
        elements.push(
          <blockquote key={`quote-${index}`} className="border-l-2 border-zinc-400 dark:border-zinc-600 pl-3 my-2 text-zinc-600 dark:text-zinc-400 italic">
            {parseInline(trimmed.slice(2), false)}
          </blockquote>
        );
        return;
      }

      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        currentListItems.push({ type: 'ul', text: trimmed.slice(2) });
        return;
      }

      const matchOl = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (matchOl) {
        currentListItems.push({ type: 'ol', text: matchOl[2] });
        return;
      }

      flushList(index);
      elements.push(
        <p key={`p-${index}`} className="my-2 leading-relaxed text-zinc-800 dark:text-zinc-200">
          {parseInline(trimmed, false)}
        </p>
      );
    });

    flushList(lines.length);
    return elements;
  };

  const renderHeadingNode = (node: HeadingNode): React.ReactNode => {
    const isHidden = hiddenSections[node.id];

    // Remove border-b for sub-topic headers (level 2+); keep border-b ONLY for major level 1 document titles
    const getHeadingClass = (level: number) => {
      switch (level) {
        case 1:
          return 'text-xl font-bold text-black dark:text-white tracking-tight border-b border-zinc-200 dark:border-zinc-800 pb-2 mt-6';
        case 2:
          return 'text-lg font-bold text-black dark:text-white tracking-tight mt-5 pb-0.5';
        case 3:
          return 'text-base font-semibold text-zinc-900 dark:text-zinc-100 mt-4';
        case 4:
          return 'text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-3';
        default:
          return 'text-xs font-semibold text-zinc-700 dark:text-zinc-300 mt-2';
      }
    };

    return (
      <div key={node.id} data-section-id={node.id} className="space-y-2">
        {node.title && (
          <div className="flex items-center justify-between mt-3">
            {React.createElement(
              `h${Math.min(node.level, 6)}`,
              { className: getHeadingClass(node.level) },
              parseInline(node.title, true)
            )}

            <button
              onClick={() => toggleSection(node.id)}
              className="text-xs text-zinc-500 hover:text-black dark:hover:text-white font-mono ml-4 shrink-0"
            >
              {isHidden ? '[show children]' : '[hide children]'}
            </button>
          </div>
        )}

        {!isHidden && (
          <div className="space-y-2 pl-0">
            {renderSectionLines(node.lines)}
            {node.children.map((child) => renderHeadingNode(child))}
          </div>
        )}

        {isHidden && (
          <div
            onClick={() => toggleSection(node.id)}
            className="py-2 cursor-pointer group space-y-1 my-1"
            title="Section hidden - Click to reveal"
          >
            <div className="border-b border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-500 transition-colors" />
            <div className="border-b border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-500 transition-colors" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="font-sans text-sm text-black dark:text-zinc-100 space-y-5">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 text-xs">
        <span className="text-zinc-500 font-medium">Dynamic Document Tree Hierarchy</span>
        <div className="flex gap-3">
          <button
            onClick={hideAllSections}
            className="text-zinc-500 hover:text-black dark:hover:text-white hover:underline"
          >
            [Hide All Children]
          </button>
          <button
            onClick={showAllSections}
            className="text-zinc-500 hover:text-black dark:hover:text-white hover:underline"
          >
            [Show All Children]
          </button>
        </div>
      </div>

      {treeRoot.lines.length > 0 && renderSectionLines(treeRoot.lines)}
      {treeRoot.children.map((child) => renderHeadingNode(child))}
    </div>
  );
};
