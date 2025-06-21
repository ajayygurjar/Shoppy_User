import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import RootLayout from "./components/Layout/RootLayout";



const Home = lazy(() => import("./components/Home/Home"));
const ProductPage = lazy(() => import("./components/Product/ProductPage"));
const ProductDetailPage = lazy(() => import("./components/Product/ProductDetailPage"));
const CategoryPage = lazy(() => import("./components/Category/CategoryPage"));
const Auth = lazy(() => import("./components/Auth/Auth"));
const OrdersPage = lazy(() => import("./components/Pages/OrdersPage"));
const AboutPage = lazy(() => import("./components/Pages/AboutPage"));
const SearchResults = lazy(() => import("./components/Pages/SearchResult"));
import CartPersistence from "./components/Cart/CartPersistence";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/auth", element: <Auth /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/orders", element: <OrdersPage /> },
        { path: "/product", element: <ProductPage /> },
        { path: "/product/:id", element: <ProductDetailPage /> },
        { path: "category/:categoryName", element: <CategoryPage /> },
        { path: "/search", element: <SearchResults /> },
      ],
    },
  ]);

  return (
    <>
      <CartPersistence />
      <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
      <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
