import { ReviewerData, ReviewerType, QuestionnaireItem } from '../types/reviewer';

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
Generate a comprehensive, high-quality testpaper from the provided document in strict JSON format.
The testpaper must include:
1. Part I: Multiple Choice Questions (with 4 choices per question, 1 correct choice with isCorrect: true).
2. Part II: Identification Questions (with question, array of accepted case-insensitive answers, and concise hint).
3. Section headers to categorize questions (type: "header").

Return ONLY raw JSON conforming to this schema (no extra explanation or markdown block wrappers):
{
  "documentTitle": "string",
  "totalQuestions": number,
  "questionnaireItems": [
    {
      "type": "header",
      "id": "h-1",
      "message": "Section Category Name"
    },
    {
      "type": "mcq",
      "id": "q-1",
      "question": "Question text here?",
      "choices": [
        { "choiceText": "Option A", "isCorrect": true },
        { "choiceText": "Option B", "isCorrect": false },
        { "choiceText": "Option C", "isCorrect": false },
        { "choiceText": "Option D", "isCorrect": false }
      ],
      "explanation": "Brief explanation"
    },
    {
      "type": "identification",
      "id": "qi-1",
      "question": "Identification question text?",
      "answers": ["Answer", "answer"],
      "hint": "Brief hint"
    }
  ]
}`;

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
  model = 'gemini-2.0-flash',
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
      : 'Generate an interactive questionnaire testpaper with Multiple Choice and Identification questions from the attached document in strict JSON.';

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
    const items: QuestionnaireItem[] = parsed.questionnaireItems || [];

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

