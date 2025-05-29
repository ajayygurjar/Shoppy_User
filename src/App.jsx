import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import Auth from "./components/Auth/Auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/auth", element: <Auth /> },

      ],
    },
  ]);

  return <>
  <RouterProvider router={router}/>
  </>;
}

export default App;
