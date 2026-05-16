import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APITester } from "./APITester";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import { createBrowserRouter, RouterProvider } from "react-router";
import Homepage from "./components/Homepage";
import NotFoundpage from "./components/NotFoundpage";
import Paymentpage from "./components/Paymentpage";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Profilepage from "./components/Profilepage";
import Loginpage from "./components/Loginpage";
import Registerpage from "./components/Registerpage";
import { Toaster } from "sonner";

export function App() {

  const mainRouter = createBrowserRouter([
    {
      index: true, // Rota padrão
      path: '/home',
      element: 
      <ProtectedRoute>
        <Homepage/>
      </ProtectedRoute>,
      errorElement: <NotFoundpage/>
    },
    {
      path: '/payment/:eventId',
      element: 
      <ProtectedRoute>
        <Paymentpage/>
      </ProtectedRoute>
    },
    {
      path: '/profile',
      element:
      <ProtectedRoute>
        <Profilepage/>
      </ProtectedRoute>
    },
    {
      path: '/login',
      element: <Loginpage/>
    },
    {
      path: '/register',
      element: <Registerpage/>
    }
  ]);

  return (
    <div className="container w-screen h-screen mx-auto text-center relative z-10 bg-gray-100">
      <RouterProvider router={mainRouter}/>
      <Toaster/>
    </div>
  );
}

export default App;
