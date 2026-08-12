import type { FormResponseCardProps } from './types';

export function FormResponseCard({ response }: FormResponseCardProps) {
  const headingId = `response-${response.id}-heading`;

  return (
    <article aria-labelledby={headingId} className="response-card">
      <header className="response-card-header">
        <p className="builder-step">Submitted response</p>
        <h2 id={headingId}>{response.label}</h2>
      </header>

      {response.answers.length === 0 && (
        <div className="response-card-empty">
          <p>No answers were provided for this response.</p>
        </div>
      )}

      {response.answers.length > 0 && (
        <dl className="response-answer-list">
          {response.answers.map((answer, answerIndex) => (
            <div
              className="response-answer"
              key={`${answer.questionId}-${answerIndex}`}
            >
              <dt>{answer.questionTitle}</dt>
              <dd>
                {answer.displayValues.length === 0 && (
                  <p className="response-answer-empty">No answer provided.</p>
                )}

                {answer.displayValues.length > 0 && answer.isMultipleValue && (
                  <ul className="response-value-list">
                    {answer.displayValues.map((value, valueIndex) => (
                      <li key={`${value}-${valueIndex}`}>{value}</li>
                    ))}
                  </ul>
                )}

                {answer.displayValues.length > 0 && !answer.isMultipleValue && (
                  <p>{answer.displayValues[0]}</p>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}
