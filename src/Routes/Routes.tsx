import ErrorPage from '../pages/ErrorPage/ErrorPage.tsx'
import Login from '../pages/Login/Login.tsx'
import Signup from '../pages/Signup/Signup.tsx'
import TodoPage from '../pages/TodoPage/TodoPage.tsx'
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom"


function Routes() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/login" />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/todo/:username",
            element: <TodoPage />,
        },
    ]);
    return <RouterProvider router={router} />;

}

export default Routes