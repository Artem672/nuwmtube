import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../layout/App";
import Watch from "../../features/videos/Watch/Watch";
import VideoDashboard from "../../features/videos/dashboard/VideoDashboard";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '', element: <VideoDashboard/>},
            {path: 'watch/:id', element: <Watch/>}
        ]
    }
]

export const router = createBrowserRouter(routes);