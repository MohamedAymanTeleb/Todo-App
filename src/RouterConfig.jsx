import { createBrowserRouter } from "react-router-dom";
import Layout from './Pages/Layout/Layout'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Todo from './Pages/Todo/Todo'
import NotFound from './Pages/NotFound/NotFound'

export const Router = createBrowserRouter(
    [{
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Register /> },//INDEX
            // { path: "/Register", element: <Register /> },
            { path: "/Login", element: <Login /> },
            { path: "/Todo", element: <Todo /> },
            { path: "*", element: <NotFound /> },
        ],
    },
    ],
);