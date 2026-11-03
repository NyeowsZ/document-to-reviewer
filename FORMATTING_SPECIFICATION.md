# DocumentToReviewer - Formatting & Pipeline Specification Guide

This guide provides the complete formatting specifications for the two distinct processing pipelines in the **DocumentToReviewer** platform:
1. **Part I: Document to Study Reviewer** (Markdown & Active Recall Specification)
2. **Part II: Document to Questionnaire Reviewer** (Strict JSON Output Specification)

---

# MANDATORY DIRECTIVE: Strict 1:1 Document Fidelity Rule

> [!IMPORTANT]
> The LLM processing pipeline MUST maintain **strict 1:1 fidelity** to the input source document.
> - **Zero AI Hallucination or Extrapolation**: Do NOT summarize, rephrase, expand, or inject external commentary/interpretation ("takes").
> - **Preserve Phrasing & Structure**: Maintain the exact original slide titles, headings, definitions, bullet points, statistics, and examples directly from the source document.
> - **Active Recall Tagging**: Apply `[[Term]]` tags strictly to verbatim terms present in the document.

---

# PART I: Document to Study Reviewer (Markdown Specification)

The Study Reviewer transforms raw documents into structured Markdown text supporting **Active Recall Blur/Redaction**, **Containerized Multiline List Descriptions**, and **Dynamic N-Level Tree Hierarchy Collapsing (`[hide children]`)**.

## 1. Collapsed Section Double Line Indicator & Containerized List Items
- **Double Line Indicator (Hidden Content)**: When a section's children are collapsed (`[hide children]`), the section replaces its children with a **clean double line** (two thin stacked horizontal borders) to visually signify hidden content without text or words.
- **Heading Bottom Borders (`border-b`)**: Reserved **strictly for major Level 1 (`#`) Document Titles** and explicit horizontal rules (`---`). Sub-topic headers (`##`, `###`, `####`) do **NOT** use bottom borders (`border-b`).
- **Zero Extra Container Indentation (`pl-0`)**: Section bodies and sub-sections align flush with the left margin.
- **Containerized List Items (`[term]: [description]`)**: List items render in a two-column flex container so wrapped multiline description text stays aligned inside the description column.

---

## 2. Textbox vs Blurred Redaction Rules

1. **Enumerated List Key Term Textbox Rule (`isTextboxTerm`)**:
   - Terms inside **enumerated list items** (e.g., `- **[[Demography]]**: The statistical study...`) render in Study Mode as **minimalist input textboxes** (`border-b border-zinc-400 dark:border-zinc-600 px-1 py-0`).
   - **Uniform Static Sizing (`w-36`)**: Sibling enumeration textboxes use a uniform static width (`w-36` / 9rem) to prevent jagged layout shifts.
   - **Neutral Border**: Borders remain neutral without green/red colored states.
   - **Typography Inheritance**: Input textboxes inherit `text-inherit font-inherit` from their parent line.

2. **Inline Body Prose Term Rule (`isChildTerm`)**:
   - Terms inside body prose paragraphs render in Study Mode as **tight inline blurred spans** (`blur-[3px] py-0 px-1 select-none`).
   - Revealed terms render cleanly as bold text without bottom borders (`border-b`).

3. **The "What Am I?" Active Recall Principle**:
   - Only tag central primary terms when accompanied by a description that prompts the student (*"Here is what I do... What am I?"*). Do NOT tag generic document titles.

---

## 3. Dynamic N-Level Tree Hierarchy & Section Collapsing (`[hide children]`)

Documents use standard Markdown headings (`#` through `######` / Levels 1–6) to establish dynamic parent-child tree relationships:

- `# Main Title` (Level 1): Root parent node with bottom border (`border-b`). Hiding `# Title` recursively collapses all `##`, `###`, and descendant sub-sections under the document root, displaying a double line indicator.
- `## Section Title` (Level 2): Major section node without bottom border. Hiding `## Section` collapses all child `###` sub-sections and list items under that section.
- `### Sub-topic` (Level 3): Sub-section node inside a section.

---

# PART II: Document to Questionnaire Reviewer (Strict JSON Specification)

The Questionnaire Reviewer demands a **Strict JSON Response** from the extraction pipeline.

## 1. Clean Question Type Part Sections

- **Part I: Multiple Choice Questions**: Section header containing all MCQ questions.
- **Part II: Identification Questions**: Section header containing all Identification questions.
- **Borderless Plain Text Category Headers**: Sub-category headers render as borderless plain text with natural whitespace.

---

## 2. Strict JSON Output Schema

```json
{
  "documentId": "string",
  "documentTitle": "string",
  "totalQuestions": 40,
  "questionnaireItems": [
    {
      "type": "header",
      "id": "h-1",
      "message": "Terminologies in Demography"
    },
    {
      "type": "mcq",
      "id": "q-1",
      "question": "What is the statistical study of human populations?",
      "choices": [
        { "choiceText": "Demography", "isCorrect": true },
        { "choiceText": "Sociology", "isCorrect": false },
        { "choiceText": "Geography", "isCorrect": false },
        { "choiceText": "History", "isCorrect": false }
      ],
      "explanation": "Demography is the statistical study of human populations."
    },
    {
      "type": "header",
      "id": "h-2",
      "message": "Demographic Term Identification"
    },
    {
      "type": "identification",
      "id": "qi-1",
      "question": "What metric refers to the number of people living in a place per square km?",
      "answers": ["Population density", "Population Density"],
      "hint": "Number of people per sq km"
    }
  ]
}
```
