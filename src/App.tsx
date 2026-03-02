import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import HomePage from "./screen/home_page";
import loadLocation from "./loader";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: loadLocation,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
