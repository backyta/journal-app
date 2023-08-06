import { Navigate } from "react-router-dom";
import { JournalPage } from "../pages/JournalPage";
 
export const JournalRoutes = [
    {
        path: "/",
        element: <JournalPage/>
    },
    {
      path: "/*",
      element: <Navigate to={'/'} />,
    },
  

];