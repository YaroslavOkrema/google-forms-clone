import { RouterProvider } from 'react-router-dom';

import { router } from 'src/navigation/router';

export function App() {
  return <RouterProvider router={router} />;
}
