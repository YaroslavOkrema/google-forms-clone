import { RouterProvider } from 'react-router-dom';

import { router } from './navigation/router';

export function App() {
  return <RouterProvider router={router} />;
}
