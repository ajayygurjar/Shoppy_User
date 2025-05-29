import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import Auth from "./components/Auth/Auth";
import OrdersPage from "./components/Pages/OrdersPage";
import AboutPage from "./components/Pages/AboutPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/auth", element: <Auth /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/orders", element: <OrdersPage /> },

      ],
    },
  ]);

  return <>
  <RouterProvider router={router}/>
  </>;
}

export default App;
