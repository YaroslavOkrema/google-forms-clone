import type { QuestionType } from '@google-forms/shared';

import type {
  BuilderQuestion,
  BuilderQuestionValidationErrors,
} from 'src/types/formBuilder';

export interface FormQuestionEditorProps {
  disabled: boolean;
  errors?: BuilderQuestionValidationErrors | undefined;
  index: number;
  onAddOption: (questionId: string) => void;
  onOptionChange: (questionId: string, optionId: string, value: string) => void;
  onOptionRemove: (questionId: string, optionId: string) => void;
  onRemove: (questionId: string) => void;
  onTitleChange: (questionId: string, title: string) => void;
  onTypeChange: (questionId: string, type: QuestionType) => void;
  question: BuilderQuestion;
}
