import { Link } from 'react-router-dom';

import { FormResponseCard } from '../../components/FormResponseCard';
import { ROUTE_PATHS } from '../../navigation/paths';
import { useFormResponsesPage } from './useFormResponsesPage';

export function FormResponsesPage() {
  const {
    errorMessage,
    formTitle,
    isEmpty,
    isLoading,
    isNotFound,
    responseCountLabel,
    responses,
    retry,
  } = useFormResponsesPage();

  if (isLoading) {
    return (
      <main className="responses-page responses-state-page">
        <section
          aria-live="polite"
          className="responses-state-card"
          role="status"
        >
          <span aria-hidden="true" className="loading-indicator" />
          <h1>Loading responses</h1>
          <p>Please wait while the form responses are being retrieved.</p>
        </section>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="responses-page responses-state-page">
        <section
          className="responses-state-card responses-state-card-error"
          role="alert"
        >
          <p className="home-eyebrow">Google Forms Lite</p>
          <h1>Responses could not be loaded</h1>
          <p>{errorMessage}</p>
          <div className="responses-state-actions">
            <button
              className="home-button home-button-primary"
              onClick={retry}
              type="button"
            >
              Try Again
            </button>
            <Link
              className="home-button home-button-text"
              to={ROUTE_PATHS.home}
            >
              Back to forms
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (isNotFound || formTitle === null) {
    return (
      <main className="responses-page responses-state-page">
        <section className="responses-state-card">
          <p className="home-eyebrow">Google Forms Lite</p>
          <h1>Form not found</h1>
          <p>The form may have been removed, or the link may be incorrect.</p>
          <div className="responses-state-actions">
            <Link
              className="home-button home-button-primary"
              to={ROUTE_PATHS.home}
            >
              Back to forms
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="responses-page">
      <header className="responses-header">
        <div className="responses-header-copy">
          <p className="home-eyebrow">Google Forms Lite</p>
          <h1>{formTitle}</h1>
          <p>Review the responses submitted for this form.</p>
        </div>
        <Link
          className="home-button home-button-text responses-back-link"
          to={ROUTE_PATHS.home}
        >
          Back to forms
        </Link>
      </header>

      <section
        aria-labelledby="submitted-responses-heading"
        className="responses-section"
      >
        <div className="responses-section-heading">
          <div>
            <p className="builder-step">Responses</p>
            <h2 id="submitted-responses-heading">Submitted responses</h2>
          </div>
          <span className="responses-count">{responseCountLabel}</span>
        </div>

        {isEmpty && (
          <div className="responses-empty-state">
            <h3>No responses yet</h3>
            <p>Submitted responses will appear here.</p>
          </div>
        )}

        {responses.length > 0 && (
          <div className="responses-list">
            {responses.map((response) => (
              <FormResponseCard key={response.id} response={response} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
