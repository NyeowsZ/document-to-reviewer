# DocumentToQuestionnaire - Questionnaire Specification Guide

This guide provides the complete specification for the **Questionnaire Reviewer** pipeline in the **DocumentToReviewer** platform.

---

## 1. Low-Friction Normal-Cased Part Headers

To ensure maximum legibility and zero visual friction:
- **Part I: Multiple Choice Questions**: Normal Title Case header (`font-semibold text-base text-zinc-900 dark:text-zinc-100`) separated with clean whitespace (`mt-10`).
- **Part II: Identification Questions**: Normal Title Case header with clean whitespace separation.
- **Zero Border Lines**: Part headers avoid heavy border lines (`border-b`) or underline dividers.

---

## 2. Borderless Plain Text Sub-Category Headers

- **Clean Exam Sub-Headings**: Inline `{ type: "header", message: "..." }` category dividers render as clean **borderless plain text** (`text-xs font-semibold uppercase tracking-wider text-zinc-500`) with natural whitespace separation.
- **Zero Borders & Zero Lines**: Sub-category headers avoid underlines (`underline`), background boxes (`bg-zinc-100`), pill badges, or horizontal rules (`<hr>`).
  - Example: `FINANCIAL STATEMENTS & THE ACCOUNTING EQUATION` (plain text with whitespace)

---

## 3. Per-Part Jump Bar (`Jump to Section: Part I, Part II`)

A sticky top navigation bar provides instant anchor navigation across the questionnaire parts:
- **Clean Part Anchors**: `[Part I: Multiple Choice]` and `[Part II: Identification]` smooth-scroll directly to the target section.

---

## 4. Automatic Identification Evaluation (Typed Text Bold vs Red)

- **Focus Mode (`onFocus`)**: While the student is actively typing inside an Identification input box, text renders normally without feedback to avoid distraction.
- **Blur Mode (`onBlur` / `Enter`)**: When the student clicks away, tabs out, or presses `Enter`, the typed answer text automatically updates styling:
  - **Correct Answer**: Typed text inside the input box turns **bold** (`font-bold text-black dark:text-white`).
  - **Wrong Answer**: Typed text inside the input box turns **red** (`text-red-600 dark:text-red-400`).

---

## 5. Choice Shuffling Functionality (`[Shuffle Choices]`)

- **Option Shuffling**: Clicking `[Shuffle Choices]` randomly shuffles the `choiceText` options across all MCQ questions.
- **Prefix Preservation**: Choice prefixes (`A.`, `B.`, `C.`, `D.`) remain strictly in alphabetical order.

---

## 6. Strict JSON Output Schema

```json
{
  "documentId": "string",
  "documentTitle": "string",
  "totalQuestions": 5,
  "questionnaireItems": [
    {
      "type": "header",
      "id": "h-1",
      "message": "Financial Statements & Reporting"
    },
    {
      "type": "mcq",
      "id": "q-acct-1",
      "question": "Which financial statement reports assets, liabilities, and equity?",
      "choices": [
        { "choiceText": "Balance Sheet", "isCorrect": true },
        { "choiceText": "Income Statement", "isCorrect": false },
        { "choiceText": "Cash Flow Statement", "isCorrect": false },
        { "choiceText": "Retained Earnings Statement", "isCorrect": false }
      ],
      "explanation": "Balance sheet reports financial position."
    },
    {
      "type": "header",
      "id": "h-2",
      "message": "Financial Term Identification"
    },
    {
      "type": "identification",
      "id": "qi-acct-1",
      "question": "What equation states that Assets = Liabilities + Equity?",
      "answers": ["Accounting Equation"],
      "hint": "Foundational accounting math"
    }
  ]
}
```
