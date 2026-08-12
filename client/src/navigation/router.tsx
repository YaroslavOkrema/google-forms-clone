import { createBrowserRouter } from 'react-router-dom';

import { FillFormPage } from '../pages/FillFormPage';
import { FormResponsesPage } from '../pages/FormResponsesPage';
import { HomePage } from '../pages/HomePage';
import { NewFormPage } from '../pages/NewFormPage';
import { ROUTE_PATHS } from './paths';

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.home,
    element: <HomePage />,
  },
  {
    path: ROUTE_PATHS.newForm,
    element: <NewFormPage />,
  },
  {
    path: ROUTE_PATHS.fillForm,
    element: <FillFormPage />,
  },
  {
    path: ROUTE_PATHS.formResponses,
    element: <FormResponsesPage />,
  },
]);
