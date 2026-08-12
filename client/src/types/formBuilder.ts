import type { QuestionInput } from '@google-forms/shared';

export interface BuilderOption {
  id: string;
  value: string;
}

export type BuilderQuestion = Omit<QuestionInput, 'options'> & {
  id: string;
  options: BuilderOption[];
};

export interface FormBuilderState {
  description: string;
  questions: BuilderQuestion[];
  title: string;
}

export interface BuilderQuestionValidationErrors {
  optionList?: string;
  options: Record<string, string>;
  title?: string;
}

export interface FormBuilderValidationErrors {
  questions: Record<string, BuilderQuestionValidationErrors>;
  title?: string;
}

export interface FormBuilderValidationResult {
  errors: FormBuilderValidationErrors;
  isValid: boolean;
}
