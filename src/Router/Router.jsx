import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "./../ErrorPage";
import Home from "./../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import EncryptionPage from "../Pages/EncryptionPage/EncryptionPage";
import DecryptionPage from "../Pages/DecryptionPage/DecryptionPage";
import PrivateRoute from "./PrivateRoute";
import EncryptDecrypt from "../Pages/Testing/EncryptDecrypt";
import KeyGenerate from "../Pages/KeyGenerationPage/KeyGenerate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/encryptionPage",
        element: (
          <PrivateRoute>
            <EncryptionPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/decryptionPage",
        element: (
          <PrivateRoute>
            <DecryptionPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/generateKeys",
        element: <KeyGenerate />,
      },
    ],
  },
]);
