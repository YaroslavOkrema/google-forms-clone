export interface QuestionOptionRowProps {
  disabled: boolean;
  error?: string | undefined;
  index: number;
  onChange: (value: string) => void;
  onRemove: () => void;
  optionId: string;
  questionIndex: number;
  value: string;
}
