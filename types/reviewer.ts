export interface MCQChoice {
  choiceText: string;
  isCorrect: boolean;
}

export interface MCQQuestion {
  id: string;
  question: string;
  choices: MCQChoice[];
  explanation?: string;
}

export interface IdentificationQuestion {
  id: string;
  question: string;
  answers: string[];
  hint?: string;
}

export interface HeaderItem {
  type: 'header';
  id: string;
  message: string;
}

export type QuestionnaireItem =
  | ({ type: 'mcq' } & MCQQuestion)
  | ({ type: 'identification' } & IdentificationQuestion)
  | HeaderItem;

export type ReviewerType = 'document' | 'questionnaire';

export interface ReviewerData {
  id: string;
  title: string;
  docType: 'pdf' | 'docx' | 'txt' | 'md' | 'epub' | 'image';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  reviewerType: ReviewerType;
  rawMarkdown?: string; // Present for 'document' type
  mcqQuestions?: MCQQuestion[];
  identificationQuestions?: IdentificationQuestion[];
  questionnaireItems?: QuestionnaireItem[]; // Supports inline { type: 'header', message: '...' } category dividers
}

export type ActiveTab = 'studio' | 'library' | 'about';
