import { createBrowserRouter } from 'react-router-dom';

import { FillFormPage } from 'src/pages/FillFormPage';
import { FormResponsesPage } from 'src/pages/FormResponsesPage';
import { HomePage } from 'src/pages/HomePage';
import { NewFormPage } from 'src/pages/NewFormPage';
import { ROUTE_PATHS } from 'src/navigation/paths';

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
