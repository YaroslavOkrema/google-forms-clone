import type { QuestionOptionRowProps } from './types';

export function QuestionOptionRow({
  disabled,
  error,
  index,
  onChange,
  onRemove,
  optionId,
  questionIndex,
  value,
}: QuestionOptionRowProps) {
  const inputId = `question-${questionIndex}-option-${optionId}`;
  const errorId = `${inputId}-error`;

  return (
    <li className="builder-option-row">
      <span aria-hidden="true" className="builder-option-marker" />
      <div className="builder-option-field">
        <label className="visually-hidden" htmlFor={inputId}>
          Option {index + 1} for question {questionIndex + 1}
        </label>
        <input
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          className="builder-input builder-option-input"
          disabled={disabled}
          id={inputId}
          onChange={(event) => onChange(event.target.value)}
          placeholder={`Option ${index + 1}`}
          type="text"
          value={value}
        />
        {error && (
          <p className="builder-field-error" id={errorId}>
            {error}
          </p>
        )}
      </div>
      <button
        aria-label={`Delete option ${index + 1} from question ${questionIndex + 1}`}
        className="builder-icon-button"
        disabled={disabled}
        onClick={onRemove}
        type="button"
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  );
}
