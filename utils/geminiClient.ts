import { ReviewerData, ReviewerType, QuestionnaireItem, MCQChoice } from '../types/reviewer';

export const DOCUMENT_STUDY_PROMPT = `You are an expert Document-to-Study-Reviewer generator.
Strictly adhere to the following rules:
1. Strict 1:1 Document Fidelity:
   - Zero hallucination or extrapolation.
   - Maintain exact phrasing, headings, definitions, bullet points, statistics, and examples directly from the source document.
   - Tag key primary terms in double square brackets, e.g., [[Term]].
2. Active Recall & Formatting Rules:
   - For enumerated lists, use format: - **[[Key Term]]**: Detailed verbatim description.
   - For numbered lists, use: 1. **[[Key Term]]**: Detailed verbatim description.
   - For headings: Use # for document title, ## for major sections, ### for sub-topics.
   - Use --- for dividing major sections.
Return ONLY valid Markdown. Do not include markdown code block ticks (\`\`\`markdown or \`\`\`).`;

export const QUESTIONNAIRE_PROMPT = `You are an expert Document-to-Questionnaire generator.
Generate a comprehensive, high-quality testpaper from the provided document.
The testpaper must include:
1. Part I: Multiple Choice Questions. For each MCQ question:
   - Provide exactly 4 choices in the "choices" array.
   - Exactly one choice MUST have isCorrect: true, the other three MUST have isCorrect: false.
2. Part II: Identification Questions. For each identification question:
   - Provide question, array of accepted answer strings in "answers", and a short "hint".
3. Section headers to organize categories (type: "header" with "message").`;

export const QUESTIONNAIRE_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    documentTitle: {
      type: 'string',
      description: 'The title of the document or lecture topic.',
    },
    totalQuestions: {
      type: 'integer',
      description: 'Total number of questions generated.',
    },
    questionnaireItems: {
      type: 'array',
      description: 'List of categorized test items including headers, MCQs, and Identification questions.',
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['header', 'mcq', 'identification'],
            description: 'Item category type.',
          },
          id: {
            type: 'string',
            description: 'Unique identifier, e.g. h-1, q-1, qi-1.',
          },
          message: {
            type: 'string',
            description: 'Section header message (for type header).',
          },
          question: {
            type: 'string',
            description: 'Question body text (for mcq and identification).',
          },
          choices: {
            type: 'array',
            description: 'List of choices for MCQ (must have 4 choices when type is mcq).',
            items: {
              type: 'object',
              properties: {
                choiceText: {
                  type: 'string',
                  description: 'Option text.',
                },
                isCorrect: {
                  type: 'boolean',
                  description: 'Whether this option is the correct answer.',
                },
              },
              required: ['choiceText', 'isCorrect'],
            },
          },
          explanation: {
            type: 'string',
            description: 'Brief explanation for why the answer is correct.',
          },
          answers: {
            type: 'array',
            description: 'Accepted answer variants for identification question.',
            items: {
              type: 'string',
            },
          },
          hint: {
            type: 'string',
            description: 'Helpful hint for identification question.',
          },
        },
        required: ['type', 'id'],
      },
    },
  },
  required: ['documentTitle', 'questionnaireItems'],
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export async function generateReviewerWithGemini({
  file,
  apiKey,
  reviewerType,
  model = 'gemini-3.5-flash-lite',
}: {
  file: File;
  apiKey: string;
  reviewerType: ReviewerType;
  model?: string;
}): Promise<ReviewerData> {
  const base64Data = await fileToBase64(file);
  const mimeType = file.type || 'application/pdf';

  const systemPrompt = reviewerType === 'document' ? DOCUMENT_STUDY_PROMPT : QUESTIONNAIRE_PROMPT;
  const userInstruction =
    reviewerType === 'document'
      ? 'Convert the attached document into a structured Study Reviewer following the active recall format with [[Term]] brackets.'
      : 'Generate an interactive questionnaire testpaper with Multiple Choice and Identification questions from the attached document adhering strictly to the JSON response schema. For each MCQ item, ensure choices array is present with 4 options.';

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;

  const payload: any = {
    contents: [
      {
        parts: [
          {
            inline_data: {
              mime_type: mimeType,
              data: base64Data,
            },
          },
          {
            text: `${systemPrompt}\n\nTask: ${userInstruction}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.2,
    },
  };

  if (reviewerType === 'questionnaire') {
    payload.generationConfig.responseMimeType = 'application/json';
    payload.generationConfig.responseSchema = QUESTIONNAIRE_RESPONSE_SCHEMA;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `Google AI Error: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  const result = await response.json();
  const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
  const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

  if (reviewerType === 'document') {
    let markdownContent = rawText.trim();
    if (markdownContent.startsWith('```markdown')) {
      markdownContent = markdownContent.replace(/^```markdown\n?/, '').replace(/\n?```$/, '');
    } else if (markdownContent.startsWith('```')) {
      markdownContent = markdownContent.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    return {
      id: `ai-doc-${Date.now()}`,
      title: cleanTitle,
      docType: 'pdf',
      fileName: file.name,
      fileSize: fileSizeMB,
      uploadDate: 'Just now',
      reviewerType: 'document',
      rawMarkdown: markdownContent,
    };
  } else {
    let cleanJson = rawText.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    const parsed = JSON.parse(cleanJson);
    const rawItems: any[] = parsed.questionnaireItems || [];

    // Sanitize and normalize items
    const items: QuestionnaireItem[] = rawItems.map((item, idx) => {
      const id = item.id || `item-${idx + 1}`;
      if (item.type === 'header') {
        return {
          type: 'header',
          id,
          message: item.message || item.question || 'Category',
        };
      }

      if (item.type === 'identification') {
        return {
          type: 'identification',
          id,
          question: item.question || '',
          answers: Array.isArray(item.answers) && item.answers.length > 0 ? item.answers : [item.answer || ''],
          hint: item.hint || '',
        };
      }

      // Default or 'mcq': Ensure choices array is always populated
      let choices: MCQChoice[] = [];
      if (Array.isArray(item.choices) && item.choices.length > 0) {
        choices = item.choices.map((c: any) => ({
          choiceText: typeof c === 'string' ? c : (c.choiceText || c.text || ''),
          isCorrect: Boolean(c.isCorrect),
        }));
      } else if (Array.isArray(item.options)) {
        choices = item.options.map((opt: any, optIdx: number) => ({
          choiceText: typeof opt === 'string' ? opt : (opt.choiceText || opt.text || ''),
          isCorrect: optIdx === 0,
        }));
      }

      // If no valid choices were returned, make fallback choices
      if (choices.length === 0) {
        choices = [
          { choiceText: 'True', isCorrect: true },
          { choiceText: 'False', isCorrect: false },
        ];
      }

      return {
        type: 'mcq',
        id,
        question: item.question || '',
        choices,
        explanation: item.explanation || '',
      };
    });

    const mcqs = items.filter((i): i is { type: 'mcq' } & any => i.type === 'mcq');
    const idents = items.filter((i): i is { type: 'identification' } & any => i.type === 'identification');

    return {
      id: `ai-quiz-${Date.now()}`,
      title: parsed.documentTitle || cleanTitle,
      docType: 'pdf',
      fileName: file.name,
      fileSize: fileSizeMB,
      uploadDate: 'Just now',
      reviewerType: 'questionnaire',
      questionnaireItems: items,
      mcqQuestions: mcqs,
      identificationQuestions: idents,
    };
  }
}
