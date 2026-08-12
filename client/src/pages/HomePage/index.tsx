import { Link } from 'react-router-dom';

import { ROUTE_PATHS } from '../../navigation/paths';
import { useHomePage } from './useHomePage';

export function HomePage() {
  const { errorMessage, forms, isEmpty, isLoading, retry } = useHomePage();

  return (
    <main className="home-page">
      <header className="home-header">
        <div className="home-header-copy">
          <p className="home-eyebrow">Google Forms Lite</p>
          <h1>Your forms</h1>
          <p>Create, share, and review your forms from one place.</p>
        </div>

        <Link
          className="home-button home-button-primary"
          to={ROUTE_PATHS.newForm}
        >
          Create New Form
        </Link>
      </header>

      <section aria-labelledby="forms-heading" className="forms-section">
        <h2 id="forms-heading">All forms</h2>

        {isLoading && (
          <div aria-live="polite" className="home-state" role="status">
            <span aria-hidden="true" className="loading-indicator" />
            <h3>Loading forms</h3>
            <p>Please wait while your forms are being retrieved.</p>
          </div>
        )}

        {errorMessage && (
          <div className="home-state home-state-error" role="alert">
            <h3>Forms could not be loaded</h3>
            <p>{errorMessage}</p>
            <button
              className="home-button home-button-secondary"
              onClick={retry}
              type="button"
            >
              Try Again
            </button>
          </div>
        )}

        {isEmpty && (
          <div className="home-state">
            <h3>No forms yet</h3>
            <p>Create your first form to see it listed here.</p>
            <Link
              className="home-button home-button-secondary"
              to={ROUTE_PATHS.newForm}
            >
              Create First Form
            </Link>
          </div>
        )}

        {forms.length > 0 && !errorMessage && (
          <ul className="forms-grid">
            {forms.map((form) => (
              <li className="form-card" key={form.id}>
                <div className="form-card-content">
                  <h3>{form.title}</h3>
                  <p>{form.description}</p>
                </div>

                <div className="form-card-actions">
                  <Link
                    className="home-button home-button-secondary"
                    to={form.fillPath}
                  >
                    View Form
                  </Link>
                  <Link
                    className="home-button home-button-text"
                    to={form.responsesPath}
                  >
                    View Responses
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
